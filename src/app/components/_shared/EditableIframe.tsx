
'use client'


import { useEffect, useState } from 'react';
import Image from 'next/image';
import supabase from '@/lib/supabaseClient';
import useAuth from '@/app/hooks/useAuth';
import { toYouTubeEmbedUrl } from '@/lib/youtube';
import { adminForm } from './ui/adminForm';
import Toast, { type ToastTone } from './ui/Toast';


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

const DEFAULT_ALLOW = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';

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
  const [hasClickedPlay, setHasClickedPlay] = useState(false);

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
      // La vignette réapparaît pour que la nouvelle vidéo soit visible tout de suite.
      setHasClickedPlay(false);
    }
    setIsSaving(false);
  };

  const resolvedWidth = typeof width === 'number' ? `${width}` : width;
  const resolvedHeight = typeof height === 'number' ? `${height}` : height;

  // Les attributs HTML width/height sont sans unité, mais le CSS en exige une.
  const cssWidth = typeof width === 'number' ? `${width}px` : width;
  const cssHeight = typeof height === 'number' ? `${height}px` : height;

  // Converti aussi à l'affichage : les lignes déjà en base peuvent contenir
  // n'importe quelle forme de lien YouTube.
  const srcUrl = toYouTubeEmbedUrl(embedUrl);

  // La vidéo n'est chargée qu'au clic sur la vignette : on ajoute autoplay pour
  // qu'elle démarre immédiatement, sans second clic dans le lecteur YouTube.
  const playableUrl = hasClickedPlay
    ? `${srcUrl}${srcUrl.includes('?') ? '&' : '?'}autoplay=1`
    : srcUrl;

  return (
    <div className={className}>
      {/* Colonne interne : le formulaire reste sous la vidéo même quand le
          conteneur parent est en flex-row. */}
      <div className="flex w-full flex-col items-center">
      {embedUrl ? (
        thumbnail && !hasClickedPlay ? (
          <button
            type="button"
            onClick={() => setHasClickedPlay(true)}
            aria-label={`Lire la vidéo : ${title}`}
            className={`group relative block cursor-pointer overflow-hidden ${iframeClassName}`}
            style={{ width: cssWidth, height: cssHeight }}
          >
            {/* La vignette contient déjà un bouton play incrusté : on n'en ajoute
                pas un second, juste un assombrissement au survol. */}
            <Image
              src={thumbnail}
              alt=""
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          </button>
        ) : (
          <iframe
            width={resolvedWidth}
            height={resolvedHeight}
            src={playableUrl}
            title={title}
            className={iframeClassName}
            frameBorder="0"
            allow={allow}
            allowFullScreen
          />
        )
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

