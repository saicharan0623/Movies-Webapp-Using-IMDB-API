import React from "react";
import genreIds from "../Utility/genre";

function MovieCard({
  movieObj,
  poster_Path,
  name,
  handleAddtoWatchlist,
  handleRemoveFromWatchList,
  watchList,
}) {
  const isInWatchlist = watchList.some((movie) => movie.id === movieObj.id);

  return (
    <div className="relative group">
      <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-xl">
        {/* Movie poster */}
        <div className="relative">
          <img
            className="h-64 w-full object-cover"
            src={`https://image.tmdb.org/t/p/original/${poster_Path}`}
            alt={name}
            loading="lazy"
          />

          {/* Rating badge */}
          <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white text-sm font-bold px-2 py-1 rounded-lg flex items-center">
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {movieObj.vote_average.toFixed(1)}
          </div>

          {/* Genre badge */}
          {movieObj.genre_ids && movieObj.genre_ids[0] && (
            <div className="absolute top-3 left-3">
              <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-lg">
                {genreIds[movieObj.genre_ids[0]]}
              </span>
            </div>
          )}

          {/* Hover overlay with description */}
          <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <p className="text-white text-sm line-clamp-4">
              {movieObj.overview || "No description available."}
            </p>
          </div>
        </div>

        {/* Movie info */}
        <div className="p-4">
          <h3 className="font-bold text-gray-800 text-lg truncate" title={name}>
            {name}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {movieObj.release_date ? new Date(movieObj.release_date).getFullYear() : "N/A"}
          </p>
          
          {/* Action button */}
          <div className="mt-4">
            {isInWatchlist ? (
              <button
                onClick={() => handleRemoveFromWatchList(movieObj)}
                className="w-full py-2 rounded-lg bg-red-100 text-red-700 font-medium text-sm flex items-center justify-center transition-colors duration-200 hover:bg-red-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Remove from Watchlist
              </button>
            ) : (
              <button
                onClick={() => handleAddtoWatchlist(movieObj)}
                className="w-full py-2 rounded-lg bg-indigo-100 text-indigo-700 font-medium text-sm flex items-center justify-center transition-colors duration-200 hover:bg-indigo-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add to Watchlist
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;