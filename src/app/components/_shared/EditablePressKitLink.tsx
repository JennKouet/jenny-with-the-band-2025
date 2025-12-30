"use client";
import React, { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';
import useAuth from '@/app/hooks/useAuth';
interface EditableLinkProps {
  id?: number;
  linkUrl?: string;
  setPressKitUrl?: (url: string) => void;
}


const EditablePressKitLink = ({ id, linkUrl, setPressKitUrl }: EditableLinkProps) => {
  const [inputValue, setInputValue] = useState(linkUrl || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = useAuth();
  const [uploading, setUploading] = useState(false);

  const [linkExists, setLinkExists] = useState(true);
  useEffect(() => {
    const fetchLinkUrl = async () => {
      setError(null);
      const { data, error } = await supabase
        .from('Links')
        .select('linkUrl')
        .eq('id', id)
        .maybeSingle();
      if (error) {
        setError("Erreur de chargement");
        return;
      }
      if (!data) {
        setLinkExists(false);
        setInputValue('');
      } else {
        setLinkExists(true);
        setInputValue(data.linkUrl || '');
      }
    };
    if (id) fetchLinkUrl();
  }, [id]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    let error = null;
    if (linkExists) {
      // Update
      ({ error } = await supabase
        .from('Links')
        .update({ linkUrl: inputValue })
        .eq('id', id));
    } else {
      // Insert
      const { error: insertError, data: insertData } = await supabase
        .from('Links')
        .insert([{ id, linkUrl: inputValue, type: 'press_kit' }])
        .select()
        .maybeSingle();
      error = insertError;
      if (!insertError && insertData) setLinkExists(true);
    }

    if (error) {
      setError("Erreur lors de la sauvegarde");
    }
    setIsSaving(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const fileExt = file.name.split('.').pop();
    const fileName = `presskit_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

      // Upload dans le bucket 'documents'
      const { error: uploadError } = await supabase.storage
        .from('documents')
      .upload(filePath, file, { upsert: true, contentType: file.type });

    if (uploadError) {
      setError("Erreur lors de l'upload du fichier");
      setUploading(false);
      return;
    }

      // Récupère l'URL publique
      const { data } = supabase.storage.from('documents').getPublicUrl(filePath);
    const publicUrl = data?.publicUrl;
    if (publicUrl) {
      setInputValue(publicUrl);
      if (setPressKitUrl) setPressKitUrl(publicUrl);
      // Mets à jour ou insère la table Links
      if (id) {
        if (linkExists) {
          await supabase.from('Links').update({ linkUrl: publicUrl }).eq('id', id);
        } else {
          const { error: insertError, data: insertData } = await supabase
            .from('Links')
            .insert([{ id, linkUrl: publicUrl, type: 'press_kit' }])
            .select()
            .maybeSingle();
          if (!insertError && insertData) setLinkExists(true);
        }
      }
    }
    setUploading(false);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="mt-3 flex flex-col gap-4 text-white text-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor={`link-url-${id}`} className="font-semibold">
          URL du dossier de presse
        </label>
        <input
          id={`link-url-${id}`}
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="rounded bg-white/10 px-3 py-2 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="insérez le lien ici"
        />
        {error && <p className="text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={isSaving}
          className="self-start rounded bg-red-600 px-4 py-2 text-white hover:bg-red-500 disabled:opacity-50"
        >
          {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </form>
      <div>
        <label htmlFor={`file-upload-${id}`} className="font-semibold block mb-1">
          Ou uploader un PDF
        </label>
        <input
          id={`file-upload-${id}`}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="text-white border border-white/30 rounded px-3 py-2"
          disabled={uploading}
        />
        {uploading && <p className="text-gray-300">Upload en cours...</p>}
      </div>
    </div>
  );
};

export default EditablePressKitLink;