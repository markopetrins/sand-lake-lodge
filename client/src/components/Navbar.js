import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/features', label: 'Features' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/booking', label: 'Book Now' }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg fixed w-full top-0 z-50 border-b border-amber-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src="/cabin_icon.png" alt="Sand Lake Lodge" className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-lg md:text-xl font-serif font-bold text-amber-800 group-hover:text-amber-900 transition-colors duration-300">
              Sand Lake Lodge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm md:text-base font-medium transition-all duration-300 relative ${
                  location.pathname === item.path
                    ? 'text-amber-800 font-semibold'
                    : 'text-amber-700 hover:text-amber-800'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-600"></div>
                )}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></div>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-amber-700 hover:text-amber-800 focus:outline-none p-2 rounded-lg hover:bg-amber-50 transition-colors duration-300"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white/95 backdrop-blur-sm border-t border-amber-200">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg ${
                    location.pathname === item.path
                      ? 'text-amber-800 bg-amber-100 font-semibold'
                      : 'text-amber-700 hover:text-amber-800 hover:bg-amber-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 