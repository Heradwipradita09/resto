// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuTable from './module/daftar-menu/MenuTable';
import HomePage from './module/RecommendationPage';
import RestoFav from './module/resto-fav/FavoriteRestaurants';
import RecommendationPage from './module/RecommendationPage';

const App = () => {
  return (
    <div className="App">
      <RecommendationPage />
    </div>
  );
};

export default App;
