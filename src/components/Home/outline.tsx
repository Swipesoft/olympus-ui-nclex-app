"use client"; 
import React, { useEffect } from "react"; 
import About from "./about"; 
import HeroBanner from "./hero";
import Review from "./Review/review"; 
import Contact from "./contact"; 
import Features from "./features"; 

import AOS from "aos";  // animate on scroll library 
import "aos/dist/aos.css"; // You can also use <link> for styles

const Home = () => {
useEffect(() => {
const initAos = async() => {
  await import('aos');
  AOS.init({
    duration:1000,
    easing:'ease',
    once:true,
    anchorPlacement:'top-bottom'
  })
}
initAos();
}, [])

  return (
    <div className="overflow-hidden">
      <HeroBanner />
      <Features />
      <About
        textOrder="lg:order-1"
        imageOrder="lg:order-2"
        linkText="Learn More"
        title="Pure sound, no added noise"
      />
      <About
        textOrder="lg:order-2"
        imageOrder="lg:order-1"
        linkText="Shop Now"
        title="Capture pure sound with the 70mm HD Driver"
      />
      <Review />
      <Contact />
    </div>
  );
};

export default Home;