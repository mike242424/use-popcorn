import { useState } from 'react';
import SearchedItem from './SearchedItem';

export default function SearchResults({ movies }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? '–' : '+'}
      </button>
      {isOpen1 && (
        <ul className="list">
          {movies?.map((movie) => (
            <SearchedItem movie={movie} key={movie.imdbID} />
          ))}
        </ul>
      )}
    </div>
  );
}
