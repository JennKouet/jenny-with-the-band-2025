import React from 'react';
import type { Metadata } from "next";
import TourDates from '../components/_shared/shows/TourDates';
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Concerts",
  description:
    "Retrouvez les prochaines dates de concert de Jenny With the Band et les informations de tournée.",
  path: "/shows",
});

const ShowsPage = () => {

  return (
      <section className='md:mt-20 px-5 bg-red-background bg-left md:bg-repeat bg-fixed relative'>
        <article className="flex flex-col items-center pt-20">
              <TourDates />
        </article>
    </section>
  )
}

export default ShowsPage;
