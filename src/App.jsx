import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Movies from './components/Movies';
import WatchList from './components/WatchList';

function App() {
  const [watchList, setWatchlist] = useState([]);
  
  // Load watchlist from localStorage on component mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('movieWatchlist');
    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist));
      } catch (e) {
        console.error("Error loading watchlist from localStorage:", e);
      }
    }
  }, []);
  
  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    if (watchList.length > 0) {
      localStorage.setItem('movieWatchlist', JSON.stringify(watchList));
    }
  }, [watchList]);

  const handleAddtoWatchlist = (movie) => {
    // Check if movie is already in watchlist
    if (!watchList.some(item => item.id === movie.id)) {
      setWatchlist([...watchList, movie]);
    }
  };

  const handleRemoveFromWatchList = (movie) => {
    const filteredWatchlist = watchList.filter(item => item.id !== movie.id);
    setWatchlist(filteredWatchlist);
    
    // If watchlist becomes empty, remove from localStorage
    if (filteredWatchlist.length === 0) {
      localStorage.removeItem('movieWatchlist');
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="pt-16"> {/* Space for fixed navbar */}
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Banner 
                    handleAddtoWatchlist={handleAddtoWatchlist} 
                    watchList={watchList} 
                  />
                  <Movies 
                    handleAddtoWatchlist={handleAddtoWatchlist}
                    handleRemoveFromWatchList={handleRemoveFromWatchList}
                    watchList={watchList}
                  />
                </>
              } 
            />
            <Route 
              path="/watchlist" 
              element={
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Watchlist</h1>
                  <WatchList 
                    watchList={watchList}
                    setWatchlist={setWatchlist}
                    handleRemoveFromWatchList={handleRemoveFromWatchList}
                  />
                </div>
              } 
            />
          </Routes>
        </div>
        
        <footer className="bg-white mt-16 border-t border-gray-200">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              © {new Date().getFullYear()} CineTracker. All movie data from TMDB.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;