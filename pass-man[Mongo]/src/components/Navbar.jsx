import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-20 h-12 bg-black text-white w-screen ">
      <div className=" font-bold hover:font-extrabold text-2xl ">
        <span className="text-red-600 ">&lt;</span>
        <span className="text-white  ">Pass-man</span>
        <span className="text-red-600 ">/</span>
        <span className="text-red-600 ">&gt;</span>
      </div>
      {/* <ul className='flex list-none gap-5 text-red-500' >
                <li className=' hover:font-bold ' >home</li>
                <li className=' hover:font-bold ' >about</li>
                <li className=' hover:font-bold ' >contact</li>
            </ul> */}
      <div className="w-12">
        <button className="w-[80%]  ">
          <img className="object-fit hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full" src="/github.svg" alt="github" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
