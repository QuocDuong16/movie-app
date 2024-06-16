import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import VideoPlayer from '@/components/VideoPlayer';
import { API_BASE_URL, API_TOKEN } from '@/config/apiConfig';

interface Movie {
  id: number;
  title: string;
  description: string;
  stream_link: string;
  stream_link_2: string;
  stream_link_3: string;
  stream_link_4: string;
}

const MovieDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedLink, setSelectedLink] = useState<string>('');

  useEffect(() => {
    if (id) {
      const fetchMovie = async () => {
        const response = await axios.get(`${API_BASE_URL}/movies/${id}`, {
          headers: {
            'X-TOKEN-ACCESS': API_TOKEN,
          }
        });
        setMovie(response.data.data);
        setSelectedLink(response.data.data.stream_link); // Default to the first stream link
      };

      fetchMovie();
    }
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLink(event.target.value);
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>
      <p className="mb-4">{movie.description}</p>
      
      {/* Dropdown to select stream link */}
      <div className="mb-4">
        <label htmlFor="streamLinks" className="block text-sm font-medium text-gray-700">
          Select stream link:
        </label>
        <select
          id="streamLinks"
          name="streamLinks"
          value={selectedLink}
          onChange={handleChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 text-black bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value={movie.stream_link}>Link 1</option>
          <option value={movie.stream_link_2}>Link 2</option>
          <option value={movie.stream_link_3}>Link 3</option>
          <option value={movie.stream_link_4}>Link 4</option>
        </select>
      </div>
      
      {/* Video player component */}
      <VideoPlayer url={selectedLink} />
    </div>
  );
};

export default MovieDetail;
