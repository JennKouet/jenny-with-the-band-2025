'use client'
import React, {useEffect, useState} from 'react';
import supabase from "@/lib/supabaseClient";
import type { VideoProps } from "@/types/videos.types";
import useAuth from "@/app/hooks/useAuth";


// Todo: remplacer les liens vers les videos youtube vers des liens dynamiques pointant vers un serveur noSQL (firebase)
const VideosPage = () => {
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState<VideoProps[]>([]);
    const [newVideoUrl, setNewVideoUrl] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const isAuthenticated = useAuth();
    const slug = "videos";


  // fetch video from supabase
useEffect(() => {
  const fetchVideosFromSupabase = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('Videos')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('Error fetching videos from Supabase:', error.message);
      return;
    }
    console.log("data", data);
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
        embedUrl: newVideoUrl,
        slug: slug,
        published: true
      }
    ])
    .select();
  
  if (error) {
    console.error('Error adding video:', error.message);
    alert('Erreur lors de l\'ajout de la vidéo');
  } else if (data) {
    setVideos([...videos, ...(data as VideoProps[])]);
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

console.log("videos", videos);

    return (
        <section className="pt-10 md:px-36 md:pt-32 bg-black-background relative z-10" id="videos">
            {isAuthenticated && (
                <div className="mb-8 p-6 bg-gray-900 rounded-lg">
                    <h3 className="text-white text-xl mb-4">Ajouter une vidéo</h3>
                    <form onSubmit={handleAddVideo} className="flex gap-4">
                        <input
                            type="text"
                            value={newVideoUrl}
                            onChange={(e) => setNewVideoUrl(e.target.value)}
                            placeholder="URL embed YouTube (ex: https://www.youtube.com/embed/...)"
                            className="flex-1 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-600"
                            disabled={isAdding}
                        />
                        <button
                            type="submit"
                            disabled={isAdding || !newVideoUrl.trim()}
                            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            {isAdding ? 'Ajout...' : 'Ajouter'}
                        </button>
                    </form>
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 z-20">
                {!loading && videos.length > 0 ? (
                    videos.map((video) => (
                        <div key={video.id} className="relative group">
                            <iframe width="100%" height="350" src={video.embedUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            {isAuthenticated && (
                                <button
                                    onClick={() => handleDeleteVideo(video.id)}
                                    className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
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

export default VideosPage;