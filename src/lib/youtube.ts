const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'youtu.be',
  'www.youtu.be',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com',
]);

const VIDEO_ID = /^[\w-]{11}$/;

// Domaine "no-cookie" de YouTube : il ne dépose pas de cookie publicitaire tant
// que la vidéo n'est pas lue. Combiné au chargement au clic (voir YouTubeEmbed),
// il évite au site d'avoir besoin d'une bannière de consentement.
const EMBED_HOST = 'https://www.youtube-nocookie.com';

/** Convertit "1h2m3s", "90s" ou "90" en nombre de secondes. */
const parseStart = (value: string | null): number | null => {
  if (!value) return null;
  if (/^\d+$/.test(value)) return Number(value);
  const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!match) return null;
  const [, h, m, s] = match;
  const total = Number(h ?? 0) * 3600 + Number(m ?? 0) * 60 + Number(s ?? 0);
  return total > 0 ? total : null;
};

/**
 * Accepte n'importe quelle forme de lien YouTube et renvoie l'URL d'embed
 * correspondante : /watch?v=, youtu.be/, /shorts/, /live/, /embed/, ou un
 * identifiant seul. Une URL non reconnue est renvoyée telle quelle, pour ne
 * jamais casser un lien déjà en base.
 */
export function toYouTubeEmbedUrl(input: string | null | undefined): string {
  const raw = input?.trim() ?? '';
  if (!raw) return '';

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    // Pas une URL : peut-être un identifiant collé seul.
    return VIDEO_ID.test(raw) ? `${EMBED_HOST}/embed/${raw}` : raw;
  }

  if (!YOUTUBE_HOSTS.has(url.hostname)) return raw;

  const path = url.pathname;
  let id = '';

  if (url.hostname.endsWith('youtu.be')) {
    id = path.slice(1).split('/')[0];
  } else if (path === '/watch') {
    id = url.searchParams.get('v') ?? '';
  } else {
    const match = path.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/);
    if (match) id = match[1];
  }

  if (!VIDEO_ID.test(id)) return raw;

  // On ne conserve que les paramètres utiles à la lecture. Le "si=" des liens
  // de partage est un jeton de suivi, inutile dans une iframe.
  const params = new URLSearchParams();
  const start = parseStart(url.searchParams.get('t') ?? url.searchParams.get('start'));
  if (start) params.set('start', String(start));
  const list = url.searchParams.get('list');
  if (list) params.set('list', list);

  const query = params.toString();
  return `${EMBED_HOST}/embed/${id}${query ? `?${query}` : ''}`;
}

/**
 * Extrait l'identifiant d'une vidéo à partir de n'importe quelle forme de lien.
 * Renvoie null si le lien n'est pas reconnu.
 */
export function getYouTubeVideoId(input: string | null | undefined): string | null {
  const embed = toYouTubeEmbedUrl(input);
  const match = embed.match(/\/embed\/([\w-]{11})/);
  return match ? match[1] : null;
}

/**
 * Vignette officielle de la vidéo. Elle est servie par i.ytimg.com, mais passe
 * par l'optimiseur d'images de Next : c'est le serveur du site qui la récupère,
 * jamais le navigateur du visiteur. Aucune requête vers Google avant le clic.
 */
export function youTubeThumbnailUrl(input: string | null | undefined): string | null {
  const id = getYouTubeVideoId(input);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}
