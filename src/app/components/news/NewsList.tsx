'use client';
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import type { ArticleProps } from "@/types/articles.types";
import ArticleComponent from "./Article";

const NewsListComponent = () => {
    const [articlesFromSupa, setArticlesFromSupa] = useState<ArticleProps[]>([]);
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

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
    const { data, error } = await supabase
      .from('Articles')
      .select('*')
    if (error) {
      console.error('Error fetching articles from Supabase:', error.message);
      return;
    }
    console.log("data", data);
    setArticlesFromSupa(data as ArticleProps[]);
  };
  fetchArticlesFromSupabase();
}, []);


    return (
         <div className="md:grid md:grid-cols-3 md:w-full md:gap-4 md:mt-5 mt-2">
                {
                  articlesFromSupa.map((article: ArticleProps) => (
                  <div key={article.id} onMouseEnter={() => handleMouseEnter(Number(article.id))} onMouseLeave={handleMouseLeave}>
                    <ArticleComponent
                      title={article.title}
                      imageUrl={article.imageUrl}
                      link={`/news/${article.slug}`}
                      isActive={selectedCardId === Number(article.id)}
                    />
                    </div>
                  ))
                }
              </div>
    );
}

export default NewsListComponent;