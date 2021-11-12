import { useEffect, useState } from "react";
import Movie from "../components/Movies";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper"; //auto swiper chiqarish uchun
import Loader from "./Loader";
import { MY_API_KEY } from "../global";
import { Link } from "react-router-dom";

// const TRENDING_MOVIES_API = `https://api.themoviedb.org/3/trending/all/day?api_key=${MY_API_KEY}`;
// const POPULAR_MOVIES_API = `https://api.themoviedb.org/3/movie/popular?api_key=${MY_API_KEY}`;
// const UPCOMING_MOVIES_API = `https://api.themoviedb.org/3/movie/upcoming?api_key=${MY_API_KEY}`;
// const TOP_MOVIES_API = `https://api.themoviedb.org/3/movie/top_rated?api_key=${MY_API_KEY}`;

const Movielist = ({ type, title }) => {
 
  SwiperCore.use([Autoplay]); // Auto swiper chiqarish uchun

  const [moviesList, setMoviesList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();


  useEffect(() => {
    setTimeout(() => {
      fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=${MY_API_KEY} `)
        .then((res) => {
          if (!res.ok) {
            throw Error("Serverda ma'lumot olishda xatolik!!");
          }
          return res.json();
        })
        .then((data) => {
          setMoviesList(data.results);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
        });
    }, 2000);
  }, []);

  return (
    <div className="movieContainer">

      <div className="heading-line">
        <h2 className="heading">{title}</h2>
        <Link className="custom-btn btn-3" to="/catalog"><span>All Movies</span></Link>
      </div>

     
        {error ? <h3>{error}</h3> : ""}
        {isLoading ? <Loader /> : ""}

        {!isLoading && !error ?   <Swiper
        modules={[Autoplay]} grabCursor={true} spaceBetween={10}slidesPerView={6}loop
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
         >
        {moviesList.map((el) => (
          <SwiperSlide  key={el.id}>
            <Movie className="movies-wrapper" movieobj={el} />
          </SwiperSlide>
        ))}
      </Swiper> : '' }
   
    </div>
  );
};

export default Movielist;
