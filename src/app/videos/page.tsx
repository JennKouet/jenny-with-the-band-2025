'use client'
import React, {useEffect} from 'react';
import supabase from "@/lib/supabaseClient";
import type { VideoProps } from "@/types/videos.types";


// Todo: remplacer les liens vers les videos youtube vers des liens dynamiques pointant vers un serveur noSQL (firebase)
const VideosPage = () => {
    const [loading, setLoading] = React.useState(true);
    const [videos, setVideos] = React.useState<VideoProps[]>([]);
    const slug = "videos";


  // fetch video from supabase
useEffect(() => {
  const fetchVideosFromSupabase = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('Videos')
      .select('*')
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

console.log("videos", videos);

    return (
        <section className="pt-10 md:px-36 md:pt-32 bg-black-background relative z-10" id="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 z-20">
                {!loading && videos.length > 0 ? (
                    videos.map((video, index) => (
                        <div key={index} className="">
                            <iframe width="100%" height="350" src={video.embedUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
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