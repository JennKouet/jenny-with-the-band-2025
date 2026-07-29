"use client";
import React, { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';
import useAuth from '@/app/hooks/useAuth';
import { adminForm } from './ui/adminForm';
import Toast, { type ToastTone } from './ui/Toast';

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
  const [toast, setToast] = useState<{ message: string; tone: ToastTone } | null>(null);

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
      setToast({ message: "Échec de l'enregistrement du lien.", tone: 'error' });
    } else {
      setToast({ message: 'Lien du dossier de presse enregistré.', tone: 'success' });
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
      setToast({ message: "Échec de l'envoi du fichier.", tone: 'error' });
      setUploading(false);
      return;
    }

      // Récupère l'URL publique
      const { data } = supabase.storage.from('documents').getPublicUrl(filePath);
    const publicUrl = data?.publicUrl;
    if (publicUrl) {
      setInputValue(publicUrl);
      if (setPressKitUrl) setPressKitUrl(publicUrl);
      // Mets à jour ou insère la table Links. L'erreur doit être remontée :
      // le fichier peut être envoyé alors que l'écriture en base échoue.
      if (id) {
        let dbError = null;
        if (linkExists) {
          ({ error: dbError } = await supabase
            .from('Links')
            .update({ linkUrl: publicUrl })
            .eq('id', id));
        } else {
          const { error: insertError, data: insertData } = await supabase
            .from('Links')
            .insert([{ id, linkUrl: publicUrl, type: 'press_kit' }])
            .select()
            .maybeSingle();
          dbError = insertError;
          if (!insertError && insertData) setLinkExists(true);
        }

        if (dbError) {
          setError("Erreur lors de l'enregistrement en base");
          setToast({
            message: "Fichier envoyé, mais non enregistré en base.",
            tone: 'error',
          });
        } else {
          setToast({ message: 'Dossier de presse enregistré en base.', tone: 'success' });
        }
      }
    }
    setUploading(false);
  };

  if (!isAuthenticated) return null;

  return (
    <div className={`${adminForm.card} mt-3`}>
      <p className={adminForm.eyebrow}>Administration</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor={`link-url-${id}`} className={`mt-2 ${adminForm.label}`}>
          URL du dossier de presse
        </label>
        <input
          id={`link-url-${id}`}
          type="url"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className={adminForm.input}
          placeholder="https://…"
        />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={isSaving || !inputValue.trim()}
            className={adminForm.primaryButton}
          >
            {isSaving ? 'Sauvegarde…' : 'Sauvegarder'}
          </button>
          {error && <span className={adminForm.error}>{error}</span>}
        </div>
      </form>

      <div className="mt-4 border-t border-white/10 pt-4">
        <label htmlFor={`file-upload-${id}`} className={adminForm.label}>
          Ou envoyer un PDF
        </label>
        <input
          id={`file-upload-${id}`}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className={adminForm.fileInput}
          disabled={uploading}
        />
        {uploading && <p className={adminForm.hint}>Upload en cours…</p>}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          tone={toast.tone}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default EditablePressKitLink;