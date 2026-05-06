"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import EditableIframe from "./components/_shared/EditableIframe";
import CustomButton from "./components/_shared/ui/CustomButton";
import TourDates from "./components/_shared/shows/TourDates";
import NewsListComponent from "./components/news/NewsList";
import ProductCardComponent from "./components/_shared/ProductCard";
import InstagramWidgetComponent from "./components/_shared/InstagramWidget";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function HomePageClient() {
  return (
    <main
      id="home"
      className="flex flex-col w-full items-center relative"
      style={{ backgroundImage: "url('/images/uploads/jwb-fond_noir.webp')" }}
    >
      <section className="relative w-full h-screen overflow-hidden">
        <ReactPlayer
          url="/images/main-video.mov"
          playing
          loop
          muted
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
          className="object-cover z-0 absolute top-0 left-0"
        />

        <div className="relative flex items-center mt-12 md:pl-20 md:mt-32 z-40 text-white w-full h-full">
          <div className="flex flex-col items-center justify-between w-full md:w-1/2">
            <h1 className="sr-only">Jenny With the Band - groupe rock blues de Nantes</h1>
            <h2 className="text-[#ebe9db] text-3xl">New video</h2>
            <h3 className="text-red-600">Online</h3>
            <EditableIframe
              tableName="HomeVideos"
              videoId="2"
              height={230}
              className="flex flex-row my-5 w-full p-2 md:hidden"
            />
            <EditableIframe
              tableName="HomeVideos"
              videoId="2"
              height={350}
              className="md:flex md:flex-row md:mb-5 md:py-10 md:w-full hidden"
            />
            <div className="flex flex-col md:items-center md:w-full md:mt-2">
              <CustomButton
                text="Listen on Streaming"
                href="https://li.sten.to/jennywiththeband"
                target="_blank"
                className="hover:bg-red-600 md:mx-2 my-1 w-[300px]"
              />
              <CustomButton
                text="Buy Now"
                href="https://jenny-with-the-band.sumupstore.com/"
                target="_blank"
                className="hover:bg-red-600 md:mx-2 my-1 w-[300px]"
              />
            </div>
            <div className="z-40 flex flex-col mt-10 items-center md:mt-20 md:bottom-20 md:pb-20 text-white font-body">
              <p>scroll to continue</p>
              <FaChevronDown className="text-white" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-cover bg-center px-5 md:py-32">
        <div className="z-40 md:w-2/3 mx-auto">
          <div className="z-40 text-white">
            <p className="text-red-600">Latest</p>
            <h2 className="text-[#ebe9db] font-roboto">News</h2>
            <hr className="border border-red-600" />
            <NewsListComponent />
          </div>
        </div>
      </section>

      <section className="md:w-2/3 my-20 px-8 md:px-4 py-10">
        <TourDates showPast={false} />
        <div className="flex flex-col items-center">
          <CustomButton
            text="Click here to see all tour dates"
            href="/shows"
            className="hover:bg-red-600 md:mx-2 my-1 w-[300px]"
          />
        </div>
      </section>

      <section className="relative bg-center px-5 py-32 md:pt-20 md:w-2/3">
        <a
          href="https://jenny-with-the-band.sumupstore.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-red-600">Official</p>
          <h2 className="text-[#ebe9db] font-roboto">Merch Store</h2>
        </a>
        <hr className="border border-red-600" />
        <ProductCardComponent />
        <div className="w-full flex flex-row justify-center mt-16">
          <CustomButton
            text="See more products"
            href="https://jenny-with-the-band.sumupstore.com/"
            target="_blank"
            className="hover:bg-red-600 md:mx-2 my-1 w-[300px]"
          />
        </div>
      </section>

      <section className="flex flex-col items-center w-full md:mt-20 pt-10">
        <h3 className="text-lg mb-4 font-horbse">
          Instagram{" "}
          <Link href="https://www.instagram.com/jennywiththeband/" className="text-red-600 font-bold">
            @Jennywiththeband
          </Link>
        </h3>
        <InstagramWidgetComponent />
      </section>
    </main>
  );
}
