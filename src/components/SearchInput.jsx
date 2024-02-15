import { useEffect, useRef } from 'react';

export default function SearchInput({ query, onSetQuery }) {
  const inputElement = useRef(null);
  useEffect(() => {
    // const el = document.querySelector('.search');
    // el.focus();
    inputElement.current.focus();
  }, []);
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
