'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaSpotify, FaApple, FaYoutube } from 'react-icons/fa';
import supabase from '@/lib/supabaseClient';

const Footer = () => {
    const footerMenus = [
        { title: 'Home', link: '/' },
        { title: 'Shows', link: '/shows' },
        { title: 'News', link: '/news/new-single' },
        { title: 'Videos', link: '/videos' },
        { title: 'Paroles', link: '/lyrics' },
        { title: 'Shop', link: 'https://jenny-with-the-band.sumupstore.com/' },
        { title: 'Contact', link: '/contact' },
    ];

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
                <ul className="md:grid md:grid-cols-7 gap-4">
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
