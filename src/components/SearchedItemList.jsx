import SearchedItem from './SearchedItem';

export default function SearchedItemList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <SearchedItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}
