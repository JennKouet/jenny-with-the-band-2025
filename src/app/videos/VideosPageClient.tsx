"use client";

import React, {useEffect, useState} from 'react';
import supabase from "@/lib/supabaseClient";
import type { VideoProps } from "@/types/videos.types";
import useAuth from "@/app/hooks/useAuth";
import { toYouTubeEmbedUrl } from "@/lib/youtube";
import YouTubeEmbed from "@/app/components/_shared/YouTubeEmbed";
import { adminForm } from "@/app/components/_shared/ui/adminForm";

const VideosPageClient = () => {
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState<VideoProps[]>([]);
    const [newVideoUrl, setNewVideoUrl] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const isAuthenticated = useAuth();
    const slug = "videos";

useEffect(() => {
  const fetchVideosFromSupabase = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('Videos')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('Error fetching videos from Supabase:', error.message);
      setLoading(false);
      return;
    }
    setVideos(data && data.length > 0 ? (data as VideoProps[]) : []);
    setLoading(false);
  };
  fetchVideosFromSupabase();
}, [slug]);

const handleAddVideo = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!newVideoUrl.trim()) return;

  setIsAdding(true);
  const { data, error } = await supabase
    .from('Videos')
    .insert([
      {
        // On enregistre l'URL d'embed, quelle que soit la forme du lien collé.
        embedUrl: toYouTubeEmbedUrl(newVideoUrl),
        slug: slug,
        published: true
      }
    ])
    .select();

  if (error) {
    console.error('Error adding video:', error.message);
    alert('Erreur lors de l\'ajout de la vidéo');
  } else if (data) {
    // La liste est triée du plus récent au plus ancien : la nouvelle vidéo
    // doit donc être placée en tête, sinon elle atterrit en bas de la grille.
    setVideos([...(data as VideoProps[]), ...videos]);
    setNewVideoUrl('');
  }
  setIsAdding(false);
};

const handleDeleteVideo = async (id: string) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette vidéo ?')) return;

  const { error } = await supabase
    .from('Videos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting video:', error.message);
    alert('Erreur lors de la suppression');
  } else {
    setVideos(videos.filter(video => video.id !== id));
  }
};

    return (
        <section className="pt-10 md:px-36 md:pt-32 bg-black-background relative z-10" id="videos">
            <h1 className="sr-only">Vidéos de Jenny With the Band</h1>
            {isAuthenticated && (
                <form onSubmit={handleAddVideo} className={`${adminForm.card} mb-8`}>
                    <p className={adminForm.eyebrow}>Administration</p>

                    <label htmlFor="new-video-url" className={`mt-2 ${adminForm.label}`}>
                        Ajouter une vidéo
                    </label>

                    <div className="flex flex-wrap items-start gap-3">
                        <input
                            id="new-video-url"
                            type="url"
                            value={newVideoUrl}
                            onChange={(e) => setNewVideoUrl(e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className={`${adminForm.input} min-w-60 flex-1`}
                            disabled={isAdding}
                        />
                        <button
                            type="submit"
                            disabled={isAdding || !newVideoUrl.trim()}
                            className={`${adminForm.primaryButton} mt-1.5`}
                        >
                            {isAdding ? 'Ajout…' : 'Ajouter'}
                        </button>
                    </div>

                    <p className={adminForm.hint}>
                        Colle le lien tel quel : partage, /watch, youtu.be ou Short.
                    </p>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 z-20">
                {!loading && videos.length > 0 ? (
                    videos.map((video) => (
                        <div key={video.id} className="relative group p-4">
                            <YouTubeEmbed
                                embedUrl={video.embedUrl}
                                width="100%"
                                height={350}
                                className="w-full h-57.5 md:h-87.5"
                            />
                            {isAuthenticated && (
                                <button
                                    onClick={() => handleDeleteVideo(video.id)}
                                    className="absolute top-6 right-6 bg-red-600 text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                                >
                                    Supprimer
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-white text-center">Loading videos...</div>
                )}
            </div>
        </section>
     );
}

export default VideosPageClient;
