import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zpiibfmdyfthffowpabj.supabase.co',
      },
      // Vignettes YouTube. Elles transitent par l'optimiseur d'images de Next,
      // donc c'est le serveur qui les récupère : le navigateur du visiteur ne
      // contacte jamais Google tant qu'il n'a pas cliqué sur la vidéo.
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
};

export default nextConfig;
