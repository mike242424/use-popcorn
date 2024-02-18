import { useEffect } from 'react';

export function useKey(key, action) {
  useEffect(
    function () {
      function callbackFxn(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action(null);
          console.log('Closing');
        }
      }
      document.addEventListener('keydown', callbackFxn);
      return function () {
        document.removeEventListener('keydown', callbackFxn);
      };
    },
    [key, action],
  );
}
