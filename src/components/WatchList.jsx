import React, { useEffect, useState } from "react";
import genreIds from "../Utility/genre";

function WatchList({ watchList, setWatchlist, handleRemoveFromWatchList }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [currGenre, setCurrGenre] = useState("All Genres");
  const [sortOrder, setSortOrder] = useState(null);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (direction) => {
    setSortOrder(direction);
    let sorted = [...watchList];
    if (direction === "asc") {
      sorted.sort((a, b) => a.vote_average - b.vote_average);
    } else {
      sorted.sort((a, b) => b.vote_average - a.vote_average);
    }
    setWatchlist(sorted);
  };

  const handleFilter = (genre) => {
    setCurrGenre(genre);
  };

  useEffect(() => {
    let temp = [
      ...new Set(watchList.map((movieObj) => genreIds[movieObj.genre_ids[0]])),
    ];
    setGenreList(["All Genres", ...temp]);
  }, [watchList]);

  const filteredMovies = watchList
    .filter((movieObj) => {
      if (currGenre === "All Genres") {
        return true;
      } else {
        return genreIds[movieObj.genre_ids[0]] === currGenre;
      }
    })
    .filter((movieObj) =>
      movieObj.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 pb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">My Watchlist</h1>
          <p className="text-gray-500">Manage your favorite movies in one place</p>
        </div>

        {/* Search bar */}
        <div className="mb-6 relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            onChange={handleSearch}
            value={search}
            type="text"
            placeholder="Search movies..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out shadow-sm"
          />
        </div>

        {/* Genre filters */}
        <div className="mb-8 overflow-x-auto">
          <div className="inline-flex space-x-2 pb-2">
            {genreList.map((genre) => (
              <button
                key={genre}
                onClick={() => handleFilter(genre)}
                className={`px-5 py-2 rounded-full transition-all duration-200 font-medium text-sm whitespace-nowrap ${
                  currGenre === genre
                    ? "bg-indigo-600 text-white shadow-md transform -translate-y-0.5"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Movie cards */}
        {filteredMovies.length > 0 ? (
          <div>
            {/* Sort controls */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-500">
                {filteredMovies.length} {filteredMovies.length === 1 ? "movie" : "movies"} found
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Sort by rating:</span>
                <button
                  onClick={() => handleSort("asc")}
                  className={`p-2 rounded ${
                    sortOrder === "asc" ? "bg-indigo-100 text-indigo-600" : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => handleSort("desc")}
                  className={`p-2 rounded ${
                    sortOrder === "desc" ? "bg-indigo-100 text-indigo-600" : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMovies.map((movie) => (
                <div key={movie.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                  <div className="relative">
                    <img
                      className="h-48 w-full object-cover"
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.original_title}
                    />
                    <div className="absolute top-0 right-0 m-2 p-1 px-2 bg-black bg-opacity-75 text-white rounded">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-medium">{movie.vote_average}</span>
                      </div>
                    </div>
                    <div className="absolute top-0 left-0 m-2">
                      <span className="inline-block bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                        {genreIds[movie.genre_ids[0]]}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-1 truncate">{movie.original_title}</h3>
                    <div className="flex justify-between items-center mt-3">
                      <div className="text-xs text-gray-500">Popularity: {movie.popularity.toFixed(1)}</div>
                      <button
                        onClick={() => handleRemoveFromWatchList(movie)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200 flex items-center text-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No movies found</h3>
            <p className="mt-1 text-sm text-gray-500">Try changing your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchList;