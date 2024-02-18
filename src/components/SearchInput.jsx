import { useRef } from 'react';
import { useKey } from '../hooks/useKey';

export default function SearchInput({ query, onSetQuery, onSetSelectedId }) {
  const inputElement = useRef(null);

  useKey('Enter', function () {
    if (document.activeElement === inputElement.current) {
      return;
    }

    onSetQuery('');
    onSetSelectedId(null);
    inputElement.current.focus();
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      ref={inputElement}
    />
  );
}
