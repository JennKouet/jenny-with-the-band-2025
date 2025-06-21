'use client'
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {format, subYears} from 'date-fns';

interface Venue {
    name: string;
    city: string;
    postal_code: string;
  }

interface Show {
    id: string;
    starts_at: string;
    venue: Venue;
    datetime: string;
  }

const ShowsPage = () => {
  const [showsList, setShowsList] = useState<Show[]>([]);
  const [showsPast, setShowsPast] = useState<Show[]>([]);

  const date = new Date();
  const year = format(date, 'yyyy');
  const previousYear = format(subYears(date, 1), 'yyyy');

  const fetchBandsInTownEvents = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_BANDSINTOWN_URL}`,{
    params: {
      app_id: process.env.NEXT_PUBLIC_BANDSINTOWN_APP_ID,
      'date': 'upcoming'
    }
  }).then((resp) => {
      console.log('all events', resp.data)
      setShowsList(resp.data);
    }).catch((error) => console.log('error fetching bandsintown data', error))
  }
  
  const fetchPastShows = () => {
    return axios.get(`${process.env.NEXT_PUBLIC_BANDSINTOWN_URL}`,{
      params: {
        app_id: process.env.NEXT_PUBLIC_BANDSINTOWN_APP_ID,
        'date': 'past'
      }
    })
    .then((resp) => {
      console.log('pasts dates', resp.data)
      setShowsPast(resp.data);
    });
  }


  useEffect(() => {
    fetchBandsInTownEvents()
    fetchPastShows()
  }, [])
  

  return (
      <section className='mt-20 bg-red-background bg-left md:bg-repeat bg-fixed relative md:h-screen'>
        <article className="flex flex-col items-center">
            <h1 className='text-white font-extrabold pt-12 px-4 pb-6 md:mb-0'>Tour {previousYear + "/" + year}</h1>
              <div className='w-full md:w-2/4 p-10 md:pt-4 flex flex-row items-center justify-between'>
                  <ul className='w-full'>
                    {[...showsList]
                      .sort((a, b) => new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime())
                      .map((show) => (
                        <li key={show.id} className='flex flex-row justify-between items-center text-white my-4 md:text-2xl'>
                            <div className='mr-4 w-1/3 text-left font-display'><p>{new Date(show.starts_at).toLocaleDateString('fr-FR')}</p></div>
                            <div className='w-1/3'><p>{show.venue?.name}</p></div>
                            <div className='w-1/3 text-right text-blue-duck font-bold'><p>{show.venue?.city} ({show.venue?.postal_code})</p></div>
                        </li>
                    ))}
                    {showsPast.slice().reverse().map((show) => (
                        <li key={show.id} className='flex flex-row justify-between items-center text-white my-4 md:text-2xl'>
                            <div className='mr-4 w-1/3 text-left font-display'><p>{new Date(show.datetime).toLocaleDateString('fr-FR')}</p></div>
                            <div className='w-1/3'><p>{show.venue?.name}</p></div>
                            <div className='w-1/3 text-right text-blue-duck font-bold'><p>{show.venue?.city} ({show.venue?.postal_code})</p></div>
                        </li>
                    ))}
                  </ul>
              </div>
        </article>
        
    </section>
  )
}

export default ShowsPage;