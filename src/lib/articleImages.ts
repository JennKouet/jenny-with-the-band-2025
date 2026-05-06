const ARTICLE_BUCKET_PATH = "/storage/v1/object/public/images/articles";

export function getArticleImageUrl(imageUrl?: string | null) {
  if (!imageUrl) {
    return "/images/uploads/miniature-youtube.webp";
  }

  if (imageUrl.startsWith("http") || imageUrl.startsWith("/")) {
    return imageUrl;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");

  if (!supabaseUrl) {
    return `/images/uploads/${imageUrl}`;
  }

  return `${supabaseUrl}${ARTICLE_BUCKET_PATH}/${imageUrl}`;
}
