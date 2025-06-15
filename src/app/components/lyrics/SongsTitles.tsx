'use client'
import React, { FC } from 'react'
import { Lyric } from '../../lyrics/page';

interface SongsTitlesProps {
    lyrics: Lyric[];
    onSongClick: (songId: number) => void;
  }

const SongsTitles: FC<SongsTitlesProps> = ({lyrics, onSongClick}) => {
   
    return ( 
        <div className='p-10 border-b-2 md:border-r-2 md:border-b-0 border-white'>
            <h2 className="text-white">Titres</h2>
            <small className="text-white">(Cliquez sur un titre pour voir les paroles)</small>
                <select
                    className='w-full mt-6 p-2 border border-gray-300 rounded md:hidden'
                    onChange={(e) => onSongClick(parseInt(e.target.value))}
                    >
                    {lyrics.map((lyric, index) => (
                        <option key={index} value={lyric.id}>
                        {lyric.id} - {lyric.title}
                        </option>
                    ))}
                </select>
            <ul className='w-full mt-6 hidden md:flex md:flex-col'>
            {lyrics.map((lyric, index) => (
                <li 
                    key={index} 
                    onClick={() => onSongClick(lyric.id)} 
                    className='flex flex-row justify-between text-white text-2xl cursor-pointer mb-4'
                >
                    <div className='mr-4 text-left font-display'>
                        <p>{lyric.id} - {lyric.title}</p>
                    </div>
                </li>
            ))}
                
            </ul>
        </div>
     );
}
 
export default SongsTitles;