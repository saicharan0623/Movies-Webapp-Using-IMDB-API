import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({ handleAddtoWatchlist, handleRemoveFromWatchList, watchList }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handlePrev = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=d5ab9aa34f1a411637e08b765e6939c6&language=en-US&page=${pageNo}`
      )
      .then(function (res) {
        setMovies(res.data.results);
        setLoading(false);
      })
      .catch(function (err) {
        setError("Failed to load movies");
        setLoading(false);
      });
  }, [pageNo]);

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen pb-16">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Trending</span>
                  <span className="block text-indigo-600">Movies</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Discover the most popular films right now. Browse through this collection of trending titles and add them to your watchlist.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center py-10">
          <div className="text-red-500 font-medium mb-2">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Movies grid */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {movies.map((movieObj) => (
              <MovieCard
                key={movieObj.id}
                movieObj={movieObj}
                poster_Path={movieObj.poster_path}
                name={movieObj.original_title}
                handleAddtoWatchlist={handleAddtoWatchlist}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
                watchList={watchList}
              />
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-12">
            <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Movies;