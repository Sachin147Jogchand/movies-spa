import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import NavBar from './NavBar';

const MovieDetails = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const imdbID = queryParams.get('id');
    const [movie, setMovie] = useState({});

    useEffect(() => {
        // Fetch movie details from OMDb API and set relevant details to the state
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(
                    `http://www.omdbapi.com/?i=${imdbID}&apikey=9720adcc`
                );

                setMovie(response.data);
            } catch (error) {
                // Handle errors if the API request fails
                console.error('Error fetching movie details:', error);
            }
        };

        // Call the fetchMovieDetails function when the component mounts (empty dependency array)
        fetchMovieDetails();
    }, [imdbID]);

    return (
       <>
        <NavBar/>
        <Card className="movie-card">
            <CardMedia
                component="img"
                alt={movie.Title}
                height="auto"
                image={movie.Poster}
                className="movie-poster"
            />
            <CardContent>
                <Typography variant="h4">{movie.Title}</Typography>
                <Typography variant="body2">Year: {movie.Year}</Typography>
                <Typography variant="body2">Rated: {movie.Rated}</Typography>
                <Typography variant="body2">Released: {movie.Released}</Typography>
                <Typography variant="body2">Runtime: {movie.Runtime}</Typography>
                <Typography variant="body2">Genre: {movie.Genre}</Typography>
                <Typography variant="body2">Director: {movie.Director}</Typography>
                <Typography variant="body2">Writer: {movie.Writer}</Typography>
                <Typography variant="body2">Actors: {movie.Actors}</Typography>
                <Typography variant="body2">Plot: {movie.Plot}</Typography>
                <Typography variant="body2">Language: {movie.Language}</Typography>
                <Typography variant="body2">Country: {movie.Country}</Typography>
                <Typography variant="body2">Awards: {movie.Awards}</Typography>
                <Typography variant="body2">Box Office: {movie.BoxOffice}</Typography>
                {/* Add more details as needed */}
            </CardContent>
        </Card>
        </>
    );
};

export default MovieDetails;
