'use client';
import React from "react";
import CustomButton from "./ui/CustomButton";

const MailingList = () => {


    const handeSubscribe = () => {
        // Handle subscription logic here
        alert("Subscribed!");
    };

  return (
    <section className="flex flex-col items-center justify-center w-full py-10 relative">
      <hr className="border border-red-600 w-full"/>
      <div className="flex flex-col items-center z-40 text-white text-center mt-4">
        <h2 className="text-[#ebe9db] font-roboto">Mailing list</h2>
        <p className="text-red-600 mb-6">Stay updated with Jenny with the band</p>
        {/* Add your form or input fields here */}
        <CustomButton
            text="Subscribe"
            onClick={handeSubscribe}
            className="hover:bg-red-600"
        />
      </div>
    </section>
  );
};
export default MailingList;