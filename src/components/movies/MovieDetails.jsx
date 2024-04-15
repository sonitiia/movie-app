import { useParams } from "react-router-dom";
import { useMovies } from "../../custom-hooks/useMovies";
import Loader from "../Loader";
import styles from "./MovieDetails.module.css";
import { useEffect, useState } from "react";
import EditMovieForm from "../../forms/EditMovieForm";
import dayjs from "dayjs";

const MovieDetails = () => {
  const { id } = useParams();
  const { getMovieData, likedMovies, toggleLike } = useMovies();
  const [movieData, setMovieData] = useState(null);
  const [isEditingMovie, setEditingMovie] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const movie = await getMovieData(id);
      setMovieData(movie);
      setIsLoading(false);
    };

    fetchData();
  }, [id, getMovieData]);

  if (isLoading) {
    return <Loader />;
  }

  if (!movieData) {
    return <p>Error loading movie data.</p>;
  }

  const isLiked = likedMovies.some((movie) => movie.id === movieData.id);

  const handleToggleLike = () => {
    toggleLike(movieData.id);
  };

  const openModal = () => {
    setEditingMovie(true);
  };

  const closeModal = () => {
    setEditingMovie(false);
  };

  const formattedReleaseDate = dayjs(movieData.releaseDate).format(
    "DD.MM.YYYY",
  );

  return (
    <div className={styles.movieDetailsWrapper}>
      <div className={styles.movieDetailsImageWrapper}>
        <div className={styles.flexRow}>
          <p>
            Rating: {movieData.rating}/10{" "}
            <span role="img" aria-label="star">
              ⭐️
            </span>
          </p>

          <div>
            <button className={styles.likeButton} onClick={openModal}>
              <span role="img" aria-label="edit">
                🔧
              </span>
            </button>
            {isEditingMovie && (
              <div>
                <EditMovieForm onClose={closeModal} />
              </div>
            )}

            <button className={styles.likeButton} onClick={handleToggleLike}>
              {isLiked ? (
                <span role="img" aria-label="liked">
                  🤍
                </span>
              ) : (
                <span
                  role="img"
                  aria-label="not-liked"
                  className={styles.notLiked}
                >
                  ♡
                </span>
              )}
            </button>
          </div>
        </div>

        <img src={movieData.image} alt={movieData.title} />
      </div>

      <div className={styles.movieDetails}>
        <h2>{movieData.title}</h2>
        <p>Description: {movieData.description}</p>
        <p>Actors: {movieData.actors}</p>
        <p>Director: {movieData.director}</p>
        <p>Genres: {movieData.genre}</p>
        <p>Date: {formattedReleaseDate}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
