export default function WatchedItem({ movie, onSetWatchedMovie }) {
  function handleDelete() {
    onSetWatchedMovie((prevWatched) =>
      prevWatched.filter((item) => item !== movie),
    );
  }

  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime} min</span>
        </p>
        <button onClick={handleDelete} className="btn-delete">
          X
        </button>
      </div>
    </li>
  );
}
