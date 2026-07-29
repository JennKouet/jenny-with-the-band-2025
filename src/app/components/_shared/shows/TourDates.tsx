'use client'
import React, {useEffect, useState} from 'react';
import axios from 'axios';

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
    url?: string;
    offers?: Array<{ url: string; type: string; status: string }>;
  }

interface TourDatesProps {
  showPast?: boolean;
}

const sortShowsByDateAsc = (shows: Show[], dateKey: 'starts_at' | 'datetime') => {
  return [...shows].sort((a, b) => {
    return new Date(a[dateKey]).getTime() - new Date(b[dateKey]).getTime();
  });
};

const TourDates = ({ showPast = true }: TourDatesProps) => {
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
      setShowsList(resp.data);
    }).catch((error) => console.error('error fetching bandsintown data', error))
  }
  
  const fetchPastShows = () => {
    return axios.get(`${process.env.NEXT_PUBLIC_BANDSINTOWN_URL}`,{
      params: {
        app_id: process.env.NEXT_PUBLIC_BANDSINTOWN_APP_ID,
        'date': 'past'
      }
    })
    .then((resp) => {
      setShowsPast(resp.data);
    });
  }


  useEffect(() => {
    fetchBandsInTownEvents()
    if (showPast) {
      fetchPastShows()
    }
  }, [showPast])



  return (
    <div className="z-40">
        <div className="z-40 text-white">
            <p className="text-red-600">{showPast ? 'Past / Upcoming' : 'Upcoming'}</p>
            <h2 className="text-[#ebe9db] font-roboto">Tour Dates</h2>
            <hr className="border border-red-600"/>
            <div className='md:px-20'>
              <ul className='w-full flex flex-col items-center'>
                {sortShowsByDateAsc(showsList, 'starts_at').map((show) => (
                  <React.Fragment key={show.id}>
                    {/* VERSION MOBILE */}
                    <li className='lg:hidden flex flex-col w-full text-white my-4 gap-4'>
                        <div className="">
                          {/* Date event */}
                          <div className='mr-4 col-span-1 col-start-1 text-left font-[roboto] text-red-600 font-extrabold'><p>{new Date(show.starts_at).toLocaleDateString('fr-FR')}</p></div>
                          {/* Event name */}
                          <div className='font-[roboto]'><p>{show.venue?.name}</p></div>
                          {/* Event city and zipcode */}
                          <div className='col-span-2 font-[roboto] font-bold'><p>{show.venue?.city} ({show.venue?.postal_code})</p></div>
                        </div>
                          {/* Buy button */}
                          {show.offers && show.offers.length > 0 && (
                            <a 
                              href={show.offers[0].url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className='mt-4'
                            >
                              <button className="bg-red-600 text-center text-white px-4 py-2 rounded font-[roboto] text-base whitespace-nowrap hover:bg-red-700">Billets</button>
                            </a>
                          )}
                    </li>

                    {/* VERSION DESKTOP */}
                    <li key={show.id} className='hidden lg:w-3/4 lg:grid lg:grid-cols-5 md:items-center lg:text-white lg:my-4 md:text-2xl lg:gap-4'>
                        <div className='mr-4 col-span-1 col-start-1 text-left font-[roboto] text-red-600 font-extrabold'><p>{new Date(show.starts_at).toLocaleDateString('fr-FR')}</p></div>
                        <div className='font-[roboto]'><p>{show.venue?.name}</p></div>
                        <div className='col-span-2 col-end-5 text-right font-[roboto] font-bold'><p>{show.venue?.city} ({show.venue?.postal_code})</p></div>
                        {show.offers && show.offers.length > 0 && (
                          <a 
                            href={show.offers[0].url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className='col-span-1 col-end-6'
                          >
                            <button className="bg-red-600 text-center text-white px-4 py-2 rounded font-[roboto] text-base whitespace-nowrap hover:bg-red-700">Billets</button>
                          </a>
                        )}
                    </li>
                  </React.Fragment>
                ))}
              </ul>
              {showPast && showsList.length > 0 && showsPast.length > 0 && (
                <hr aria-hidden="true" className="my-8 border-red-600" />
              )}
              {showPast && (
                <>
                  <h3 className="mt-12">Past shows</h3>
                  <ul className='w-full flex flex-col lg:items-center'>
                    {sortShowsByDateAsc(showsPast, 'datetime').map((show) => (
                      <React.Fragment key={show.id}>
                        {/* VERSION MOBILE */}
                        <li  className='w-full flex flex-col text-white my-4 md:hidden'>
                            <div className='mr-4 text-left font-[roboto] text-red-600 font-extrabold'><p>{new Date(show.datetime).toLocaleDateString('fr-FR')}</p></div>
                            <div className='font-[roboto]'><p>{show.venue?.name}</p></div>
                            <div className='font-[roboto] font-bold'><p>{show.venue?.city} ({show.venue?.postal_code})</p></div>
                        </li>
                        {/* VERSION DESKTOP */}
                        <li  className='hidden w-3/4 md:flex flex-row justify-between md:items-center text-white my-4 md:text-2xl'>
                            <div className='mr-4 w-1/4 text-left font-[roboto] text-red-600 font-extrabold'><p>{new Date(show.datetime).toLocaleDateString('fr-FR')}</p></div>
                            <div className='w-2/4 font-[roboto]'><p>{show.venue?.name}</p></div>
                            <div className='w-1/4 text-right font-[roboto] font-bold'><p>{show.venue?.city} ({show.venue?.postal_code})</p></div>
                        </li>
                      </React.Fragment>
                    ))}
                  </ul>
                </>
              )}
            </div>
        </div>
  </div>
  )
}
export default TourDates;
