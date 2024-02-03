import SearchResults from './SearchResults';
import WatchedMovies from './WatchedMovies';
export default function Main({ movies }) {
  return (
    <main className="main">
      <SearchResults movies={movies} />

      <WatchedMovies />
    </main>
  );
}
