import API_URL from "../api/apiUrl";

class MovieService {
  async getMovies() {
    try {
      const response = await fetch(API_URL + "movies");
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  }

  async getMovie(movieId) {
    try {
      const response = await fetch(API_URL + `movies/${movieId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movie");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching movie:", error);
      return [];
    }
  }

  async addMovie(newMovie) {
    try {
      const response = await fetch(API_URL + "movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      });
      if (!response.ok) {
        throw new Error("Failed to add movie");
      }
      return response.json();
    } catch (error) {
      console.error("Error adding movie:", error);
      return [];
    }
  }

  async editMovie(movie) {
    try {
      const response = await fetch(API_URL + `movies/${movie.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });
      if (!response.ok) {
        throw new Error("Failed to save edited movie");
      }
      return response.json();
    } catch (error) {
      console.error("Error saving edited movie:", error);
      return [];
    }
  }

  async deleteMovie(movieId) {
    try {
      const response = await fetch(API_URL + `movies/${movieId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete movie");
      }
      return response.json();
    } catch (error) {
      console.error("Error deleting movie:", error);
      return [];
    }
  }
}

const movieService = new MovieService();
export default movieService;
