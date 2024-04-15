import MoviesList from "../components/movies/MoviesList";
import { useMovies } from "../custom-hooks/useMovies";

const LikedRoute = () => {
  const { likedMovies } = useMovies();

  return (
    <>
      {likedMovies.length > 0 ? (
        <div>
          <MoviesList movies={likedMovies} />
        </div>
      ) : (
        <h3>
          <p>No liked movies yet.</p>
        </h3>
      )}
    </>
  );
};

export default LikedRoute;
