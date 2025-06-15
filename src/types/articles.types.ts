export interface ArticleProps {
    id: string;
    title: string;
    description?: string;
    imageUrl: string;
    slug: string;
    published: boolean;
    createdAt?: string;
}