'use client';
import { FaChevronDown } from "react-icons/fa";
import dynamic from 'next/dynamic'
import MailingList from "./components/_shared/MailingList";
import CustomButton from "./components/_shared/ui/CustomButton";
import ArticleComponent from "./components/news/Article";
import { useEffect, useState } from "react";
import type { Article } from "@/lib/articles";
import TourDates from "./components/_shared/shows/TourDates";
import InstagramFeed from "./components/_shared/InstagramFeed";
// Dynamically import the ReactPlayer component
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const handleMouseEnter = (cardId: number) => {
    setSelectedCardId(cardId);
  };

  const handleMouseLeave = () => {
    setSelectedCardId(null);
  };


useEffect(() => {
  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  fetchArticles();
}, []);

useEffect(() => {
      
}, [selectedCardId, setSelectedCardId])





  return (
      <main id="home" className="flex flex-col w-full items-center h-screen relative" style={{ backgroundImage: "url('/images/uploads/jwb-fond_noir.webp')" }}>
        <section className="w-full flex flex-col px-2 md:px-0 md:flex-row md:justify-start min-h-screen md:overflow-x-hidden">
          {/* BACKGROUND IMAGE */}
            <ReactPlayer
              url="/images/main-video-web7.webm"
              playing
              loop
              muted
              width="100%"
              height="100%"
              style={{objectFit: "cover"}}
              className="object-cover w-full h-full hidden md:block md:absolute md:top-0 md:left-0"
            />
      
          <div className="flex items-center pt-20 md:pl-60 md:mt-40 z-40 text-white w-full mb-6">
            <div className="flex flex-col items-center justify-between">
                <h2 className="text-[#ebe9db] text-3xl">New Album</h2>
                <h3 className="text-red-600">On vinyl splatter</h3>
                 
                  <div className="flex flex-row my-5 w-full md:hidden">
                    <ReactPlayer
                      url="https://jwb-medias.s3.eu-west-3.amazonaws.com/pubvinyle_2+(1).mov"
                      playing
                      muted
                      width="100%"
                      height="100%"
                      className=""
                    />
                  </div>
                  <div className="md:flex md:flex-row md:mb-5 md:py-10 md:w-full hidden">
                    <ReactPlayer
                      url="https://jwb-medias.s3.eu-west-3.amazonaws.com/pubvinyle_2+(1).mov"
                      playing
                      muted
                      width={300}
                      height="auto"
                      className=""
                    />
                  </div>
                  <div className="flex flex-col md:w-full md:mt-2">
                    <a href="https://li.sten.to/jennywiththeband" target="_blank">
                      <CustomButton 
                        text="Listen on Streaming"
                        className="hover:bg-red-600 md:mx-2 my-1 w-[300px]"
                      />
                    </a>
                    <a href="https://jenny-with-the-band.sumupstore.com/" target="_blank">
                      <CustomButton 
                        text="Buy Now"
                        className="hover:bg-red-600 md:mx-2 my-1 w-[300px]"
                      />
                    </a>
                  </div>
                  <div className="z-40 flex flex-col mt-10 items-center md:mt-20 md:bottom-0 md:pb-20 text-white font-body">
                    <p>scroll to continue</p>
                    <FaChevronDown className="text-white" />
                  </div>
            </div>
          </div>
        
         
        </section>
        {/* MAILING LIST */}
        <section className="w-full">
          <MailingList />
        </section>
        <section 
          className="relative bg-cover bg-center py-10" 
          style={{ 
            backgroundImage: "url('/images/uploads/ban-eyes.webp')",
          }}>
            
          {/* LATEST NEWS */}
          <div className="z-40">
            <div className="z-40 text-white">
              <p className="text-red-600">Latest</p>
              <h2 className="text-[#ebe9db] font-roboto">News</h2>
              <hr className="border border-red-600"/>
              <div className="md:grid md:grid-cols-2 md:gap-4 md:mt-5 md:w-2/3 mt-2">
                {articles.map((article: Article, index) => (
                  <div key={article.id} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                    <ArticleComponent
                      title={article.title}
                      imageUrl={article.imageUrl}
                      link={`/news/${article.slug}`}
                      isActive={index === selectedCardId}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* UPCOMING TOUR DATES */}
        <section className="w-full px-4">
          <TourDates />
        </section>
       {/*  INSTAGRAM */}
        <section>
            <InstagramFeed />
        </section>
      </main>
  );
}
