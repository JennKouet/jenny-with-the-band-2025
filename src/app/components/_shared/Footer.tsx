'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaSpotify, FaApple, FaYoutube } from 'react-icons/fa';
import supabase from '@/lib/supabaseClient';

const Footer = () => {
    const [loading, setLoading] = useState(true);
    const [latestSlug, setLatestSlug] = useState<string | null>(null); // Stocker le slug du dernier article
    const footerMenus = [
        { title: 'Home', link: '/' },
        { title: 'Shows', link: '/shows' },
        { title: "News", link: latestSlug ? `/news/${latestSlug}` : "#" },
        { title: 'Videos', link: '/videos' },
        { title: 'Paroles', link: '/lyrics' },
        { title: 'Shop', link: 'https://jenny-with-the-band.sumupstore.com/' },
        { title: 'Contact', link: '/contact' },
    ];

    useEffect(() => {
        const fetchLatestArticle = async () => {
            const { data, error } = await supabase
                .from('Articles')
                .select('slug')
                .order('created_at', { ascending: false })
                .limit(1);

            if (error) {
                console.error('Error fetching latest article:', error.message);
                setLoading(false); // Arrêter le chargement même en cas d'erreur
                return;
            }

            if (data && data.length > 0) {
                setLatestSlug(data[0].slug); // Stocker le slug du dernier article
            }
            setLoading(false); // Arrêter le chargement une fois les données récupérées
        };

        fetchLatestArticle();
    }, []);

    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const syncSession = async () => {
            const { data } = await supabase.auth.getSession();
            setAuthenticated(!!data.session);
        };
        syncSession();
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setAuthenticated(!!session);
        });
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const handleAdminLogin = async () => {
        try {
            const redirectTo =
                typeof window !== 'undefined'
                    ? `${window.location.origin}/auth/callback`
                    : undefined;
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo,
                },
            });
            if (error) {
                console.error('Erreur de connexion Google:', error.message);
            }
        } catch (authError) {
            console.error(authError);
        }
    };

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Erreur de déconnexion:', error.message);
            }
        } catch (logoutError) {
            console.error(logoutError);
        }
    };
    const socialIcons = [
        { icon: <FaFacebookF />, link: 'https://www.facebook.com/jennywiththeband' },
        { icon: <FaInstagram />, link: 'https://www.instagram.com/jennywiththeband/' },
        { icon: <FaSpotify />, link: 'https://open.spotify.com/intl-fr/album/1A4ZshLdOth4qcfJIKkswJ?si=IR-c9f5ES9q3DJHHZONGUA' },
        { icon: <FaApple />, link: 'https://music.apple.com/fr/album/try-to-kill-me/1702467736' },
        { icon: <FaYoutube />, link: 'https://www.youtube.com/@jennywiththeband' },
    ];


     if (loading) {
        return (
            <footer className="fixed top-0 w-full text-white z-50 bg-black transition-all duration-300 ease-in-out">
                <div className="flex justify-center items-center h-16">
                    <p className="text-white text-lg">Loading...</p>
                </div>
            </footer>
        );
    }


    return (
        <footer className='w-full flex flex-row gap-4 justify-between md:items-center pt-16 pb-10 px-8' style={{ backgroundImage: "url('/images/uploads/jwb-fond_noir.webp')" }}>
         
                <div className="flex flex-col justify-between">
                    <Image
                        src="/images/logo-jwb.png"
                        alt="Jenny with the Band logo"
                        width={200}
                        height={100}
                        className="object-contain w-full h-auto"
                    />
                    <small className="text-xs">©Copyright 2025 Jenny with the band. All Rights Reserved.</small>
                </div>
            
            <div className="">
                <ul className="md:grid md:grid-cols-7 gap-3 font-horbse">
                   {footerMenus.map((menu, index) => (
                        <li key={index} className="">
                            <Link href={menu.link} className="relative cursor-pointer after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-red-600 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                                {menu.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="">
                <ul className="">
                    <li>
                        <Link href="/terms-and-conditions" className="relative cursor-pointer after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-red-600 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                            Terms and Conditions
                        </Link>
                    </li>
                    <li>
                        <Link href="/privacy-policies" className="relative cursor-pointer after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-red-600 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                            Privacy Policies
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="">
                 <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:space-x-4 mb-2 text-sm">
                {socialIcons.map((item, idx) => (
                    <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
                    {item.icon}
                    </a>
                ))}
                </div>
                {!isAuthenticated ? (
                    <button
                        onClick={handleAdminLogin}
                        className="mt-2 text-xs text-white/70 underline hover:text-red-500"
                    >
                        Connexion admin
                    </button>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="mt-2 text-xs text-white/70 underline hover:text-red-500"
                    >
                        Déconnexion
                    </button>
                )}
            </div>
        </footer>
    );
}

export default Footer;
