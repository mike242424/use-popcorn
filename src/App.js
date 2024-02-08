import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import SearchInput from './components/SearchInput';
import NumResults from './components/NumResults';
import WatchedSummary from './components/WatchedSummary';
import WatchedList from './components/WatchedList';
import Box from './components/Box';
import MovieList from './components/MovieList';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

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
    async function fetchMovies() {
      const res = await fetch(
        `http://www.omdbapi.com/?&apikey=${process.env.REACT_APP_API_KEY}&s=Jaws`,
      );

      const data = await res.json();
      setMovies(data.Search);
    }

    fetchMovies();
  }, []);

  return (
    <>
      <Navbar>
        <SearchInput />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box movies={movies}>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
