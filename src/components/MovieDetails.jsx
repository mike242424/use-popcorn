import { useEffect, useRef, useState } from 'react';
import StarRating from './StarRating';
import Loader from './Loader';
import { useKey } from '../hooks/useKey';

export default function MovieDetails({
  selectedId,
  onSetSelectedId,
  onSetWatchedMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) {
      countRef.current++;
    }
  }, [userRating]);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId,
  )?.userRating;

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?&apikey=${process.env.REACT_APP_API_KEY}&i=${selectedId}`,
        );

        const data = await res.json();

        if (data.Response === 'False') {
          throw new Error('No movies found');
        }

        setMovie(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }

    getMovie();
  }, [selectedId]);

  useEffect(() => {
    if (!movie.Title) return;
    document.title = `Movie | ${movie.Title}`;

    return function () {
      document.title = 'usePopcorn';
    };
  }, [movie.Title]);

  function handleAddWatched() {
    onSetWatchedMovie((movies) => [
      ...movies,
      {
        ...movie,
        imdbID: selectedId,
        imdbRating: Number(movie.imdbRating),
        Runtime: Number(movie.Runtime.split(' ')[0]),
        userRating,
        countRatingDecisions: countRef.current,
      },
    ]);

    onSetSelectedId(null);
  }

  useKey('Escape', onSetSelectedId);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => onSetSelectedId(null)}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie.imdbRating} IMDd Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button onClick={handleAddWatched} className="btn-add">
                      Add To Watched List
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie {watchedUserRating} / 10</p>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
