import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "@/components/MovieCard";
import { API_BASE_URL, API_TOKEN } from "@/config/apiConfig";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash"; // Import debounce from lodash

interface Movie {
  id: number;
  title: string;
  stream_link: string;
}

const MovieListSearch: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const debouncedFetchMoviesSearch = debounce((term: string) => fetchMoviesSearch(term), 800);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
        debouncedFetchMoviesSearch(searchTerm);
    }
  }, [searchTerm]); // Trigger effect on searchTerm or isSearching change

  async function fetchMoviesSearch(searchTerm: string) {
    try {
      const url = `${API_BASE_URL}/movies?page=${page}&limit=25&search=${searchTerm}`;
      const response = await axios.get(url, {
        headers: {
          "X-TOKEN-ACCESS": API_TOKEN,
        },
      });
      const newMovies = response.data.data;
      setMovies(newMovies);
      setPage(1);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = encodeURIComponent(e.target.value);
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title..."
        value={decodeURIComponent(searchTerm)}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded w-full text-black"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
    </div>
  );
};

export default MovieListSearch;
