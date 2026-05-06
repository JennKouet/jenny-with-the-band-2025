'use client'
import React, {FC} from 'react';
import type { Lyric } from '@/types/lyrics.types';
import Image from "next/image";

interface SelectedLyricsProps {
    selectedLyrics?: Lyric | null | undefined;
}

const AllLyrics: FC<SelectedLyricsProps> = ({selectedLyrics}) => {
    return ( 
        <div className='p-10'>
            {selectedLyrics && (
                <div className="flex flex-col items-center">
                    {/* TODO : mettre un loader pour charger l'image */}
                    <Image 
                        src={selectedLyrics.image ? `/images/uploads/${selectedLyrics.image}` : ""} 
                        alt={"logo de la chanson " + selectedLyrics.title} 
                        className="md:w-2/3"
                        style={{
                            objectFit: "contain"
                          }}
                          height="550"
                          width="550"
                    />
                    <p className="text-lg text-white whitespace-pre-line mt-10">
                        {selectedLyrics.text}
                    </p>
                </div>
            )}
        </div>
     );
}
 
export default AllLyrics;
