import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import DataTable from './DataTable'; // Import your DataTable component

const MovieListing = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Fetch movies from OMDb API and set relevant details to the state
        const fetchMovies = async () => {
            try {
                const response = await axios.get(
                    'http://www.omdbapi.com/?s=movie&type=movie&apikey=9720adcc'
                );

                // Extract relevant details from the API response
                const moviesData = response.data.Search || [];
                const formattedMovies = moviesData.map((movie) => ({
                    imdbID: movie.imdbID,
                    name: movie.Title,
                    year: movie.Year,
                    genre: movie.Genre,
                    rating: movie.imdbRating,
                    poster: movie.Poster,
                }));

                // Update the component state with the formatted movie details
                setMovies(formattedMovies);
            } catch (error) {
                // Handle errors if the API request fails
                console.error('Error fetching movies:', error);
            }
        };

        // Call the fetchMovies function when the component mounts (empty dependency array)
        fetchMovies();
    }, []);

    return (
        <div>
            <NavBar />
            <DataTable data={movies}/>
        </div>
    );
};

export default MovieListing;
