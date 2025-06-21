import React from 'react';
import TourDates from '../components/_shared/shows/TourDates';


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