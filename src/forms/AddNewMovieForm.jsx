import { useState } from "react";
import { useMovies } from "../custom-hooks/useMovies";
import styles from "./AddNewMovieForm.module.css";
import Modal from "../components/Modal";

const AddNewMovieForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [actors, setActors] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const { addMovie } = useMovies();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMovieData = {
      title,
      description,
      actors,
      director,
      genre: [genre],
      image,
      rating,
      releaseDate,
    };

    try {
      await addMovie(newMovieData);

      setTitle("");
      setDescription("");
      setActors("");
      setDirector("");
      setGenre("");
      setImage("");
      setRating("");
      setReleaseDate("");

      onClose();
    } catch (error) {
      console.error("Error adding new movie:", error);
    }
  };

  return (
    <Modal>
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.formTitle}>Add New Movie</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.wrapper}>
            <div className={styles.wrapperColumn}>
              <div className={styles.inputWrapper}>
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label>Actors</label>
                <input
                  type="text"
                  value={actors}
                  onChange={(e) => setActors(e.target.value)}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label>Director</label>
                <input
                  type="text"
                  value={director}
                  onChange={(e) => setDirector(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.wrapperColumn}>
              <div className={styles.inputWrapper}>
                <label>Genre</label>
                <input
                  type="text"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label>Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label>Rating</label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label>Release Date</label>
                <input
                  type="date"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
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

export default AddNewMovieForm;
