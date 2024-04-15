import MoviesList from "../components/movies/MoviesList";
import Loader from "../components/Loader";
import { useMovies } from "../custom-hooks/useMovies";

const HomeRoute = () => {
  const { movies, isLoading } = useMovies();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <MoviesList movies={movies} />
        </div>
      )}
    </>
  );
};

export default HomeRoute;
