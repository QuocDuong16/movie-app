import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '@/components/MovieCard';
import { API_BASE_URL, API_TOKEN } from '@/config/apiConfig';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Movie {
  id: number;
  title: string;
  stream_link: string;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true); // Track if there are more movies to load

  useEffect(() => {
    fetchMovies();
  }, []); // Initial fetch

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies?page=${page}&limit=15`, {
        headers: {
          'X-TOKEN-ACCESS': API_TOKEN
        }
      });
      const newMovies = response.data.data;
      if (newMovies.length === 0) {
        setHasMore(false); // No more movies to load
      } else {
        setMovies(prevMovies => [...prevMovies, ...newMovies]);
        setFilteredMovies(prevFiltered => [...prevFiltered, ...newMovies]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredMoviesList = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded w-full text-black"
      />
      <InfiniteScroll
        dataLength={filteredMoviesList.length}
        next={fetchMovies}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        endMessage={<p>No more movies to load.</p>}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredMoviesList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MovieList;
