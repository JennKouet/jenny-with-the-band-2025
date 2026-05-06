import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlesPageClient from "./ArticlesPageClient";
import { getArticleImageUrl } from "@/lib/articleImages";
import { getPublishedArticleBySlug, getPublishedArticles } from "@/lib/articles.server";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

type ArticlesPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const articles = await getPublishedArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article introuvable",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = article.description || siteConfig.description;
  const imageUrl = getArticleImageUrl(article.imageUrl);
  const title = article.title;
  const path = `/news/${article.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      publishedTime: article.created_at,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ArticlesPage({ params }: ArticlesPageProps) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticlesPageClient initialArticle={article} />;
}
