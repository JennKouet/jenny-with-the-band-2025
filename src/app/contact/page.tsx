'use client'
import React from 'react';
import Image from "next/image";

const ContactPage = () => {
    return ( 
        <section className="mt-20 bg-center bg-no-repeat bg-fixed relative h-screen z-0 w-full text-white">
        <div className='flex flex-row justify-center mt-4'>
       {/*  <Image 
            src="/images/uploads/bann-grey.webp"
            alt="photo de presse jenny with the band nantes"
            style={{
              objectFit: "contain"
            }}
            className="p-2"
            height="850"
            width="850"
          /> */}
        </div>
        <div className="flex flex-col items-center justify-center pt-11 text-xl">
            <h1 className='pb-4'>Contact</h1>
            <p>Pour toutes questions n&apos;hésitez pas à nous contacter à l&apos;adresse suivante :</p>
            <ul className='mb-10'>
                <li>Email : <a href="mailto:contact@jennywiththeband.com">contact@jennywiththeband.com</a></li>
                <li>Téléphone : +33 6 37 22 10 35</li>
            </ul>
            {/* <p>Et aussi disponible sur les réseaux sociaux :</p> */}
            <div className="flex flex-row justify-around md:w-1/3 p-2 md:mb-8">
                <a href="https://www.instagram.com/jennywiththeband/" target="_blank" rel="noreferrer">
                    <Image src="/images/uploads/insta-logo.webp" alt="Instagram de Jenny With The Band" width={50} height={50} className="" />
                </a>
                <a href="https://www.facebook.com/Jenny-With-The-Band-107515220995356/" target="_blank" rel="noreferrer">
                    <Image src="/images/uploads/fb-blanc.webp" alt="Facebook de Jenny With The Band" width={50} height={50} className="" />
                </a>
                <a href="https://www.youtube.com/channel/UCVTZPrPhVBYa1eQqGUqq52A" target="_blank" rel="noreferrer">
                    <Image src="/images/uploads/yt-logo.webp" alt="YouTube de Jenny With The Band" width={50} height={50} className="" />
                </a>
            </div>
            <div className='flex flex-col items-center justify-center pt-11 text-xl'>
                <h1 className='pb-4'>Booking</h1>
                <p>Pour toutes demandes de programmation du groupe, veuillez contacter Vincent :</p>
                <ul>
                <li>Email : <a href="mailto:vincent@muzivox.com">vincent@muzivox.com</a></li>
                    <li>Téléphone : +33 6 37 22 10 35</li>
                </ul>
            </div>
        </div>
        <div className='flex flex-row justify-center mt-4'>
        <a href="https://muzivox.com/roster/jenny-with-the-band/">
        <Image 
            src="/images/uploads/cropped-muzivox-logo-01.webp"
            alt="photo de presse jenny with the band nantes"
            style={{
              objectFit: "contain"
            }}
            className="p-2"
            height="650"
            width="650"
          />
          </a>
        </div>
        <div className='flex flex-row justify-center items-center mt-4'>
            <h3>Dossier de presse: <a href="https://jwb-medias.s3.eu-west-3.amazonaws.com/dossier_presse_JWB.pdf" target="_blank">Cliquez Ici</a></h3>
           
        </div>
        </section>
     );
}
 
export default ContactPage;