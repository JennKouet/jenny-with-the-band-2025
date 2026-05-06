"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import type { ArticleProps } from "@/types/articles.types";
import NewsListComponent from "@/app/components/news/NewsList";
import CustomButton from "@/app/components/_shared/ui/CustomButton";
import { getArticleImageUrl } from "@/lib/articleImages";

type ArticlesPageClientProps = {
  initialArticle: ArticleProps;
};

const ArticlesPageClient = ({ initialArticle }: ArticlesPageClientProps) => {
  const [article, setArticle] = useState<ArticleProps | null>(initialArticle);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setArticle(initialArticle);
    setLoading(false);
  }, [initialArticle]);

  useEffect(() => {
    const fetchArticlesFromSupabase = async () => {
      if (!initialArticle.slug) {
        return;
      }

      const { data, error } = await supabase
        .from("Articles")
        .select("*")
        .eq("slug", initialArticle.slug)
        .eq("published", true)
        .maybeSingle();

      if (error) {
        console.error("Error fetching article from Supabase:", error.message);
        return;
      }

      if (data) {
        setArticle(data as ArticleProps);
      }
    };

    fetchArticlesFromSupabase();
  }, [initialArticle.slug]);

  return (
    <main className="pt-20 bg-black flex flex-col items-center">
      <section className="w-full px-4 lg:w-2/3">
        <p className="text-red-600 text-2xl font-bold">News</p>
        <div className="flex flex-col items-center justify-center">
          {loading && <p className="text-white text-xl">Loading...</p>}
          {article && (
            <article className="border border-red-600 text-white p-6 rounded-lg shadow-lg mt-6 w-full">
              <div className="px-8 w-full flex justify-center">
                <Image
                  src={getArticleImageUrl(article.imageUrl)}
                  alt={article.title}
                  width={340}
                  height={140}
                  className="object-contain w-full h-[140px] md:h-[200px] lg:h-[300px]"
                  priority
                />
              </div>
              <h1 className="mt-8 text-center">{article.title}</h1>
              {article.description && <p className="leading-7 mt-8">{article.description}</p>}
            </article>
          )}
        </div>
      </section>
      <section className="mt-20 w-full md:w-2/3 px-4">
        <h2 className="text-[#ebe9db] font-roboto">Other News</h2>
        <hr className="border border-red-600" />
        <NewsListComponent />
      </section>

      <div className="w-full flex flex-row md:ml-10 mt-6">
        <CustomButton
          text="Back to Homepage"
          href="/"
          className="bg-red-600 md:mx-2 my-1 w-[260px]"
        />
      </div>
    </main>
  );
};

export default ArticlesPageClient;
