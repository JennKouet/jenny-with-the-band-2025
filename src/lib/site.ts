export const siteConfig = {
  name: "Jenny With the Band",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.jennywiththeband.com",
  description:
    "Site officiel de Jenny With the Band, groupe rock blues nantais : actualités, concerts, vidéos, paroles, merch et contact booking.",
  locale: "fr_FR",
  openGraphImage: {
    url: "/images/uploads/miniature-youtube.webp",
    width: 1500,
    height: 837,
    alt: "Jenny With the Band en vidéo",
  },
  socialLinks: [
    "https://www.facebook.com/jennywiththeband",
    "https://www.instagram.com/jennywiththeband/",
    "https://open.spotify.com/intl-fr/album/1A4ZshLdOth4qcfJIKkswJ",
    "https://music.apple.com/fr/album/try-to-kill-me/1702467736",
    "https://www.youtube.com/@jennywiththeband",
  ],
};

export function getSiteUrl(path = "/") {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return new URL(normalizedPath, baseUrl).toString();
}
