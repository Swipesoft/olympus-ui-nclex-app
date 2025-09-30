import Image from 'next/image'; 
import React from 'react'; 
import { BsQuote } from 'react-icons/bs';
import { StaticImageData } from 'next/image';

type Props = {
    image: string | StaticImageData;  //support both url strings and static images
    name: string;
    role: string;
    comment?: string;
}

const ReviewCard = ({image, name, role, comment}: Props) => {
  console.log(image, name, role);  
  return (
    <div> 
        <BsQuote className="w-14 h-14 text-pink 500"/> 
        <p className="text-center text-gray-800 dark:text-gray-200 text-sm">
            {comment ? comment : "This is the best NCLEX prep platform I have ever used. The questions are challenging and the explanations are thorough. Highly recommend to anyone preparing for the NCLEX!"}
        </p>
        <div className="mt-6"> 
            <Image src={image} alt={name} width={100} height={100} className="object-center mx-auto rounded-full" />
        </div>

        <h1 className="text-lg font-bold text-center mt-4">{name}</h1>
        <h1 className="text-center text-gray-500 ">{role}</h1>
    

    </div>
  )  

};

export default ReviewCard; 