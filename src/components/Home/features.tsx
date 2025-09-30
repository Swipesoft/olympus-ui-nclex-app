import React from "react";
import { FaFingerprint } from "react-icons/fa";
import { HiOutlineChat } from "react-icons/hi";
import { IoAppsOutline, IoWifiOutline } from "react-icons/io5";
import { MdNotifications, MdOutlineTouchApp } from "react-icons/md";


const Features = () => {
    const featuresData = [
        {
            title: "Easy to Use",
            description:"Simple, intuitive user interface & website navigation",
            icon: <MdOutlineTouchApp className="w-12 h-12 text-indigo-600 mx-auto" />

        },
        {
            title: "Personalised Learning",
            description:"Enable focused NCLEX practices on specific topics or areas of weakness.",
            icon: <FaFingerprint className="w-12 h-12 text-indigo-600 mx-auto" />

        },
        {
            title: "Instant Feedback",
            description:"Real-time scoring with detailed rationale per question.",
            icon: <HiOutlineChat className="w-12 h-12 text-indigo-600 mx-auto" />

        },
        {
            title: "Performance Tracking",
            description:"Monitor performance across all NCLEX practice sessions.",
            icon: <MdNotifications className="w-12 h-12 text-indigo-600 mx-auto" />

        },
        {
            title: "24/7 Qbank Access",
            description:"Practice the NCLEX anywhere, anytime through your mobile or desktop device.",
            icon: <IoWifiOutline className="w-12 h-12 text-indigo-600 mx-auto" />

        },
        {
            title: "Time Management",
            description:"Time series knowledge assessment trends and tracing across sessions",
            icon: <IoAppsOutline className="w-12 h-12 text-indigo-600 mx-auto" />

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