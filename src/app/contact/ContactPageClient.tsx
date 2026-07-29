"use client";

import React, { useState, useEffect } from 'react';
import EditableImage from '../components/_shared/EditableImage';
import EditablePressKitLink from '../components/_shared/EditablePressKitLink';
import CustomButton from '../components/_shared/ui/CustomButton';
import supabase from '@/lib/supabaseClient';

const card =
  'rounded-lg border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm md:p-8';
const contactList = 'font-[roboto] mt-4 space-y-2 text-base';
const contactLink = 'text-red-500 underline underline-offset-2 transition-colors hover:text-red-400';
const fieldLabel = 'text-white/50';

const ContactPageClient = () => {
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
        <section className="relative z-0 w-full bg-center bg-no-repeat bg-fixed px-5 pt-24 pb-20 text-white">
            <div className="mx-auto w-full max-w-4xl">
                <h1 className="text-center">Contact</h1>
                <hr className="mx-auto mt-6 w-24 border-2 border-red-600" />

                <div className={`${card} mt-10`}>
                    <p className="font-[roboto] text-lg font-bold">
                        Pour toutes questions n&apos;hésitez pas à nous contacter à l&apos;adresse suivante :
                    </p>
                    <ul className={contactList}>
                        <li>
                            <span className={fieldLabel}>Email :</span>{' '}
                            <a href="mailto:contact@jennywiththeband.com" className={contactLink}>
                                contact@jennywiththeband.com
                            </a>
                        </li>
                        <li>
                            <span className={fieldLabel}>Téléphone :</span>{' '}
                            <a href="tel:+33637221035" className={contactLink}>
                                +33 6 37 22 10 35
                            </a>
                        </li>
                    </ul>
                </div>

                <EditableImage
                    imagePath="contact/contact-photo-2.webp"
                    bucket="images"
                    alt="jenny with the band au Stéréolux nantes"
                    imgClassName="w-full h-auto rounded-lg shadow-lg shadow-black/50"
                    width={650}
                    height={650}
                    className="mt-12"
                />

                <div className={`${card} mt-12`}>
                    <h2 className="text-center">Booking</h2>
                    <p className="font-[roboto] mt-6 text-lg font-bold">
                        Pour toutes demandes de programmation du groupe, veuillez contacter{' '}
                        <span className="font-horbse">Nick</span> :
                    </p>
                    <ul className={contactList}>
                        <li>
                            <span className={fieldLabel}>Email :</span>{' '}
                            <a href="mailto:contact@jennywiththeband.com" className={contactLink}>
                                contact@jennywiththeband.com
                            </a>
                        </li>
                        <li>
                            <span className={fieldLabel}>Téléphone :</span>{' '}
                            <a href="tel:+33678028805" className={contactLink}>
                                +33 6 78 02 88 05
                            </a>
                        </li>
                    </ul>
                </div>

                <EditableImage
                    imagePath="contact/contact-photo-1.webp"
                    bucket="images"
                    alt="photo de presse jenny with the band nantes"
                    imgClassName="w-full h-auto rounded-lg shadow-lg shadow-black/50"
                    width={650}
                    height={650}
                    className="mt-12"
                />

                <article className={`${card} mt-12 text-center`}>
                    <h3>Dossier de presse</h3>
                    <div className="mt-6">
                        {pressKitUrl ? (
                            <CustomButton
                                text="Télécharger le dossier de presse (PDF)"
                                href={pressKitUrl}
                                target="_blank"
                                className="inline-block hover:bg-red-600"
                            />
                        ) : (
                            <span className="font-[roboto] italic text-white/50">
                                Aucun dossier de presse disponible
                            </span>
                        )}
                    </div>
                    <EditablePressKitLink id={pressKitId} setPressKitUrl={setPressKitUrl} />
                </article>
            </div>
        </section>
     );
}

export default ContactPageClient;
