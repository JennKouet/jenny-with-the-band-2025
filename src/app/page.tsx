'use client';
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import dynamic from 'next/dynamic'
import supabase from "@/lib/supabaseClient";
import type { ArticleProps } from "@/types/articles.types";
import Link from "next/link";

// Components
//import MailingList from "./components/_shared/MailingList";
import CustomButton from "./components/_shared/ui/CustomButton";
import ArticleComponent from "./components/news/Article";
import TourDates from "./components/_shared/shows/TourDates";
import NewsListComponent from "./components/news/NewsList";
import ProductCardComponent from "./components/_shared/ProductCard";
import InstagramWidgetComponent from "./components/_shared/InstagramWidget";

// Dynamically import the ReactPlayer component
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Home() {
  const [articlesFromSupa, setArticlesFromSupa] = useState<ArticleProps[]>([]);
   const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
   const [isLoading, setLoading] = useState(true)

  const handleMouseEnter = (cardId: number) => {
    setSelectedCardId(cardId);
  };

  const handleMouseLeave = () => {
    setSelectedCardId(null);
  };

useEffect(() => {
      
}, [selectedCardId, setSelectedCardId])

// fetch articles from supabase
useEffect(() => {
  const fetchArticlesFromSupabase = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('Articles')
      .select('*')
    if (error) {
      console.error('Error fetching articles from Supabase:', error.message);
      return;
    }
    console.log("data", data);
    setArticlesFromSupa(data as ArticleProps[]);
    setLoading(false);
  };
  fetchArticlesFromSupabase();
}, []);



  return (
      <main id="home" className="flex flex-col w-full items-center relative" style={{ backgroundImage: "url('/images/uploads/jwb-fond_noir.webp')" }}>
        <section className="relative w-full h-screen overflow-hidden">
          {/* BACKGROUND IMAGE */}
            <ReactPlayer
              url="/images/main-video.mov"
              playing
              loop
              muted
              width="100%"
              height="100%"
              style={{objectFit: "cover"}}
              className="object-cover z-0 absolute top-0 left-0"
            />
      
          <div className="relative flex items-center md:pl-60 md:mt-32 z-40 text-white w-full h-full">
            <div className="flex flex-col items-center justify-between">
                <h2 className="text-[#ebe9db] text-3xl">New Album</h2>
                <h3 className="text-red-600">On vinyl splatter</h3>
                 
                  <div className="flex flex-row my-5 w-full md:hidden">
                    <ReactPlayer
                      url="/images/pubvinyle_2.mp4"
                      playing
                      muted
                      width="100%"
                      height="100%"
                      className=""
                    />
                  </div>
                  <div className="md:flex md:flex-row md:mb-5 md:py-10 md:w-full hidden">
                    <ReactPlayer
                      url="/images/pubvinyle_2.mp4"
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
                  <div className="z-40 flex flex-col mt-10 items-center md:mt-20 md:bottom-20 md:pb-20 text-white font-body">
                    <p>scroll to continue</p>
                    <FaChevronDown className="text-white" />
                  </div>
            </div>
          </div>
        
         
        </section>
        {/* MAILING LIST */}
       {/*  <section className="w-full">
          <MailingList />
        </section> */}
        <section 
          className="relative bg-cover bg-center py-32">
            
          {/* LATEST NEWS */}
          <div className="z-40 w-2/3 mx-auto">
            <div className="z-40 text-white">
              <p className="text-red-600">Latest</p>
              <h2 className="text-[#ebe9db] font-roboto">News</h2>
              <hr className="border border-red-600"/>
              <div className="md:grid md:grid-cols-2 lg:grid-cols-3 lg:w-full md:gap-4 md:mt-5 md:w-2/3 mt-2">
                {isLoading ? (
                  articlesFromSupa.map((article: ArticleProps, index) => (
                  <div key={article.id} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                    <ArticleComponent
                      title={article.title}
                      imageUrl={article.imageUrl}
                      link={`/news/${article.slug}`}
                      isActive={index === selectedCardId}
                    />
                    </div>
                  ))
                ) : (
                  <p className="text-white text-xl">Loading...</p>
                )}
              </div>
                <NewsListComponent />
            </div>
          </div>
        </section>
        {/* UPCOMING TOUR DATES */}
        <section className="w-2/3 my-20 px-4 py-10">
          <TourDates />
          <div className="flex flex-col items-center">
          <Link href="/shows" target="_blank">
            <CustomButton 
              text="Click here to see all tour dates"
              className="hover:bg-red-600 md:mx-2 my-1 w-[300px]"
            />
          </Link>
          </div>
        </section>
       {/*  MERCH */}
       <section className="relative bg-center py-32 pt-20 md:w-2/3" >
          <a href="https://jenny-with-the-band.sumupstore.com/" target="_blank">
            <p className="text-red-600">Official</p>
            <h2 className="text-[#ebe9db] font-roboto">Merch Store</h2>
          </a>
          <hr className="border border-red-600"/>
          <ProductCardComponent />
       </section>
       {/* INSTAGRAM WALL */}
       <section className="flex flex-col items-center w-full mt-20 pt-10">
                <h3 className="text-lg mb-4 font-horbse">Instagram <span className="text-red-600 font-bold">@Jennywiththeband</span></h3>
                <InstagramWidgetComponent />
       </section>
      </main>
  );
}
