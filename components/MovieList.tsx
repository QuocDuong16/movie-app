import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MovieCard from '@/components/MovieCard';
import { API_BASE_URL, API_TOKEN } from '@/config/apiConfig';

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
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true); // Track if there are more movies to load
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/movies?page=${page}&limit=10`, {
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
      setLoading(false);
    };

    if (hasMore && !loading) {
      fetchMovies();
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
          setPage(prevPage => prevPage + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  useEffect(() => {
    const results = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(results);
  }, [searchTerm, movies]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full text-black"
      />
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {loading && <p>Loading...</p>}
        {!hasMore && <p>No more movies to load.</p>}
      </div>
    </div>
  );
};

export default MovieList;
