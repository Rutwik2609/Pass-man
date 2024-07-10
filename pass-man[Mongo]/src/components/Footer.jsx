import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col w-full fixed bottom-0 justify-center items-center h-12 text-white bg-black">
      <div className=" font-bold hover:font-extrabold  ">
        <span className="text-red-600 ">&lt;</span>
        <span className="text-white  ">Pass-man</span>
        <span className="text-red-600 ">/</span>
        <span className="text-red-600 ">&gt;</span>
      </div>
      <div className="text-xs" >Created with 💖 by Rutwik</div>
    </div>
  );
};

export default Footer;
