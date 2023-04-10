import React from "react";
import {FaFacebookSquare, FaInstagram,FaTwitter,FaPhoneSquare} from 'react-icons/fa';

const SocialIcons = () => {
  return (
    <div className="text-teal-500">
        <a
          className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
        href="https://www.facebook.com/tranmanhdat2301/" target="_blank" rel="noreferrer"
        >
          <FaFacebookSquare/>
          
        </a>
        <a  className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
        href="https://www.instagram.com/tmd_at/" target="_blank" rel="noreferrer"
        >
          <FaInstagram/>
        </a>
        <a  className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
        href="https://twitter.com/TM60812094" target="_blank" rel="noreferrer"
        >        
          <FaTwitter/>
        </a>
        <a  className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
        href="https://f9-zpcloud.zdn.vn/9121718558977636980/29afebf952808eded791.jpg" target="_blank" rel="noreferrer"
        >
          <FaPhoneSquare/>
        </a>
      
    </div>
  );
};

export default SocialIcons;