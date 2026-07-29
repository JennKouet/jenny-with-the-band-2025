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
    return VIDEO_ID.test(raw) ? `https://www.youtube.com/embed/${raw}` : raw;
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
  return `https://www.youtube.com/embed/${id}${query ? `?${query}` : ''}`;
}
