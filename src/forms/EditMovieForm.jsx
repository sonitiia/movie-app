import { useState, useEffect } from "react";
import { useMovies } from "../custom-hooks/useMovies";
import styles from "./EditMovieForm.module.css";
import Modal from "../components/Modal";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const EditMovieForm = ({ onClose }) => {
  const { id } = useParams();

  const { editMovie, getMovieData } = useMovies();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    actors: "",
    director: "",
    genre: "",
    image: "",
    rating: "",
    releaseDate: "",
  });

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieData = await getMovieData(id);
        if (movieData) {
          const {
            title,
            description,
            actors,
            director,
            genre,
            image,
            rating,
            releaseDate,
          } = movieData;

          const formattedReleaseDate = dayjs(releaseDate).format("YYYY-MM-DD");

          setFormData({
            title: title || "",
            description: description || "",
            actors: actors || "",
            director: director || "",
            genre: genre || "",
            image: image || "",
            rating: rating || "",
            releaseDate: formattedReleaseDate || "",
          });
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [getMovieData, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMovieData = {
      ...formData,
    };
    try {
      await editMovie(id, updatedMovieData);
      onClose();
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <Modal>
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.formTitle}>Edit Movie</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.wrapper}>
            <div className={styles.wrapperColumn}>
              <div className={styles.inputWrapper}>
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label>Actors</label>
                <input
                  type="text"
                  name="actors"
                  value={formData.actors}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label>Director</label>
                <input
                  type="text"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.wrapperColumn}>
              <div className={styles.inputWrapper}>
                <label>Genre</label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label>Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label>Rating</label>
                <input
                  type="number"
                  name="rating"
                  min="0"
                  max="10"
                  value={formData.rating}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label>Release Date</label>
                <input
                  type="date"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditMovieForm;
