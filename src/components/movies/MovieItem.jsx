import { Link as RouterLink } from "react-router-dom";
import styles from "./MovieItem.module.css";
import dayjs from "dayjs";
import { useMovies } from "../../custom-hooks/useMovies";

const MovieItem = ({
  id,
  imageSrc,
  title,
  rating,
  releaseDate,
  onClick,
  onDelete,
}) => {
  const formattedReleaseDate = dayjs(releaseDate).format("DD.MM.YYYY");

  const { likedMovies, toggleLike } = useMovies();
  const isLiked = likedMovies.some((movie) => movie.id === id);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    toggleLike(id);
  };

  return (
    <div className={styles.movieItemContainer} id={id}>
      <div className={styles.buttonWrapper}>
        <button className={styles.deleteButton} onClick={onDelete}>
          Delete
        </button>
        <button className={styles.likeButton} onClick={handleLikeClick}>
          {isLiked ? (
            <span role="img" aria-label="liked">
              🤍
            </span>
          ) : (
            <span role="img" aria-label="not-liked" className={styles.notLiked}>
              ♡
            </span>
          )}
        </button>
      </div>

      <RouterLink
        to={`/movies/${id}`}
        onClick={onClick}
        className={styles.movieItemImage}
      >
        <img src={imageSrc} alt={title} className={styles.movieItemImage} />
      </RouterLink>
      <h4 className={styles.movieItemTitle}>{title}</h4>
      <div className={styles.movieItemDetails}>
        <p className={styles.movieItemRelease}>{formattedReleaseDate}</p>
        <p className={styles.movieItemRating}>
          {rating}/10{" "}
          <span role="img" aria-label="star">
            ⭐️
          </span>
        </p>
      </div>
    </div>
  );
};

export default MovieItem;
