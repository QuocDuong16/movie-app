import Image from "next/image";
import { Inter } from "next/font/google";
import MovieList from '@/components/MovieList';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movie List</h1>
      <MovieList />
    </div>
  );
}
