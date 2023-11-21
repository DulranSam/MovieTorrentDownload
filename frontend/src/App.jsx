import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.get(
          "https://yts.mx/api/v2/list_movies.json"
        );
        setData(response.data.data.movies);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  async function searchMovies(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.get(
        `https://yts.mx/api/v2/list_movies.json?query_term=${search}&limit=${limit}`
      );
      setData(response.data.data.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(true);
    }
  }

  return (
    <div>
      <form onSubmit={searchMovies}>
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Enter Search"
        />
        <input
          onChange={(e) => {
            setLimit(e.target.value);
          }}
          value={limit}
          type="Number"
        />
        <button type="submit">{loading ? "Loading..." : "Search"}</button>
      </form>
      {data.length === 0 ? (
        <p>No results found</p>
      ) : (
        <div>
          {data.map((movie) => (
            <div key={movie.id}>
              <h1>{movie.title}</h1>
              <img src={movie.background_image}></img>
              <img src={movie.large_cover_image}></img>
              <a href={movie.url}>Click here to read more</a>
              <p>{movie.description_full || "No description available"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
