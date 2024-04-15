import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import styles from "./FullWidthLayout.module.css";
import SearchInput from "../components/SearchInput";
import { useState } from "react";
import AddNewMovieForm from "../forms/AddNewMovieForm";

const FullWidthLayout = () => {
  const [isAddingMovie, setIsAddingMovie] = useState(false);

  const openModal = () => {
    setIsAddingMovie(true);
  };

  const closeModal = () => {
    setIsAddingMovie(false);
  };

  return (
    <div className={styles.layoutWrapper}>
      <Header>
        <SearchInput />
        <button onClick={openModal}>Add Movie</button>
        {isAddingMovie && (
          <div>
            <AddNewMovieForm onClose={closeModal} />
          </div>
        )}
      </Header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default FullWidthLayout;
