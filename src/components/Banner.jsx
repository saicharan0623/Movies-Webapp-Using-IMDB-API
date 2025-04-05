import React, { useState, useEffect } from "react";
import axios from "axios";
import genreIds from "../Utility/genre";

function Banner({ handleAddtoWatchlist, watchList }) {
  const [movie, setMovie] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    // Fetch a trending/popular movie for the banner
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=d5ab9aa34f1a411637e08b765e6939c6&language=en-US&page=1`
      )
      .then(function (res) {
        // Get first result or random from top 5
        const featuredMovie = res.data.results[Math.floor(Math.random() * 5)];
        setMovie(featuredMovie);
        setIsLoaded(true);
        
        // Fetch trailer for the selected movie
        if (featuredMovie) {
          fetchTrailer(featuredMovie.id);
        }
      })
      .catch(function (err) {
        setError("Failed to load banner movie");
        console.error(err);
      });
  }, []);

  // Fetch movie trailer
  const fetchTrailer = (movieId) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=d5ab9aa34f1a411637e08b765e6939c6&language=en-US`
      )
      .then(function (res) {
        const videos = res.data.results;
        // Look for official trailers
        const trailers = videos.filter(
          video => 
            (video.type === "Trailer" || video.type === "Teaser") && 
            video.site === "YouTube"
        );
        
        if (trailers.length > 0) {
          // Prefer official trailers over teasers
          const officialTrailer = trailers.find(video => video.type === "Trailer" && video.official) || 
                                 trailers.find(video => video.type === "Trailer") || 
                                 trailers[0];
          setTrailerKey(officialTrailer.key);
        }
      })
      .catch(function (err) {
        console.error("Failed to load trailer:", err);
      });
  };

  // Toggle trailer visibility
  const toggleTrailer = () => {
    setShowTrailer(!showTrailer);
  };

  // Check if movie is in watchlist
  const isInWatchlist = movie
    ? watchList.some((item) => item.id === movie.id)
    : false;

  // Handle add to watchlist
  const addToWatchlist = () => {
    if (movie && !isInWatchlist) {
      handleAddtoWatchlist(movie);
    }
  };

  if (error) {
    return (
      <div className="w-full h-[20vh] bg-gray-800 flex items-center justify-center">
        <p className="text-gray-300">Failed to load featured movie</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="w-full h-[20vh] md:h-[75vh] bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  // Format runtime
  const formatRuntime = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Get year from release date
  const getYear = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).getFullYear();
  };

  return (
    <div className="relative w-full h-[30vh] md:h-[80vh] overflow-hidden">
      {/* Background image with parallax effect or trailer */}
      {showTrailer && trailerKey ? (
        <div className="absolute inset-0 z-10 bg-black">
          <div className="relative w-full h-full">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&controls=1`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button 
              onClick={toggleTrailer}
              className="absolute top-4 right-4 z-20 bg-black/60 text-white p-2 rounded-full hover:bg-black/80"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`absolute inset-0 bg-cover bg-center transform scale-110 transition-all duration-700 ${
            isLoaded ? "scale-105 blur-0" : "blur-sm"
          }`}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
            transformOrigin: "center",
          }}
        />
      )}

      {/* Gradient overlay (only show when trailer is not playing) */}
      {!showTrailer && (
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      )}

      {/* Content container (only show when trailer is not playing) */}
      {!showTrailer && (
        <div className="absolute inset-0 flex flex-col justify-end items-center p-6 md:p-12">
          <div
            className={`transform transition-all duration-700 delay-300 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight text-center">
              {movie.title}
            </h1>
            <p className="text-gray-300 text-sm md:text-lg max-w-2xl mx-auto text-center mb-4">
              {movie.overview
                ? movie.overview.substring(0, 150) +
                  (movie.overview.length > 150 ? "..." : "")
                : "No description available"}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={toggleTrailer}
                disabled={!trailerKey}
                className={`px-6 py-2 bg-red-600 text-white rounded-full font-medium flex items-center transition-colors ${
                  !trailerKey ? "bg-red-800 cursor-not-allowed" : "hover:bg-red-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                {trailerKey ? "Watch Trailer" : "No Trailer Available"}
              </button>
              <button
                onClick={addToWatchlist}
                disabled={isInWatchlist}
                className={`px-6 py-2 text-white rounded-full font-medium flex items-center transition-colors ${
                  isInWatchlist
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-white/20 backdrop-blur-sm hover:bg-white/30"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {isInWatchlist ? (
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  )}
                </svg>
                {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
              </button>
            </div>

            {/* Movie stats */}
            <div className="flex justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-yellow-400 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10
              </div>
              <div>{getYear(movie.release_date)}</div>
              <div className="hidden md:block">
                {movie.genre_ids && movie.genre_ids.length > 0
                  ? movie.genre_ids
                      .slice(0, 2)
                      .map((id) => genreIds[id])
                      .join(", ")
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Banner;