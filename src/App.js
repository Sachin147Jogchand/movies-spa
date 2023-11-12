import ListingPage from './components/MovieList';
import DetailsPage from './components/MovieDetails';
import {
  Routes,
  Route,
} from 'react-router-dom'

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListingPage />} />
      <Route path="/details" element={<DetailsPage />} />
    </Routes>
  );
}

export default App;
