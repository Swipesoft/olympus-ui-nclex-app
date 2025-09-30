"use client"; 
import React from "react"; 
import Carousel from "react-multi-carousel"; 
import "react-multi-carousel/lib/styles.css"; 
import ReviewCard  from "./reviewCard"; 
// Importing images for the review cards
// import c1 from "@/assets/images/c1.png"  
// import c2 from "@/assets/images/c2.png";
// import c3 from "@/assets/images/c3.png"; 

const comment1 = "Olympus Quiz has transformed my NCLEX prep. The questions are challenging and the explanations are thorough. Highly recommend to anyone preparing for the NCLEX!"
const comment2 = "The performance analytics feature on the user profile page is a game-changer. It helped me keep track of my weak areas and improve my scores significantly."
const comment3 = "I love the user-friendly interface and the variety of questions available. Olympus Qbank made my study sessions more engaging and effective."

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    }, 
    tablet: {
        breakpoint: { max: 1024, min: 464},
        items: 1,
        slidesToSlide: 1, // optional, default to 1.        
    }, 
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    }
}; 

const Slider = () => {
    return (
        <>  
        <Carousel 
            swipeable={false} 
            draggable={false} 
            responsive={responsive} 
            infinite={true} 
            autoPlay={true} 
            autoPlaySpeed={4000}
            keyBoardControl={true} 
        >   
            <ReviewCard image ="/nurse1.png" name = "Sarah Brookes, RN" role="Olympus NCLEX user" comment={comment1}/>
            <ReviewCard image = "/nurse2.jpeg" name = "Maya Hills, RN" role="Olympus NCLEX user" comment={comment2}/>
            <ReviewCard image = "/nurse2b.jpeg" name = "Martha Fellingham, RN" role="Olympus NCLEX user" comment={comment3}/>
        </Carousel>
        </>
    ); 
}; 

export default Slider; 