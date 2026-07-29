'use client';
import { useCallback, useEffect, useMemo, useState } from "react";
import supabase from "@/lib/supabaseClient";
import type { ArticleProps } from "@/types/articles.types";
import ArticleComponent from "./Article";
import useAuth from "@/app/hooks/useAuth";
import { adminForm } from "@/app/components/_shared/ui/adminForm";
import Toast, { type ToastTone } from "@/app/components/_shared/ui/Toast";

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
  const [toast, setToast] = useState<{ message: string; tone: ToastTone } | null>(null);
  const isAuthenticated = useAuth();

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
      setToast({ message: "Échec de l'envoi de l'image.", tone: "error" });
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
      setToast({ message: "Échec de la suppression de l'article.", tone: "error" });
      setSubmitting(false);
      return;
    }
    await fetchArticlesFromSupabase();
    setToast({ message: "Article supprimé.", tone: "success" });
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
      setToast({
        message: editingArticleId
          ? "Échec de la mise à jour de l'article."
          : "Échec de la création de l'article.",
        tone: "error",
      });
      setSubmitting(false);
      return;
    }

    setToast({
      message: editingArticleId ? "Article mis à jour." : "Article créé.",
      tone: "success",
    });
    await fetchArticlesFromSupabase();
    resetForm();
    setFormVisible(false);
    setSubmitting(false);
  };

  return (
    <div>
      {isAuthenticated && (
      <div className={`${adminForm.card} mb-6`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className={adminForm.eyebrow}>Administration</p>
            <p className={adminForm.title}>Articles</p>
          </div>
          <div className="flex items-center gap-3">
            <button className={adminForm.linkButton} onClick={() => supabase.auth.signOut()}>
              Se déconnecter
            </button>
            <button
              className={adminForm.secondaryButton}
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
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="article-title" className={adminForm.label}>
                Titre
              </label>
              <input
                id="article-title"
                type="text"
                value={formValues.title}
                onChange={(event) => handleFormChange("title", event.target.value)}
                className={adminForm.input}
                required
              />
            </div>

            <div>
              <label htmlFor="article-description" className={adminForm.label}>
                Description
              </label>
              <textarea
                id="article-description"
                value={formValues.description}
                onChange={(event) => handleFormChange("description", event.target.value)}
                className={adminForm.textarea}
                rows={5}
              />
              <p className={adminForm.hint}>
                Les liens sont détectés automatiquement, et les sauts de ligne conservés.
              </p>
            </div>

            <div>
              <label htmlFor="article-slug" className={adminForm.label}>
                Slug
              </label>
              <input
                id="article-slug"
                type="text"
                value={formValues.slug}
                onChange={(event) => handleFormChange("slug", event.target.value)}
                className={adminForm.input}
                required
              />
              <p className={adminForm.hint}>
                Identifiant dans l&apos;URL de l&apos;article, en minuscules et sans accents.
              </p>
            </div>

            <div>
              <label htmlFor="article-image" className={adminForm.label}>
                Image
              </label>
              <input
                id="article-image"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className={adminForm.fileInput}
              />
              {isUploadingImage && (
                <p className={adminForm.hint}>Conversion et upload en cours…</p>
              )}
              {formValues.imageUrl && !isUploadingImage && (
                <p className={`mt-1.5 ${adminForm.success}`}>
                  Image envoyée : {formValues.imageUrl}
                </p>
              )}
            </div>

            <label className="flex items-center gap-2 text-sm text-white">
              <input
                type="checkbox"
                checked={formValues.published}
                onChange={(event) => handleFormChange("published", event.target.checked)}
                className="h-4 w-4 accent-red-600"
              />
              Article publié
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className={adminForm.primaryButton}
              >
                {editingArticleId ? "Mettre à jour" : "Créer"}
              </button>
              {editingArticleId && (
                <button
                  type="button"
                  className={adminForm.linkButton}
                  onClick={() => {
                    resetForm();
                    setFormVisible(false);
                  }}
                >
                  Annuler
                </button>
              )}
              {formError && <span className={adminForm.error}>{formError}</span>}
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
                <div className="font-[roboto] mt-2 flex justify-end gap-4">
                  <button
                    className={adminForm.linkButton}
                    onClick={() => handleEditArticle(article)}
                  >
                    Modifier
                  </button>
                  <button
                    className="text-sm text-red-400 underline transition-colors hover:text-red-300 disabled:opacity-60"
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

      {/* Les toasts ne sont déclenchés que par les actions d'administration,
          elles-mêmes réservées au compte admin. */}
      {isAuthenticated && toast && (
        <Toast message={toast.message} tone={toast.tone} onClose={() => setToast(null)} />
      )}
    </div>
  );
};

export default NewsListComponent;
