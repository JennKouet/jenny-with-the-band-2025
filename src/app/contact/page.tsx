'use client'
import React, { useState, useEffect } from 'react';
import EditableImage from '../components/_shared/EditableImage';
import EditablePressKitLink from '../components/_shared/EditablePressKitLink';
import supabase from '@/lib/supabaseClient';

const ContactPage = () => {
    const [pressKitUrl, setPressKitUrl] = useState<string | null>(null);
    const pressKitId = 1; // à adapter si besoin

    useEffect(() => {
        const fetchPressKitUrl = async () => {
            const { data, error } = await supabase
                .from('Links')
                .select('linkUrl')
                .eq('id', pressKitId)
                .maybeSingle();
            if (!error && data?.linkUrl) {
                setPressKitUrl(data.linkUrl);
            } else {
                setPressKitUrl(null);
            }
        };
        fetchPressKitUrl();
    }, []);

    return ( 
        <section className="px-5 mt-20 bg-center bg-no-repeat bg-fixed relative z-0 w-full text-white">
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
            <div className='flex flex-row justify-center mt-4'>
            <EditableImage
                imagePath="contact/contact-photo-2.webp"
                bucket="images"
                alt="jenny with the band au Stéréolux nantes"
                imgClassName=""
                width={650}
                height={650}
                className="p-2"
            />
        </div>
            {/* <p>Et aussi disponible sur les réseaux sociaux :</p> */}
            {/* <div className="flex flex-row justify-around gap-4 md:w-1/3 p-2 md:mb-8">
                <a href="https://www.instagram.com/jennywiththeband/" target="_blank" rel="noreferrer">
                    <Image src="/images/uploads/insta-logo.webp" alt="Instagram de Jenny With The Band" width={50} height={50} className="" />
                </a>
                <a href="https://www.facebook.com/Jenny-With-The-Band-107515220995356/" target="_blank" rel="noreferrer">
                    <Image src="/images/uploads/fb-blanc.webp" alt="Facebook de Jenny With The Band" width={50} height={50} className="" />
                </a>
                <a href="https://www.youtube.com/channel/UCVTZPrPhVBYa1eQqGUqq52A" target="_blank" rel="noreferrer">
                    <Image src="/images/uploads/yt-logo.webp" alt="YouTube de Jenny With The Band" width={50} height={50} className="" />
                </a>
            </div> */}
            <div className='flex flex-col items-center justify-center pt-11 text-xl'>
                <h1 className='pb-4'>Booking</h1>
                <p>Pour toutes demandes de programmation du groupe, veuillez contacter Nick :</p>
                <ul>
                <li>Email : <a href="mailto:vincent@muzivox.com">contact@jennywiththeband.com</a></li>
                    <li>Téléphone : +33 6 78 02 88 05</li>
                </ul>
            </div>
        </div>
        <div className='flex flex-row justify-center mt-4'>
            <EditableImage
                imagePath="contact/contact-photo-1.webp"
                bucket="images"
                alt="photo de presse jenny with the band nantes"
                imgClassName=""
                width={650}
                height={650}
                className="p-2"
            />
        </div>
        <article className="flex flex-row justify-center mt-4">
            <div className="">
                <h3>Dossier de presse</h3>
                {pressKitUrl ? (
                  <a href={pressKitUrl} target="_blank" className="underline">
                    Télécharger le dossier de presse (PDF)
                  </a>
                ) : (
                  <span className="italic text-gray-400">Aucun dossier de presse disponible</span>
                )}
                <EditablePressKitLink id={pressKitId} setPressKitUrl={setPressKitUrl} />
            </div>
        </article>
        </section>
     );
}
 
export default ContactPage;
