import { getArticles } from "@/lib/articles";
import { NextResponse } from "next/server";

export async function GET() {
  const articles = await getArticles();
  //console.log("data", articles);
  return NextResponse.json(articles);
}