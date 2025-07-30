import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 border-t border-amber-300">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-3 group">
                            <img src="/sand-lake-lodge/cabin_icon.png" alt="Sand Lake Lodge" className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-lg md:text-xl font-serif font-bold text-amber-800 group-hover:text-amber-900 transition-colors duration-300">
              Sand Lake Lodge
            </span>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
            <Link to="/" className="text-amber-700 hover:text-amber-800 font-medium transition-colors duration-300 hover:underline">
              Home
            </Link>
            <div className="hidden sm:block w-1 h-1 bg-amber-400 rounded-full"></div>
            <Link to="/about" className="text-amber-700 hover:text-amber-800 font-medium transition-colors duration-300 hover:underline">
              About
            </Link>
            <div className="hidden sm:block w-1 h-1 bg-amber-400 rounded-full"></div>
            <Link to="/booking" className="text-amber-700 hover:text-amber-800 font-medium transition-colors duration-300 hover:underline">
              Book Now
            </Link>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-300">
            <p className="text-amber-600 text-xs">
              © 2024 Sand Lake Lodge. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 