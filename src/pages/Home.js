import Intro from "../components/Intro";
import Movielist from "../components/Movielist";
import Slider from "../components/Slider";
import { MY_API_KEY } from "../global";
import { useEffect, useState } from "react";

// const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${MY_API_KEY}&language=en-US&include_adult=false`;

const Home = () => {
    // const [moviesList, setMoviesList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState();
  // useEffect(() => {
  //     fetch(TRENDING_MOVIES_API)
  //         .then(res => res.json())
  //         .then(data => {
  //             setMoviesList(data.results);
  //         });
  // }, []);



//   const handleSearch = (e) => {
//     if (e.target.value.length > 2) {
//       fetch(SEARCH_API + `&query=${e.target.value}`)
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data.results);
//           setMoviesList(data.results); /*TODO: */
//         });
//     }
//   };

  //   const mappedMoviesList = moviesList.map((el) => {
  //     return <Movie className ='movies-wrapper' movieobj={el} key={el.id} />;
  //   });

  // const Loader = () => {
  //   return (
  //     <div className="loader" id="loader-2">
  //       <span></span>
  //       <span></span>
  //       <span></span>
  //     </div>
  //   );
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=${MY_API_KEY} `)
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw Error("Serverda ma'lumot olishda xatolik!!");
  //         }
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setMoviesList(data.results);
          // setIsLoading(false);
          // console.log(data.results);
  //       })
  //       .catch((err) => {
  //         // setIsLoading(false);
  //         setError(err.message);
  //       });
  //   }, 1000);
  // }, []);

  return (
    <div className="wrapper">
      <Intro />

      {/* handleSearch={handleSearch}  */}

      {/* {isLoading && !error ? <Loader /> :} */}

        <div className = 'movieList_wrapper'>
        <Movielist type='upcoming' title ='Upcoming Movies'/>
        < Movielist type='top_rated' title ='Top Movies'/>
        <Movielist type='popular' title ='Popular Movies'/>
        </div>

      
      <Slider /> 

      {/* <div> */}
        {/* {error ? <h3>{error}</h3> : ""}/
        // {isLoading ? <Loader /> : ""} 
        {/* {!isLoading && !error ? mappedMoviesList : ""} */}
      {/* </div> */}
    </div>
  );
};
export default Home;
