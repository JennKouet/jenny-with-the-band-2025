'use client';
import { useCallback, useEffect, useMemo, useState } from "react";
import supabase from "@/lib/supabaseClient";
import type { ArticleProps } from "@/types/articles.types";
import ArticleComponent from "./Article";

type ArticleFormState = Pick<ArticleProps, "title" | "description" | "imageUrl" | "slug" | "published">;

const initialFormValues: ArticleFormState = {
  title: "",
  description: "",
  imageUrl: "",
  slug: "",
  published: true,
};

const NewsListComponent = () => {
  const [articlesFromSupa, setArticlesFromSupa] = useState<ArticleProps[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<ArticleFormState>(initialFormValues);
  const [isUploadingImage, setUploadingImage] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const handleMouseEnter = (cardId: number) => {
    setSelectedCardId(cardId);
  };

  const handleMouseLeave = () => {
    setSelectedCardId(null);
  };

  const fetchArticlesFromSupabase = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("Articles").select("*");
    if (error) {
      console.error("Error fetching articles from Supabase:", error.message);
      setLoading(false);
      return;
    }
    setArticlesFromSupa(data as ArticleProps[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchArticlesFromSupabase();
  }, [fetchArticlesFromSupabase]);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setAuthenticated(!!data.session);
    };
    checkSession();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const sortedArticles = useMemo(() => {
    return [...articlesFromSupa].sort((a, b) => {
      return new Date(b.created_at ?? "").getTime() - new Date(a.created_at ?? "").getTime();
    });
  }, [articlesFromSupa]);

  const visibleArticles = useMemo(() => {
    return isAuthenticated ? sortedArticles : sortedArticles.filter((article) => article.published);
  }, [isAuthenticated, sortedArticles]);

const resetForm = () => {
  setFormValues(initialFormValues);
  setEditingArticleId(null);
  setFormError(null);
};

  const handleFormChange = (field: keyof ArticleFormState, value: string | boolean) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditArticle = (article: ArticleProps) => {
    setFormValues({
      title: article.title ?? "",
      description: article.description ?? "",
      imageUrl: article.imageUrl ?? "",
      slug: article.slug ?? "",
      published: article.published,
    });
    setEditingArticleId(article.id);
    setFormVisible(true);
  };

  const toSlug = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const convertImageToWebp = (file: File) => {
    return new Promise<Blob>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext("2d");
          if (!context) {
            reject(new Error("Impossible de préparer le canvas."));
            return;
          }
          context.drawImage(image, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("Impossible de convertir l'image en WebP."));
              }
            },
            "image/webp",
            0.85
          );
        };
        image.onerror = () => reject(new Error("Impossible de charger l'image."));
        image.src = reader.result as string;
      };
      reader.onerror = () => reject(new Error("Erreur lors de la lecture du fichier."));
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setUploadingImage(true);
    setFormError(null);
    try {
      const webpBlob = await convertImageToWebp(file);
      const baseName = toSlug(formValues.slug || formValues.title || file.name.split(".")[0]);
      const uniqueName = `${baseName || "article"}-${Date.now()}.webp`;
      const storagePath = `articles/${uniqueName}`;
      const fileToUpload = new File([webpBlob], uniqueName, { type: "image/webp" });
      const { error } = await supabase.storage
        .from("images")
        .upload(storagePath, fileToUpload, {
          cacheControl: "3600",
          contentType: "image/webp",
          upsert: true,
        });
      if (error) {
        throw error;
      }
      handleFormChange("imageUrl", uniqueName);
      event.target.value = "";
    } catch (uploadError) {
      console.error(uploadError);
      setFormError(
        uploadError instanceof Error && "message" in uploadError
          ? (uploadError as { message: string }).message
          : "Une erreur est survenue durant l'upload."
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    if (!confirm("Supprimer cet article ?")) {
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("Articles").delete().eq("id", articleId);
    if (error) {
      setFormError(error.message);
      setSubmitting(false);
      return;
    }
    await fetchArticlesFromSupabase();
    setSubmitting(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setFormError(null);

    if (!formValues.title || !formValues.slug || !formValues.imageUrl) {
      setFormError("Merci de remplir le titre, le slug et d'uploader une image.");
      setSubmitting(false);
      return;
    }

    const payload = {
      title: formValues.title,
      description: formValues.description,
      imageUrl: formValues.imageUrl,
      slug: formValues.slug,
      published: formValues.published,
    };

    const query = editingArticleId
      ? supabase.from("Articles").update(payload).eq("id", editingArticleId).select()
      : supabase.from("Articles").insert([payload]).select();

    const { error } = await query;

    if (error) {
      setFormError(error.message);
      setSubmitting(false);
      return;
    }

    await fetchArticlesFromSupabase();
    resetForm();
    setFormVisible(false);
    setSubmitting(false);
  };

  return (
    <div>
      {isAuthenticated && (
      <div className="bg-black/40 border border-red-600 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold">Administration des articles</h3>
          <div className="flex gap-2 items-center">
            <button
              className="text-xs text-white/70 underline"
              onClick={() => supabase.auth.signOut()}
            >
              Se déconnecter
            </button>
            <button
              className="text-sm text-white border border-white rounded px-3 py-1"
              onClick={() => {
                if (isFormVisible) {
                  resetForm();
                }
                setFormVisible((prev) => !prev);
              }}
            >
              {isFormVisible ? "Fermer" : "Ajouter un article"}
            </button>
          </div>
        </div>

        {isFormVisible && (
          <form className="mt-4 space-y-3 font-[roboto]" onSubmit={handleSubmit}>
            <label className="text-white text-sm font-medium">
              Titre
              <input
                type="text"
                value={formValues.title}
                onChange={(event) => handleFormChange("title", event.target.value)}
                className="mt-1 w-full rounded border border-gray-600 bg-black/20 p-2 text-white"
                required
              />
            </label>
            <label className="text-white text-sm font-medium">
              Description
              <textarea
                value={formValues.description}
                onChange={(event) => handleFormChange("description", event.target.value)}
                className="mt-1 w-full rounded border border-gray-600 bg-black/20 p-2 text-white"
                rows={3}
              />
            </label>
            <label className="text-white text-sm font-medium">
              Slug
              <input
                type="text"
                value={formValues.slug}
                onChange={(event) => handleFormChange("slug", event.target.value)}
                className="mt-1 w-full rounded border border-gray-600 bg-black/20 p-2 text-white"
                required
              />
            </label>
            <label className="text-white text-sm font-medium">
              Nom du fichier image
              <div className="mt-1 space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full rounded border border-gray-600 bg-black/20 p-2 text-white file:text-white"
                />
                {isUploadingImage && (
                  <p className="text-xs text-white/70">Conversion et upload en cours…</p>
                )}
                {formValues.imageUrl && !isUploadingImage && (
                  <p className="text-xs text-green-300">Image téléchargée : {formValues.imageUrl}</p>
                )}
              </div>
            </label>
            <label className="flex items-center gap-2 text-white text-sm">
              <input
                type="checkbox"
                checked={formValues.published}
                onChange={(event) => handleFormChange("published", event.target.checked)}
              />
              Article publié
            </label>

            {formError && <p className="text-red-400 text-sm">{formError}</p>}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-600 text-white rounded px-4 py-2 disabled:opacity-60"
              >
                {editingArticleId ? "Mettre à jour" : "Créer"}
              </button>
              {editingArticleId && (
                <button
                  type="button"
                  className="text-white underline"
                  onClick={() => {
                    resetForm();
                    setFormVisible(false);
                  }}
                >
                  Annuler
                </button>
              )}
            </div>
          </form>
        )}
      </div>
      )}

      <div className="md:grid md:grid-cols-3 md:w-full md:gap-4 md:mt-5 mt-2">
        {!isLoading ? (
          visibleArticles.map((article: ArticleProps) => (
            <div
              key={article.id}
              onMouseEnter={() => handleMouseEnter(Number(article.id))}
              onMouseLeave={handleMouseLeave}
            >
              <ArticleComponent
                title={article.title}
                imageUrl={article.imageUrl}
                link={`/news/${article.slug}`}
                isActive={selectedCardId === Number(article.id)}
              />
              {isAuthenticated && (
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    className="text-sm text-white underline"
                    onClick={() => handleEditArticle(article)}
                  >
                    Modifier
                  </button>
                  <button
                    className="text-sm text-red-400 underline disabled:opacity-60"
                    disabled={isSubmitting}
                    onClick={() => handleDeleteArticle(article.id)}
                  >
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-white">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default NewsListComponent;
