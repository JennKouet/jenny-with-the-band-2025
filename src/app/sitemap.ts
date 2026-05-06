import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/articles.server";
import { getSiteUrl } from "@/lib/site";

const staticRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/shows", changeFrequency: "weekly", priority: 0.9 },
  { path: "/videos", changeFrequency: "monthly", priority: 0.8 },
  { path: "/lyrics", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const articles = await getPublishedArticles();

  return [
    ...staticRoutes.map((route) => ({
      url: getSiteUrl(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...articles.map((article) => ({
      url: getSiteUrl(`/news/${article.slug}`),
      lastModified: article.created_at ? new Date(article.created_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
