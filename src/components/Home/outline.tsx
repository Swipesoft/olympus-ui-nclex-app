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
const features_v1 = [
    "Detailed, step-by-step rationale for every NCLEX question", 
    "Proven strategies to help you ace the NCLEX on your first try", 
    "Contrast each answer choice to improve NCLEX content mastery", 
    "Trusted, evidence-based nursing knowledge at your fingertips"
]

const features_v2 = [
  "NCLEX practice items reviewed & compiled by experts", 
  "Olympiad-level question difficulty aiming to improve clinical judgement", 
  "Diversified standalone MCQ & SATA questions on multiple NCLEX topics", 
  "Personalized performance tracking and analytics dashboard"
]
  return (
    <div className="overflow-hidden">
      <HeroBanner />
      <Features />
      <About
        textOrder="lg:order-1"
        imageOrder="lg:order-2"
        linkText="Learn More"
        title="Why Choose Our QBank?"
        items={features_v1}
      />
      <About
        textOrder="lg:order-2"
        imageOrder="lg:order-1"
        linkText="Practice Now"
        title="Personalised, Adaptive NCLEX Practice"
        items={features_v2}
      />
      <Review />
      <Contact />
    </div>
  );
};

export default Home;