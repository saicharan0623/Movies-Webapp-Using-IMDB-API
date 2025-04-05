import React, { useState, useEffect } from 'react';
import Logo from '../MovieLogo.jpg';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Add scroll event listener to change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
        ? 'bg-white shadow-md py-2' 
        : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img 
                className="h-10 w-10 rounded-lg object-cover shadow-sm" 
                src={Logo} 
                alt="Cinema logo" 
              />
            </div>
            <div className="hidden md:block ml-3">
              <Link to="/" className="font-bold text-xl text-gray-800">
                CineTracker
              </Link>
              <p className="text-xs text-gray-500">Your movie companion</p>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex items-center">
            <div className="flex space-x-1 sm:space-x-4">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center ${
                  location.pathname === '/' 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span>Movies</span>
              </Link>
              
              <Link 
                to="/watchlist" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center ${
                  location.pathname === '/watchlist' 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>Watchlist</span>
              </Link>
            </div>
          </div>

          {/* Search button (can be expanded in the future) */}
          <div className="hidden md:flex items-center">
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;