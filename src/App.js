import { useState } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import SearchInput from './components/SearchInput';
import NumResults from './components/NumResults';
import WatchedSummary from './components/WatchedSummary';
import WatchedList from './components/WatchedList';
import Box from './components/Box';
import MovieList from './components/MovieList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import MovieDetails from './components/MovieDetails';
import MovieItem from './components/MovieItem';
import { useMovies } from './hooks/useMovies';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  const [query, setQuery] = useState('');
  const [watched, setWatched] = useLocalStorage([], 'watched');

  const { movies, error, isLoading, selectedId, setSelectedId } =
    useMovies(query);

  return (
    <>
      <Navbar>
        <SearchInput
          query={query}
          onSetQuery={setQuery}
          onSetSelectedId={setSelectedId}
        />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box movies={movies}>
          {error ? (
            <ErrorMessage errorMessage={error} />
          ) : isLoading ? (
            <Loader />
          ) : (
            <MovieList movies={movies}>
              <ul className="list list-movies">
                {movies?.map((movie) => (
                  <MovieItem
                    key={movie.imdbID}
                    movie={movie}
                    onSetSelectedId={setSelectedId}
                    selectedId={selectedId}
                  />
                ))}
              </ul>
            </MovieList>
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onSetSelectedId={setSelectedId}
              onSetWatchedMovie={setWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} onSetWatchedMovie={setWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
