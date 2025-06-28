'use client'
import React, {useEffect} from 'react';
import supabase from "@/lib/supabaseClient";
import type { VideoProps } from "@/types/videos.types";


// Todo: remplacer les liens vers les videos youtube vers des liens dynamiques pointant vers un serveur noSQL (firebase)
const VideosPage = () => {
    const [loading, setLoading] = React.useState(true);
    const [video, setVideo] = React.useState(null);
    const slug = "videos";


  // fetch video from supabase
useEffect(() => {
  const fetchVideosFromSupabase = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('Videos')
      .select('*')
      .eq('slug', slug)
    if (error) {
      console.error('Error fetching videos from Supabase:', error.message);
      return;
    }
    console.log("data", data);
    setVideo(data && data.length > 0 ? (data[0] as VideoProps) : null);
    setLoading(false);
  };
  fetchVideosFromSupabase();
}, [slug]);

    return (
        <section className="pt-10 md:px-36 md:pt-32 bg-black-background relative z-10" id="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 z-20">
                <div className="">
                    <iframe width="100%" height="350" src="https://www.youtube.com/embed/wFjqZ50I8j4?si=0iiky3P9Mx6AZVSt" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div className="">
                        <iframe width="100%" height="350" src="https://www.youtube.com/embed/hsxw5GLyKMs?si=XDX9VEkbATU3nA63" title="Try to kill me live video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div className=" ">
                    <iframe width="100%" height="350" src="https://www.youtube.com/embed/-7jZcpJjYCI?si=u8G50YG3PqXfERtp" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>

                <div className="">
                        <iframe width="100%" height="350" src="https://www.youtube.com/embed/fYQfW0_8hkg" title="Try to kill me live video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div className="">
                        <iframe width="100%" height="350" src="https://www.youtube.com/embed/Qwnc7Ni3iVc?si=JnEfVTNuMkOZoXNs" title="Try to kill me live video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
            </div>
        </section>
     );
}

export default VideosPage;