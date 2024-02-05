import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

import StarRating from './components/StarRating';

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating color="red" maxRating={10} onSetRating={setMovieRating} />
      <p>This move was rated {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={['bad', 'not bad', 'okay', 'good', 'great']}
    />
    <StarRating maxRating={10} color="blue" size={96} />
    <StarRating defaultRating={3} size={24} color={'green'} />
    <Test />
  </React.StrictMode>,
);
