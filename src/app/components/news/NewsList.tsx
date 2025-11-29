'use client';
import { useEffect, useMemo, useState } from "react";
import supabase from "@/lib/supabaseClient";
import type { ArticleProps } from "@/types/articles.types";
import ArticleComponent from "./Article";

const NewsListComponent = () => {
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

const sortedArticles = useMemo(() =>{ return [...articlesFromSupa].sort((a, b) => {
  return new Date(b.created_at ?? '').getTime() - new Date(a.created_at ?? '').getTime();
});
}, [articlesFromSupa]);


    return (
         <div className="md:grid md:grid-cols-3 md:w-full md:gap-4 md:mt-5 mt-2">
                {!isLoading ?
                  sortedArticles.map((article: ArticleProps) => (
                  <div key={article.id} onMouseEnter={() => handleMouseEnter(Number(article.id))} onMouseLeave={handleMouseLeave}>
                    <ArticleComponent
                      title={article.title}
                      imageUrl={article.imageUrl}
                      link={`/news/${article.slug}`}
                      isActive={selectedCardId === Number(article.id)}
                    />
                    </div>
                  ))
                  :
                  <p className="text-white">Loading...</p>
                }
              </div>
    );
}

export default NewsListComponent;