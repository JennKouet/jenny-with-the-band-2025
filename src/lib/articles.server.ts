import type { ArticleProps } from "@/types/articles.types";

const ARTICLE_SELECT = "id,title,description,imageUrl,slug,published,created_at";

function createSupabaseRestRequest() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return {
    endpoint: new URL("/rest/v1/Articles", supabaseUrl),
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
  };
}

export async function getPublishedArticles(): Promise<ArticleProps[]> {
  const request = createSupabaseRestRequest();

  if (!request) {
    return [];
  }

  request.endpoint.searchParams.set("select", ARTICLE_SELECT);
  request.endpoint.searchParams.set("published", "eq.true");
  request.endpoint.searchParams.set("order", "created_at.desc");

  const response = await fetch(request.endpoint, {
    headers: request.headers,
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    console.error("Error fetching published articles from Supabase:", response.statusText);
    return [];
  }

  return (await response.json()) as ArticleProps[];
}

export async function getPublishedArticleBySlug(slug: string): Promise<ArticleProps | null> {
  const request = createSupabaseRestRequest();

  if (!request) {
    return null;
  }

  request.endpoint.searchParams.set("select", ARTICLE_SELECT);
  request.endpoint.searchParams.set("slug", `eq.${slug}`);
  request.endpoint.searchParams.set("published", "eq.true");
  request.endpoint.searchParams.set("limit", "1");

  const response = await fetch(request.endpoint, {
    headers: request.headers,
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    console.error("Error fetching published article from Supabase:", response.statusText);
    return null;
  }

  const articles = (await response.json()) as ArticleProps[];

  return articles[0] ?? null;
}
