import { useEffect, useState } from 'react';
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

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('Jaws');
  const [selectedId, setSelectedId] = useState(null);

  // fetch(
  //   `http://www.omdbapi.com/?&apikey=${process.env.REACT_APP_API_KEY}&s=Jaws`,
  // )
  //   .then((res) => res.json())
  //   .then((data) => setMovies(data.Search));

  // useEffect(() => {
  //   fetch(
  //     `http://www.omdbapi.com/?&apikey=${process.env.REACT_APP_API_KEY}&s=Jaws`,
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setMovies(data.Search));
  // }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(
          `http://www.omdbapi.com/?&apikey=${process.env.REACT_APP_API_KEY}&s=${query}`,
          { signal: controller.signal },
        );

        if (!res.ok) {
          throw new Error('Error fetching movies');
        }

        const data = await res.json();

        if (data.Response === 'False') {
          throw new Error('No movies found');
        }

        setMovies(data.Search);
        setError('');
        // console.log(data.Search);
      } catch (err) {
        console.log(err.message);
        console.log(err.name);
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Navbar>
        <SearchInput query={query} onSetQuery={setQuery} />
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
