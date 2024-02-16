import { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [fetchedData, setFetchedData] = useState('');

  useEffect(
    function () {
      async function fetch() {
        const res = await fetch(url);
        const data = await res.json();
        setFetchedData(data);
      }

      fetch();
    },
    [url],
  );

  return fetchedData;
}
