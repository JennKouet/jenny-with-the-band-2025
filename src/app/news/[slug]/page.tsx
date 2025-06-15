'use client';
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import type { ArticleProps } from "@/types/articles.types";
import NewsListComponent from "@/app/components/news/NewsList";
import CustomButton from "@/app/components/_shared/ui/CustomButton";

const ArticlesPage = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState<ArticleProps | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

   // fetch articles from supabase
useEffect(() => {
  const fetchArticlesFromSupabase = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('Articles')
      .select('*')
      .eq('slug', slug)
    if (error) {
      console.error('Error fetching articles from Supabase:', error.message);
      return;
    }
    console.log("data", data);
    setArticle(data && data.length > 0 ? (data[0] as ArticleProps) : null);
    setLoading(false);
  };
  fetchArticlesFromSupabase();
}, [slug]);


    return (
        <main className="pt-20 bg-black flex flex-col items-center">
            <section className="w-full px-4 lg:w-2/3">
                <h1 className="text-white text-5xl font-bold">News</h1>
                <div className="flex flex-col items-center justify-center">
                    {loading && <p className="text-white text-xl">Loading...</p>}
                    {article && (
                        <div className="border border-red-600 text-white p-6 rounded-lg shadow-lg mt-6 w-full">
                            <div className="px-8 w-full flex justify-center">
                            <Image
                                src={`/images/uploads/${article.imageUrl}`}
                                alt={article.title}
                                width={340}
                                height={140}
                                className="object-contain w-full h-[140px] md:h-[200px] lg:h-[300px]"
                                priority
                            />
                            </div>
                            <h2 className="mt-8 text-center">{article.title}</h2>
                            <p className="leading-7 mt-8">{article.description}</p>
                        </div>
                    )}
                </div>
            </section>
          <section className="mt-20 w-full md:w-2/3 px-4">
            <h2 className="text-[#ebe9db] font-roboto">Others News</h2>
              <hr className="border border-red-600"/>
            <NewsListComponent />
          </section>

          <div className="w-full flex flex-row md:ml-10 mt-6">
            <CustomButton
                text="Back to Homepage"
                className="bg-red-600 md:mx-2 my-1 w-[260px]"
                onClick={() => router.push('/')}
            />
          </div>
        </main>
    )
};

export default ArticlesPage;