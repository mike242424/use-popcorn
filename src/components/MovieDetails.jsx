import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import Loader from './Loader';

export default function MovieDetails({
  selectedId,
  onSetSelectedId,
  onSetWatchedMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId,
  )?.userRating;

  console.log(watchedUserRating);

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

        // console.log(data);

        setMovie(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }

    getMovie();
  }, [selectedId]);

  function handleAddMovie() {
    onSetWatchedMovie((movies) => [
      ...movies,
      {
        ...movie,
        imdbID: selectedId,
        imdbRating: Number(movie.imdbRating),
        Runtime: Number(movie.Runtime.split(' ')[0]),
        userRating,
      },
    ]);
    onSetSelectedId(null);
  }

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
                    <button onClick={handleAddMovie} className="btn-add">
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
