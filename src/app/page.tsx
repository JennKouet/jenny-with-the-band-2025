'use client';
import { FaChevronDown } from "react-icons/fa";
import dynamic from 'next/dynamic'
import MailingList from "./components/_shared/MailingList";
import CustomButton from "./components/_shared/ui/CustomButton";
// Dynamically import the ReactPlayer component
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Home() {
  return (
      <main id="home" className="flex flex-col w-full items-center h-screen relative" style={{ backgroundImage: "url('/images/uploads/jwb-fond_noir.webp')" }}>
        <section className="w-full flex flex-col px-10 md:flex-row md:justify-start md:ml-52 min-h-screen md:mt-5 relative">
          {/* BACKGROUND IMAGE */}
          <div
            className="md:w-1/2 w-full h-full bg-cover bg-no-repeat bg-top hidden md:block"
            style={{ backgroundImage: "url('/images/uploads/illu-album.webp')" }}
          />
          {/* BACKGROUND FILTER */}
          {/* <div className="w-full absolute top-0 left-0 h-screen bg-black/30 bg-cover bg-right z-30 md:bg-black/40"></div> */}
      
          <div className="flex-1 flex items-center justify-center z-40 text-white w-full mb-6">
            <div className="flex flex-col items-center md:items-start">
                <h2 className="text-[#ebe9db]">New Album</h2>
                <h3 className="text-red-600">On vinyl splatter</h3>
                  <div className="flex flex-row justify-center my-5 w-full md:hidden">
                    <ReactPlayer
                      url="https://jwb-medias.s3.eu-west-3.amazonaws.com/pubvinyle_2+(1).mov"
                      playing
                      muted
                      width="100%"
                      height="100%"
                      className=""
                    />
                  </div>
                  <div className="md:flex md:flex-row md:justify-center md:mb-5 md:p-10 md:w-full hidden">
                    <ReactPlayer
                      url="https://jwb-medias.s3.eu-west-3.amazonaws.com/pubvinyle_2+(1).mov"
                      playing
                      muted
                      width="70%"
                      height="70%"
                      className=""
                    />
                  </div>
                  <div className="flex flex-col items-center md:w-full md:mt-2">
                    <a href="https://li.sten.to/jennywiththeband" target="_blank">
                      <CustomButton 
                        text="Listen on Streaming"
                        className="hover:bg-red-600 md:mx-2 my-1 w-[300px]"
                      />
                    </a>
                    <a href="https://jenny-with-the-band.sumupstore.com/" target="_blank">
                      <CustomButton 
                        text="Buy Now"
                        className="hover:bg-red-600 md:mx-2 my-1 w-[300px]"
                      />
                    </a>
                  </div>
              </div>
            </div>
        
          <div className="z-40 flex flex-col self-start md:left-1/2 md:transform md:items-center text-white font-body">
            <p>scroll to continue</p>
            <FaChevronDown className="text-white" />
          </div>
        </section>
        <section className="w-full">
          <MailingList />
        </section>
        <section className="bg-cover" style={{ backgroundImage: "url('/images/uploads/ban-eyes.webp')" }}>
          {/* LATEST NEWS */}
          <div className="">
            <div className="z-40 text-white">
              <p className="text-red-600">Latest</p>
              <h2 className="text-[#ebe9db] font-roboto">News</h2>
              {/* Add your form or input fields here */}
            </div>
          </div>
        </section>
      </main>
  );
}
