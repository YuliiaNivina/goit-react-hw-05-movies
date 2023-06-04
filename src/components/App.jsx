import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import Layout from './Layout/Layout';
import Home from '../pages/Home';
import Movies from '../pages/Movies';

const MovieDetail = lazy(() => import('../pages/MovieDetails'));
const Cast = lazy(() => import('../pages/Cast'));
const Reviews = lazy(() => import('../pages/Reviews'));

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetail />}>
            <Route path="/movies/:movieId/cast" element={<Cast />} />
            <Route path="/movies/:movieId/reviews" element={<Reviews />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
