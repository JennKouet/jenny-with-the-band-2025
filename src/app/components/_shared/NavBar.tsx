'use client'
import { slide as Menu } from 'react-burger-menu'
import { useEffect, useState } from 'react'
import { FaFacebookF, FaApple, FaInstagram, FaSpotify, FaYoutube } from 'react-icons/fa'
import Image from 'next/image'

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScroll, setIsScroll] = useState(false);

    useEffect(() => {
      const target = document.getElementById('top-trigger');
      if (!target) return;

      const observer = new IntersectionObserver(
          ([entry]) => {
              setIsScroll(!entry.isIntersecting); // si "top-trigger" n'est plus visible ➔ isScroll = true
          },
          { threshold: 0.1 } // dès que moins de 10% du div est visible
      );

      observer.observe(target);

      return () => {
          observer.disconnect();
      };
  }, []);

    const allMenus = [
        {name: "Home", link: "/"},
        {name: "Shows", link: "/shows"},
        {name: "News", link: "/news/new-single"},
        {name: "Videos", link: "/videos"},
        {name: "Paroles", link: "/lyrics"},
        {name: 'Shop', path: 'https://jenny-with-the-band.sumupstore.com/'},
        {name: "Contact", link: "/contact"},
    ]


      const socialIcons = [
        { icon: <FaFacebookF />, link: 'https://www.facebook.com/jennywiththeband' },
        { icon: <FaInstagram />, link: 'https://www.instagram.com/jennywiththeband/' },
        { icon: <FaSpotify />, link: 'https://open.spotify.com/intl-fr/album/1A4ZshLdOth4qcfJIKkswJ?si=IR-c9f5ES9q3DJHHZONGUA' },
        { icon: <FaApple />, link: 'https://music.apple.com/fr/album/try-to-kill-me/1702467736' },
        { icon: <FaYoutube />, link: 'https://www.youtube.com/@jennywiththeband' },
      ]

      useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 0) {
            setIsScroll(true);
          } else {
            setIsScroll(false);
          }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return (
        <header className={`fixed top-0 w-full text-white z-50 ${isScroll ? 'bg-black' : ''} transition-all duration-300 ease-in-out`}>
            <div className="flex flex-row justify-between items-center px-4 py-2">
            {/* Logo mobile */}
            <div className="w-full flex md:justify-start items-center md:hidden">
                <Image
                src="/images/uploads/logo-jwb-detour-new.webp"
                alt="Jenny with the Band logo"
                width={180}
                height={50}
                className="object-cover"
                />
            </div>

             {/* Logo Desktop */}
             <div className="w-full hidden md:flex md:justify-start items-center">
                <Image
                src="/images/uploads/logo-jwb-detour-new.webp"
                alt="Jenny with the Band logo"
                width={340}
                height={160}
                className="object-cover"
                />
            </div>
    
            {/* Desktop Nav */}
            <nav className="hidden md:flex flex-col items-end">
                <div className="flex space-x-4 mb-2 text-sm">
                {socialIcons.map((item, idx) => (
                    <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
                    {item.icon}
                    </a>
                ))}
                </div>
                <ul className="flex space-x-6 font-semibold text-lg font-['Horbse-Textured'] text-white">
                {allMenus.map((menu, idx) => (
                    <li key={idx}>
                    <a href={menu.link} className="relative cursor-pointer after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-red-600 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                        {menu.name}
                    </a>
                    </li>
                ))}
                </ul>
            </nav>
    
            {/* Mobile Nav */}
            <div className="block md:hidden bg-red-900">
                <Menu right isOpen={menuOpen} onStateChange={({ isOpen }) => setMenuOpen(isOpen)} 
                styles={{
                    bmMenu: {
                    background: 'rgba(0, 0, 0, 0.95)',
                    },
                    bmOverlay: {
                    background: 'rgba(0, 0, 0, 0.8)',
                    },
                }}>
                <div className="mb-4 flex justify-center items-center gap-4" style={{ display: 'flex', flexDirection: 'row' }}>
                    {socialIcons.map((item, idx) => (
                    <a
                        key={idx}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mr-3 text-xl text-white text-center hover:text-red-600"
                    >
                        {item.icon}
                    </a>
                    ))}
                </div>
                {allMenus.map((menu, idx) => (
                    <a key={idx} href={menu.link} className="menu-item text-white text-lg hover:text-red-600 cursor-pointer">
                    {menu.name}
                    </a>
                ))}
                </Menu>
            </div>
            </div>
      </header>
    )
}

export default NavBar;