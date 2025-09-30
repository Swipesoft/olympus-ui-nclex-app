import React from "react";
import { FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="pt-16 pb-16">
      <h1 className="text-2xl sm:text-3xl text-center text-gray-800 dark:text-white font-bold">
        Get In Touch
      </h1>
      <span className="w-16 h-1 bg-indigo-600 mx-auto mt-3 block "></span>

      <p className="text-center text-sm sm:text-base text-gray-700 dark:text-gray-200 mt-4">
        We'd love to hear from you! Whether you have a question about our services,
      </p>
      <p className="text-center text-sm sm:text-base text-gray-700 dark:text-gray-200">
         pricing, or anything else, our team is
        ready to answer all your questions.
      </p>
      <p className="text-center text-sm sm:text-base text-gray-700 dark:text-gray-200">
         Email us at <strong>support@olympus-nclex.com</strong>
      </p>
      <div className="w-[90%] sm:w-[80%] lg:w-[60%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mt-16">
        <div className="h-full">
          <input
            type="text"
            placeholder="Name"
            className="w-full block text-black bg-gray-200 shadow-md outline-none px-6 py-3.5 rounded-md mb-4"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full block text-black bg-gray-200 shadow-md outline-none px-6 py-3.5 rounded-md mb-4"
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full block text-black bg-gray-200 shadow-md outline-none px-6 py-3.5 rounded-md"
          />
        </div>
        <div className="h-full">
            <textarea placeholder="Message" className="w-full block text-black h-full bg-gray-200 shadow-md outline-none px-6 py-3.5 rounded-md mb-4"></textarea>
        </div>
      </div>
      <button className="mt-8 flex items-center gap-2 bg-indigo-800 text-white px-6 py-4 rounded-md shadow-md hover:bg-pink-900 transition mx-auto cursor-pointer">
        <FaPaperPlane /> Send Message
      </button>
    </div>
  );
};

export default Contact;