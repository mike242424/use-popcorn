import { useEffect, useState } from 'react';

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

    setSelectedId(null);
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);
  return { movies, error, isLoading, selectedId, setSelectedId };
}
