export default function WatchedSummary({ watched }) {
  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const avgImdbRating = Math.round(
    (average(watched.map((movie) => movie.imdbRating)) * 100) / 100,
  );
  const avgUserRating = Math.round(
    (average(watched.map((movie) => movie.userRating)) * 100) / 100,
  );
  const avgRuntime = Math.round(
    (average(watched.map((movie) => movie.Runtime)) * 100) / 100,
  );

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
