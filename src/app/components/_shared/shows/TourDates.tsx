'use client'
import React, {useEffect, useState} from 'react';
import axios from 'axios';
//import {format, subYears} from 'date-fns';

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



const TourDates = () => {
  const [showsList, setShowsList] = useState<Show[]>([]);
  const [showsPast, setShowsPast] = useState<Show[]>([]);

  // const date = new Date();
  // const year = format(date, 'yyyy');
  // const previousYear = format(subYears(date, 1), 'yyyy');

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
    <div className="z-40">
        <div className="z-40 text-white">
            <p className="text-red-600">Past / Upcoming</p>
            <h2 className="text-[#ebe9db] font-roboto">Tour Dates</h2>
            <hr className="border border-red-600"/>
            <div className='md:px-20'>
            <ul className='w-full'>
                    {showsList.slice().reverse().map((show) => (
                        <li key={show.id} className='flex flex-row justify-between md:items-center text-white my-4 md:text-2xl'>
                            <div className='mr-4 w-1/4 text-left font-[roboto] text-red-600 font-extrabold'><p>{new Date(show.starts_at).toLocaleDateString('fr-FR')}</p></div>
                            <div className='w-1/4 font-[roboto]'><p>{show.venue?.name}</p></div>
                            <div className='w-2/4 text-right font-[roboto] font-bold'><p>{show.venue?.city} ({show.venue?.postal_code})</p></div>
                        </li>
                    ))}
                    {showsPast.slice().reverse().map((show) => (
                        <li key={show.id} className='flex flex-row justify-between md:items-center text-white my-4 md:text-2xl'>
                            <div className='mr-4 w-1/4 text-left font-[roboto] text-red-600 font-extrabold'><p>{new Date(show.datetime).toLocaleDateString('fr-FR')}</p></div>
                            <div className='w-1/4 font-[roboto]'><p>{show.venue?.name}</p></div>
                            <div className='w-2/4 text-right font-[roboto] font-bold'><p>{show.venue?.city} ({show.venue?.postal_code})</p></div>
                        </li>
                    ))}
                  </ul>
            </div>
        </div>
  </div>
  )
}
export default TourDates;