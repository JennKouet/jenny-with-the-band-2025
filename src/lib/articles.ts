import { notion } from './notion';

type NotionArticleResult = {
    id: string;
    properties: {
        Title: { title: { plain_text: string }[] };
        Description: { rich_text: { plain_text: string }[] };
        ImageUrl: { rich_text: { plain_text: string }[] };
        Slug: { rich_text: { plain_text: string }[] };
        Published: { checkbox: boolean };
        PublishedDate: { date: { start: string } };
    };
};

export type Article = {
    id: string
    title: string
    description: string
    imageUrl: string
    slug: string

}

export const getArticles = async (): Promise<Article[]> => {
    const response = await notion.databases.query({
        database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID!,
        filter: {
            property: 'Published',
            checkbox: {
                equals: true,
            },
        },
    });

    console.log("response", response.results);
    const articles: Article[] = (response.results as unknown as NotionArticleResult[]).map((result) => {
        const properties = result.properties;

        return {
            id: result.id,
            title: properties.Title?.title[0]?.plain_text || '',
            description: properties.Description?.rich_text[0]?.plain_text || '',
            imageUrl: properties.ImageUrl?.rich_text[0].plain_text || '',
            slug: properties.Slug?.rich_text[0]?.plain_text || '',
            published: properties.Published?.checkbox || false,
            publishedDate: properties.PublishedDate?.date?.start || '',
        };
    });
    
    return articles;
}