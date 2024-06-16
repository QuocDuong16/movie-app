import { Inter } from "next/font/google";
import MovieList from '@/components/MovieList';
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Link href={`/movie/search`}>
        <h5 className="text-lg font-bold cursor-pointer underline text-green-500">Search Phim</h5>
      </Link>
      <h1 className="text-2xl font-bold mb-4">Movie List</h1>
      <MovieList />
    </div>
  );
}
