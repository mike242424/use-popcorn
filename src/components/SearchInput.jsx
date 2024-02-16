import { useEffect, useRef } from 'react';

export default function SearchInput({ query, onSetQuery, onSetSelectedId }) {
  const inputElement = useRef(null);
  useEffect(() => {
    // const el = document.querySelector('.search');
    // el.focus();
    function callbackFxn(e) {
      if (document.activeElement === inputElement.current) {
        return;
      }

      if (e.code === 'Enter') {
        onSetQuery('');
        onSetSelectedId(null);
        inputElement.current.focus();
      }
    }

    document.addEventListener('keydown', callbackFxn);

    return function () {
      document.addEventListener('keydown', callbackFxn);
    };
  }, [onSetQuery, onSetSelectedId]);
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
