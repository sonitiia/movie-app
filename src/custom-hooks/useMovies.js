import { useContext } from "react";
import { MoviesContext } from "../contexts/MoviesContext";

export const useMovies = () => useContext(MoviesContext);
