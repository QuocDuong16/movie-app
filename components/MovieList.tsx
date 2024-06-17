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

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const debouncedFetchMovies = debounce(fetchMovies, 800);

  useEffect(() => {
    debouncedFetchMovies();
  }, [debouncedFetchMovies]);

  async function fetchMovies() {
    try {
      const url = `${API_BASE_URL}/movies?page=${page}&limit=25`;
      const response = await axios.get(url, {
        headers: {
          "X-TOKEN-ACCESS": API_TOKEN,
        },
      });
      const newMovies = response.data.data;
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(newMovies.length > 0);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={movies.length}
        next={debouncedFetchMovies}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        endMessage={<p>No more movies to load.</p>}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MovieList;
