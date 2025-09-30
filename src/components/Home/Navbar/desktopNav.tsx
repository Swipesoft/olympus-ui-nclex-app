"use client"; 
import ThemeToggle from "@/components/Helper/themeToggle";
import { navLinks } from "@/constant/constants"; 
import Link from "next/link";
import { useEffect, useState } from "react"; 
import { HiBars3BottomRight  } from "react-icons/hi2";


type Props = {
    openNav: () => void;
}

const DesktopNav = ({openNav}: Props) => { 

const [navBg, setNavBg] = useState<boolean>(false); 

useEffect(() => {
    const handler = () => {
        if(window.scrollY >= 90) {
            setNavBg(true);
        } else {
            setNavBg(false);
        }
    }

    window.addEventListener("scroll", handler); 
    return () => {
        window.removeEventListener("scroll", handler);
    }
}, []);

  return (
    <>
      <div className={`${navBg ? "bg-indigo-700 shadow-md" : "fixed"} transition-all duration-200 h-[12vh] z-[100] fixed w-full`}>
        <div className="flex items-center h-full justify-between sm:w-[80%] w-[90%] mx-auto">
          {/* Logo */}
          <div className="text-white font-bold text-2xl sm:text-3xl">Olympus NCLEX</div>
          {/* NavLinks */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((item) => {
              return (
                <Link
                  className="text-white hover:text-green-300 font-semibold transition-all duration-200"
                  href={item.url}
                  key={item.id}
                >
                  {" "}
                  {item.label}{" "}
                </Link>
              );
            })}
          </div>
          {/* Buttons */}
          <div className="flex items-center space-x-4"> 
            {/*
            <a href="#_" className="relative inline-block text-lg group">
              <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-grey-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-green-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-green-700 group-hover:-rotate-180 ease"></span>
                <span className="relative">Button Text</span>
              </span>
              <span
                className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-lg"
              ></span>
            </a>
            */}
            {/* Theme Switch button */}
            <ThemeToggle />
            {/* Burger Menu */}
            <HiBars3BottomRight onClick={openNav} className="w-8 h-8 cursor-pointer text-white lg:hidden" />
          </div>
        </div>
      </div>
    </>
  );

}; 

export default DesktopNav;