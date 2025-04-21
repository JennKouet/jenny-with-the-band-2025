'use client';
import { ArticleProps } from "@/app/components/news/Article";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ArticlesPage = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState<ArticleProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<globalThis.Error | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`/api/articles/${slug}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setArticle(data);
            } catch (error: unknown) {
                if (error instanceof Error) {  console.error('Error fetching article:', error.message);
                    setError(error);
                } else {
                    console.error('Unexpected error:', error);
                }
           
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [slug]);
    return (
        <main className="pt-20 bg-black">
            <section>
                <h1 className="text-white text-5xl font-bold">News</h1>
                <div className="flex flex-col items-center justify-center">
                    {loading && <p className="text-white text-xl">Loading...</p>}
                    {error && <p className="text-red-500 text-xl">Error: {error.message}</p>}
                    {article && (
                        <>
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                        </>
                    )}
                    <p className="text-white text-xl">Coming soon...</p>
                </div>
            </section>
          
        </main>
    )
};

export default ArticlesPage;