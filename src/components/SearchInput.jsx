import { useRef } from "react";
import styles from "./SearchInput.module.css";
import { useKey } from "../custom-hooks/useKey";
import { useMovies } from "../custom-hooks/useMovies";

const SearchInput = () => {
  const { searchMovies } = useMovies();
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    searchMovies("");
  });

  return (
    <input
      className={styles.searchInput}
      type="text"
      placeholder="Search movies..."
      onChange={(e) => searchMovies(e.target.value)}
      ref={inputEl}
    />
  );
};

export default SearchInput;
