import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./App.css";
const base_url = "https://image.tmdb.org/t/p/original/";
function Banner({ fetchUrl }) {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(fetchUrl);
      setMovie(req.data.results[Math.floor(Math.random() * 15)]);
    }
    fetchData();
  }, [fetchUrl]);
  console.log(movie);
  return (
    <div>
      <div>
        <img
          className="poster"
          src={`${base_url}${movie.backdrop_path}`}
          alt={movie.name}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}

export default Banner;
