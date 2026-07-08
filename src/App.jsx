import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard.jsx";
import { searchMovies } from "./api.js";
import Search from "./search.svg";
import "./App.css";

const DEBOUNCE_MS = 400;

const App = () => {
  const [query, setQuery] = useState("batman");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setMovies([]);
      setLoading(false);
      setError(null);
      return;
    }

    const timer = setTimeout(() => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);

      searchMovies(trimmed, controller.signal)
        .then(setMovies)
        .catch((err) => {
          if (err.name !== "AbortError") {
            setError("Something went wrong. Please try again.");
          }
        })
        .finally(() => setLoading(false));
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="app">
      <h1>Movie Finder</h1>
      <div className="search">
        <input
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <img src={Search} alt="" />
      </div>

      {error && <div className="empty">{error}</div>}

      {!error && loading && <div className="empty">Searching...</div>}

      {!error && !loading && movies.length > 0 && (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}

      {!error && !loading && movies.length === 0 && (
        <div className="empty">No movies found</div>
      )}

      <footer className="footer">
        <p>
          Data provided by{" "}
          <a href="https://www.omdbapi.com/" target="_blank" rel="noreferrer">
            OMDb API
          </a>
        </p>
        <p>
          Built by{" "}
          <a href="https://iamsaumya.com" target="_blank" rel="noreferrer">
            Saumya
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
