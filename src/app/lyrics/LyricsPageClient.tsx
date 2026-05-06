"use client";

/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import SongsTitles from "../components/lyrics/SongsTitles";
import AllLyrics from "../components/lyrics/AllLyrics";
import lyricsData from "./data/lyrics";
import type { Lyric } from "@/types/lyrics.types";

const LyricsPageClient = () => {
  const [lyrics] = useState<Lyric[]>(lyricsData.lyrics);
  const [selectedSong, setSelectedSong] = useState(1);

  const handleClickLyricsOfTheSong = (songId: number) => {
    setSelectedSong(songId);
  };

  return (
    <section className="bg-center bg-no-repeat bg-fixed relative h-auto border-2 border-red-600 z-0 w-full mt-20">
      <div className="flex flex-col items-center">
        <h1 className="text-white font-extrabold pt-12 px-4 pb-6 md:mb-10">
          Paroles de l&apos;Album <span className="text-red-logo">"Try to kill me"</span>
        </h1>
        <div className="w-2/3 flex flex-col items-center md:flex-row md:justify-between md:items-start">
          <aside className="md:w-1/2 md:pl-10">
            <SongsTitles lyrics={lyrics} onSongClick={handleClickLyricsOfTheSong} />
          </aside>
          <article className="md:w-1/2 flex flex-col items-center">
            <AllLyrics selectedLyrics={lyrics.find((item) => item.id === selectedSong) || null} />
          </article>
        </div>
      </div>
    </section>
  );
};

export default LyricsPageClient;
