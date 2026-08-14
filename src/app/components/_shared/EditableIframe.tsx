
'use client'


import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';
import useAuth from '@/app/hooks/useAuth';
import { toYouTubeEmbedUrl } from '@/lib/youtube';
import { adminForm } from './ui/adminForm';
import Toast, { type ToastTone } from './ui/Toast';
import YouTubeEmbed, { YOUTUBE_ALLOW } from './YouTubeEmbed';


interface EditableIframeProps {
  videoId: number | string;
  tableName?: string;
  height?: number | string;
  width?: number | string;
  className?: string;
  iframeClassName?: string;
  title?: string;
  allow?: string;
  /** Image affichée à la place de la vidéo tant que l'utilisateur n'a pas cliqué. */
  thumbnail?: string;
}

const DEFAULT_ALLOW = YOUTUBE_ALLOW;

export default function EditableIframe({
  videoId,
  tableName = 'HomeVideos',
  height = 350,
  width = '100%',
  className = '',
  iframeClassName = '',
  title = 'YouTube video player',
  allow = DEFAULT_ALLOW,
  thumbnail,
}: EditableIframeProps) {
  const [embedUrl, setEmbedUrl] = useState('');
  const [inputValue, setInputValue] = useState('');
  const isAuthenticated = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; tone: ToastTone } | null>(null);

  // Fetch video url
  useEffect(() => {
    const fetchUrl = async () => {
      setError(null);
      const idNum = typeof videoId === 'string' ? parseInt(videoId, 10) : videoId;
      const { data, error } = await supabase
        .from(tableName)
        .select('embedUrl')
        .eq('id', idNum)
        .maybeSingle();
      if (error) {
        setError("Erreur de chargement");
        return;
      }
      setEmbedUrl(data?.embedUrl || '');
      setInputValue(data?.embedUrl || '');
    };
    if (videoId) fetchUrl();
  }, [videoId, tableName]);

  // Update video url
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    const idNum = typeof videoId === 'string' ? parseInt(videoId, 10) : videoId;
    // On enregistre l'URL d'embed, quelle que soit la forme du lien collé.
    const normalizedUrl = toYouTubeEmbedUrl(inputValue);
    const { error } = await supabase
      .from(tableName)
      .update({ embedUrl: normalizedUrl })
      .eq('id', idNum);
    if (error) {
      setToast({ message: "Échec de l'enregistrement de la vidéo.", tone: 'error' });
    } else {
      setEmbedUrl(normalizedUrl);
      setInputValue(normalizedUrl);
      setToast({ message: 'Vidéo enregistrée en base.', tone: 'success' });
    }
    setIsSaving(false);
  };

  // Les attributs HTML width/height sont sans unité, mais le CSS en exige une.
  const cssWidth = typeof width === 'number' ? `${width}px` : width;
  const cssHeight = typeof height === 'number' ? `${height}px` : height;

  return (
    <div className={className}>
      {/* Colonne interne : le formulaire reste sous la vidéo même quand le
          conteneur parent est en flex-row. */}
      <div className="flex w-full flex-col items-center">
      {embedUrl ? (
        <YouTubeEmbed
          // Remonter la vidéo enregistrée réinitialise la façade, pour que la
          // nouvelle vignette s'affiche au lieu du lecteur précédent.
          key={embedUrl}
          embedUrl={embedUrl}
          title={title}
          thumbnail={thumbnail}
          // La vignette fournie contient déjà un bouton play incrusté.
          showPlayIcon={!thumbnail}
          width={width}
          height={height}
          className={iframeClassName}
          allow={allow}
        />
      ) : (
        <div
          className="flex items-center justify-center text-white text-sm bg-black/40 rounded border border-white/20"
          style={{ width: cssWidth, height: cssHeight }}
        >
          {error ?? 'Aucune vidéo disponible'}
        </div>
      )}
      {isAuthenticated && (
        <form
          onSubmit={handleSubmit}
          className={`${adminForm.card} mt-4 max-w-xl`}
        >
          <p className={adminForm.eyebrow}>Administration</p>

          <label htmlFor={`video-url-${videoId}`} className={`mt-2 ${adminForm.label}`}>
            Lien de la vidéo YouTube
          </label>

          <input
            id={`video-url-${videoId}`}
            type="url"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className={adminForm.input}
            placeholder="https://www.youtube.com/watch?v=..."
          />

          <p className={adminForm.hint}>
            Colle le lien tel quel : partage, /watch, youtu.be ou Short.
          </p>

          <div className="mt-3">
            <button
              type="submit"
              disabled={isSaving || !inputValue.trim()}
              className={adminForm.primaryButton}
            >
              {isSaving ? 'Sauvegarde…' : 'Sauvegarder'}
            </button>
          </div>
        </form>
      )}
      </div>

      {isAuthenticated && toast && (
        <Toast message={toast.message} tone={toast.tone} onClose={() => setToast(null)} />
      )}
    </div>
  );
}

