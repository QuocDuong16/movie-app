import MovieListSearch from "@/components/MovieListSearch";
import Link from "next/link";

export default function Home() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Movie List with Search</h1>
        <MovieListSearch />
      </div>
    );
  }