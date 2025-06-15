/* eslint-disable react/no-unescaped-entities */
'use client'
import React, {useState, useEffect} from 'react';
import SongsTitles from '../components/lyrics/SongsTitles';
import AllLyrics from '../components/lyrics/AllLyrics';
import lyricsData from './data/lyrics';

export interface Lyric {
    id: number,
    title: string,
    image: string,
    text: string
}


const LyricsPage = () => {
    const [lyrics, setLyrics] = useState<Lyric[]>([]);
    const [selectedSong, setselectedSong] = useState(1);

    useEffect(() => {
        setLyrics(lyricsData.lyrics);
    }, []);

    console.log('lyrics', lyrics)
    const handleClickLyricsOfTheSong = (songId: number) => {
        console.log('song id', songId)
        setselectedSong(songId);
        //Todo: mettre un loader avant d'afficher l'image de la chanson
    }
    return ( 
        <section className='bg-center bg-no-repeat bg-fixed relative h-auto border-2 z-0 w-full mt-20'>
            <div className='flex flex-col items-center'>
            <h1 className='text-white font-extrabold pt-12 px-4 pb-6 md:mb-10'>Paroles de l'Album <span className="text-red-logo">"Try to kill me"</span></h1>
                <div className="w-2/3 flex flex-col items-center md:flex-row md:justify-between md:items-start">
                    <aside className="md:w-1/2 md:pl-10">
                        <SongsTitles lyrics={lyrics} onSongClick={handleClickLyricsOfTheSong}/>
                    </aside>
                    <article className="md:w-1/2 flex flex-col items-center">
                        <AllLyrics selectedLyrics={lyrics.find((item) => (item.id === selectedSong)) || null} />
                    </article>
                </div>
            </div>
        
        
         
    </section>
     );
}
 
export default LyricsPage;