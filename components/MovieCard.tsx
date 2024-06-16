import React from 'react';
import Link from 'next/link';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    stream_link: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="border p-4">
      <Link href={`/movie/${movie.id}`}>
        <h2 className="text-lg font-bold cursor-pointer">{movie.title}</h2>
      </Link>
    </div>
  );
};

export default MovieCard;
