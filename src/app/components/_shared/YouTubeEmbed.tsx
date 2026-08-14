'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toYouTubeEmbedUrl, youTubeThumbnailUrl } from '@/lib/youtube';

export const YOUTUBE_ALLOW =
  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';

interface YouTubeEmbedProps {
  /** Lien YouTube sous n'importe quelle forme : il est normalisé à l'affichage. */
  embedUrl: string;
  title?: string;
  /** Vignette personnalisée. À défaut, celle de la vidéo est utilisée. */
  thumbnail?: string;
  width?: number | string;
  height?: number | string;
  /** Appliqué à la fois à la vignette et à l'iframe, pour un rendu identique. */
  className?: string;
  /** À désactiver quand la vignette fournie contient déjà un bouton play. */
  showPlayIcon?: boolean;
  allow?: string;
}

/**
 * Lecteur YouTube en "chargement au clic".
 *
 * Tant que le visiteur n'a pas cliqué, aucune connexion n'est ouverte vers
 * Google : on n'affiche qu'une image servie par notre propre domaine. Le clic
 * vaut consentement éclairé — d'où la mention affichée sur la vignette. C'est
 * ce qui permet au site de se passer de bannière cookies.
 */
export default function YouTubeEmbed({
  embedUrl,
  title = 'YouTube video player',
  thumbnail,
  width = '100%',
  height = 350,
  className = '',
  showPlayIcon = true,
  allow = YOUTUBE_ALLOW,
}: YouTubeEmbedProps) {
  const [hasClickedPlay, setHasClickedPlay] = useState(false);

  const srcUrl = toYouTubeEmbedUrl(embedUrl);
  const posterUrl = thumbnail ?? youTubeThumbnailUrl(embedUrl);

  // Les attributs HTML width/height sont sans unité, mais le CSS en exige une.
  const cssWidth = typeof width === 'number' ? `${width}px` : width;
  const cssHeight = typeof height === 'number' ? `${height}px` : height;

  if (hasClickedPlay) {
    // autoplay pour que la vidéo démarre tout de suite, sans un second clic.
    const playableUrl = `${srcUrl}${srcUrl.includes('?') ? '&' : '?'}autoplay=1`;
    return (
      <iframe
        width={typeof width === 'number' ? `${width}` : width}
        height={typeof height === 'number' ? `${height}` : height}
        src={playableUrl}
        title={title}
        className={className}
        frameBorder="0"
        allow={allow}
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setHasClickedPlay(true)}
      aria-label={`Lire la vidéo : ${title}. Le lecteur YouTube sera chargé et peut déposer des cookies.`}
      className={`group relative block cursor-pointer overflow-hidden bg-black/40 ${className}`}
      style={{ width: cssWidth, height: cssHeight }}
    >
      {posterUrl && (
        <Image
          src={posterUrl}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}

      <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />

      {showPlayIcon && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-20 items-center justify-center rounded-xl bg-black/60 transition-colors group-hover:bg-red-600">
            <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      )}

      {/* Mention de consentement : le visiteur doit savoir ce que déclenche son
          clic avant de le faire. */}
      <span className="absolute inset-x-0 bottom-0 bg-black/70 px-2 py-1 text-[11px] leading-tight text-white/90">
        En lançant la lecture, le lecteur YouTube est chargé et peut déposer des cookies.
      </span>
    </button>
  );
}
