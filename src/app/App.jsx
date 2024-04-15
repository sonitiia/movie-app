import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { MoviesProvider } from "../contexts/MoviesContext";

const App = () => {
  return (
    <MoviesProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </MoviesProvider>
  );
};

export default App;
