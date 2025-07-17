import React from "react";
import { FaFingerprint } from "react-icons/fa";
import { HiOutlineChat } from "react-icons/hi";
import { IoAppsOutline, IoWifiOutline } from "react-icons/io5";
import { MdNotifications, MdOutlineTouchApp } from "react-icons/md";


const Features = () => {
    const featuresData = [
        {
            title: "Touch to buy",
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.",
            icon: <MdOutlineTouchApp className="w-12 h-12 text-pink-600 mx-auto" />

        },
        {
            title: "Secure Data",
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.",
            icon: <FaFingerprint className="w-12 h-12 text-pink-600 mx-auto" />

        },
        {
            title: "Instant Chat",
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.",
            icon: <HiOutlineChat className="w-12 h-12 text-pink-600 mx-auto" />

        },
        {
            title: "Live Notification",
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.",
            icon: <MdNotifications className="w-12 h-12 text-pink-600 mx-auto" />

        },
        {
            title: "Wifi Support",
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.",
            icon: <IoWifiOutline className="w-12 h-12 text-pink-600 mx-auto" />

        },
        {
            title: "App Watch",
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.",
            icon: <IoAppsOutline className="w-12 h-12 text-pink-600 mx-auto" />

        },
       
    ]
    return (
        <div className="pt-16 pb-16">
            <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuresData.map((data, idx) => {
                return (
                   
                    <div
                    data-aos="fade-up" data-aos-delay={idx * 100 } data-aos-anchor-placement="top-center"
                    className="mx-auto text-center" key={idx}>
                        {/* Icon */}
                        <div className="m-auto text-center ">{data.icon}</div>    
                        {/* Title */}
                        <h1 className="dark:text-gray-300 mt-4 text-lg font-semibold text-gray-900">{data.title}</h1>
                        {/* Description */}
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">{data.description}</p>
                     </div>
                
                )
            })}
            </div>
        </div>
    )
}

export default Features;