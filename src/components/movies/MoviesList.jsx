import { useMovies } from "../../custom-hooks/useMovies";
import styles from "./MoviesList.module.css";
import MovieItem from "./MovieItem";

const MoviesList = ({ movies }) => {
  const { getMovieData, deleteMovie } = useMovies();

  const handleMovieClick = (movieId) => {
    getMovieData(movieId);
  };

  const handleDeleteMovie = (movieId) => {
    deleteMovie(movieId);
  };

  return (
    <div className={styles.moviesListContainer}>
      {movies?.map((movieItem) => (
        <MovieItem
          key={movieItem.id}
          id={movieItem.id}
          imageSrc={movieItem.image}
          title={movieItem.title}
          rating={movieItem.rating}
          releaseDate={movieItem.release_date}
          onClick={() => handleMovieClick(movieItem.id)}
          onDelete={() => handleDeleteMovie(movieItem.id)}
        />
      ))}
    </div>
  );
};

export default MoviesList;
