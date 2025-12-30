
'use client'


import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';


interface EditableIframeProps {
  videoId: number | string;
  tableName?: string;
  height?: number | string;
  width?: number | string;
  className?: string;
  iframeClassName?: string;
  title?: string;
  allow?: string;
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
}: EditableIframeProps) {
  const [embedUrl, setEmbedUrl] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auth check
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
    };
    checkAuth();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

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
    const { error } = await supabase
      .from(tableName)
      .update({ embedUrl: inputValue })
      .eq('id', idNum);
    if (error) {
      setError("Erreur lors de la sauvegarde");
    } else {
      setEmbedUrl(inputValue);
    }
    setIsSaving(false);
  };

  const resolvedWidth = typeof width === 'number' ? `${width}` : width;
  const resolvedHeight = typeof height === 'number' ? `${height}` : height;

  return (
    <div className={className}>
      {embedUrl ? (
        <iframe
          width={resolvedWidth}
          height={resolvedHeight}
          src={embedUrl}
          title={title}
          className={iframeClassName}
          frameBorder="0"
          allow={allow}
          allowFullScreen
        />
      ) : (
        <div
          className="flex items-center justify-center text-white text-sm bg-black/40 rounded border border-white/20"
          style={{ width: resolvedWidth, height: resolvedHeight }}
        >
          Aucune vidéo disponible
        </div>
      )}
      {isAuthenticated && (
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2 text-white text-sm">
          <label htmlFor={`video-url-${videoId}`} className="font-semibold">
            URL de la vidéo (embed)
          </label>
          <input
            id={`video-url-${videoId}`}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="rounded bg-white/10 px-3 py-2 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="https://www.youtube.com/embed/..."
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
      )}
    </div>
  );
}

