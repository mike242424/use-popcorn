export default function MovieItem({ movie, selectedId, onSetSelectedId }) {
  return (
    <li
      onClick={() => {
        if (selectedId === movie.imdbID) {
          onSetSelectedId(null);
        } else {
          onSetSelectedId(movie.imdbID);
        }
      }}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
