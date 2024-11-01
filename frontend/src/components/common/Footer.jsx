import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='bg-black text-white py-10'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Logo and Description */}
          <div>
            <div className='flex items-center mb-4'>
              <span className='text-3xl font-bold text-white'>FIT</span>
              <span className='text-3xl font-bold text-orange-500'>PRO</span>
            </div>
            <p className='text-gray-400 text-sm'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore dolore magna aliqua endisse
              ultrices gravida lorem.
            </p>
            <div className='flex mt-4 space-x-4'>
              <FaFacebookF className='text-gray-400 hover:text-white cursor-pointer' />
              <FaTwitter className='text-gray-400 hover:text-white cursor-pointer' />
              <FaYoutube className='text-gray-400 hover:text-white cursor-pointer' />
              <FaInstagram className='text-gray-400 hover:text-white cursor-pointer' />
              <FaEnvelope className='text-gray-400 hover:text-white cursor-pointer' />
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Useful Links</h3>
            <ul className='p-0 m-0 text-gray-400'>
              <li>
                <Link
                  to='/about'
                  className='no-underline text-gray-400 hover:text-white'
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to='/services'
                  className='no-underline text-gray-400 hover:text-white'
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to='/user/classes'
                  className='no-underline text-gray-400 hover:text-white'
                >
                  Classes
                </Link>
              </li>
              <li>
                <Link
                  to='/user/trainers'
                  className='no-underline text-gray-400 hover:text-white'
                >
                  Trainers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Support</h3>
            <ul className='p-0 m-0 space-y-2 text-gray-400'>
              <li>
                <Link
                  to='/'
                  className='no-underline text-gray-400 hover:text-white'
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to='/account'
                  className='no-underline text-gray-400 hover:text-white'
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to='/subscribe'
                  className='no-underline text-gray-400 hover:text-white'
                >
                  Subscribe
                </Link>
              </li>
              <li>
                <Link
                  to='/contact'
                  className='no-underline text-gray-400 hover:text-white'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Tips & Guides */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Tips & Guides</h3>
            <ul className='p-0 m-0 space-y-4'>
              <li>
                <Link
                  to='/fitness-tips'
                  className='no-underline text-gray-400 hover:text-white'
                >
                  Physical fitness may help prevent depression, anxiety
                </Link>
                <p className='text-gray-500 text-xs'>
                  3 min read | 20 Comments
                </p>
              </li>
              <li>
                <Link
                  to='/belly-fat-tips'
                  className='no-underline text-gray-400 hover:text-white'
                >
                  Fitness: The best exercise to lose belly fat and tone up...
                </Link>
                <p className='text-gray-500 text-xs'>
                  3 min read | 20 Comments
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-8 border-t border-gray-800 pt-4 text-center text-gray-500 text-sm'>
          Copyright ©2024 All rights reserved | This website is made
          by&nbsp;&nbsp;
          <Link
            to='/about'
            className='no-underline text-orange-500 hover:underline'
          >
            SHAKTHI SUNDAR K
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
