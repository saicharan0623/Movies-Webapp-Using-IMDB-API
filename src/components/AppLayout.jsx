import React from 'react';
import Navbar from './Navbar';

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24">
        {children}
      </div>
      <footer className="bg-white mt-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} CineTracker. All movie data from TMDB.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;