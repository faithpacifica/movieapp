import React from "react";
import "./ShowTrailer.css";
import { useState, useEffect } from "react";
import apiCalls from "../../config/Api";
import Loader from "../Loader";

const ShowTrailer = (props) => {
  const [trailer, setTrailer] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const data = await apiCalls.getVideos(props.id);
        console.log(data);
        setTrailer(data.results[0]);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    getVideos();
  }, [props.id]);

  return (
    <>
      {error ? <p className="error-message">{error}</p> : ""}
      {isLoading ? <Loader /> : ""}
      {!isLoading && !error ? (
        <div className="show-trailer">
          <a
            className="no_click play_trailer"
            href={`https://www.youtube.com/watch?v=${trailer.key}`}
            target="_blank"
            data-site="YouTube"
            data-id=""
            data-title="Play trailer"
          >
            <i className="fas fa-play"></i>
            Play trailer
          </a>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ShowTrailer;
