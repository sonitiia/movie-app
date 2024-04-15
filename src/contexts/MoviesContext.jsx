import { createContext, useEffect, useState } from "react";
import movieService from "../services/MovieService";
import dayjs from "dayjs";

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [likedMovies, setLikedMovies] = useState(() => {
    const savedLikedMovies = localStorage.getItem("likedMovies");
    return savedLikedMovies ? JSON.parse(savedLikedMovies) : [];
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMoviesData = async () => {
      try {
        setIsLoading(true);
        const response = await movieService.getMovies();
        setMovies(response);
        setFilteredMovies(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMoviesData();
  }, []);

  const searchMovies = (searchQuery) => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredMovies(filtered);
  };

  const selectMovie = (movieId) => {
    const selected = movies.find((movie) => movie.id === movieId);
    setSelectedMovie(selected);
  };

  const getMovieData = async (movieId) => {
    try {
      const response = await movieService.getMovie(movieId);
      return response;
    } catch (error) {
      console.error("Error getting movie details:", error);
      return null;
    }
  };

  const addMovie = async (newMovieData) => {
    try {
      const formattedReleaseDate = dayjs(newMovieData.releaseDate).format(
        "YYYY-MM-DD",
      );
      const formattedMovieData = {
        ...newMovieData,
        releaseDate: formattedReleaseDate,
      };
      const newMovie = await movieService.addMovie(formattedMovieData);
      setMovies([...movies, newMovie]);
      setFilteredMovies([...filteredMovies, newMovie]);
    } catch (error) {
      console.error(error);
    }
  };

  const editMovie = async (movieId, updatedMovieData) => {
    try {
      const formattedReleaseDate = dayjs(updatedMovieData.releaseDate).format(
        "YYYY-MM-DD",
      );

      const editedMovie = await movieService.editMovie({
        id: movieId,
        releaseDate: formattedReleaseDate,
        ...updatedMovieData,
      });

      const updatedMovies = movies.map((movie) =>
        movie.id === editedMovie.id ? editedMovie : movie,
      );

      setMovies(updatedMovies);
      setFilteredMovies(updatedMovies);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (movieId) => {
    try {
      await movieService.deleteMovie(movieId);
      const updatedMovies = movies.filter((movie) => movie.id !== movieId);
      setMovies(updatedMovies);
      setFilteredMovies(updatedMovies);

      const updatedLikedMovies = likedMovies.filter(
        (movie) => movie.id !== movieId,
      );
      setLikedMovies(updatedLikedMovies);
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
  }, [likedMovies]);

  const toggleLike = (movieId) => {
    if (likedMovies.some((movie) => movie.id === movieId)) {
      setLikedMovies(likedMovies.filter((movie) => movie.id !== movieId));
    } else {
      const likedMovie = movies.find((movie) => movie.id === movieId);
      setLikedMovies([...likedMovies, likedMovie]);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        movies: filteredMovies,
        isLoading,
        searchMovies,
        selectedMovie,
        selectMovie,
        getMovieData,
        addMovie,
        editMovie,
        deleteMovie,
        likedMovies,
        toggleLike,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
