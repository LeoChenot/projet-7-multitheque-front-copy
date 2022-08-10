import Glide from '@glidejs/glide/dist/glide';
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";

import axios from 'axios';
import { useEffect } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function LibraryPage() {
   const dispatch = useDispatch();
   const menuIsOpen = useSelector((state) => state.mainMenu.isOpen);

  //  const resultsData = useSelector((state) => state.searchResults.results);

  //  const resultsDataMovie = useSelector((state) => {
  //   console.log('JE TESTE MON STATE 1 --> ', state.searchResults.resultsMovie.results)
  //   return state.searchResults.resultsMovie.results
  // });

//   const resultsDataTV = useSelector((state) => {
//     console.log('JE TESTE MON STATE 2 --> ', state.searchResults.resultsTV.results)
//     return state.searchResults.resultsTV.results
//   });
//   const resultsDataVideoGames = useSelector((state) => {
//     console.log('JE TESTE MON STATE 3 --> ', state.searchResults.resultsVideoGames.results)
//     return state.searchResults.resultsVideoGames.results
//   });
  // const resultsBestRated = useSelector((state) => {
  //   console.log('JE TESTE MON STATE 3 --> ', state.searchResults.bestRated.results)
  //   return state.searchResults.bestRated.results
  // });




//      console.log("ICI JE SUIS LA EN DEHORS DU USEEFFECT")

//   const inTheater = async () => {
//     try {
//         const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=53d8914dec27b153e9ddc38fedcfb93e&language=en-US&France')
//         console.log("inTheater", response.data);
//         dispatch(saveResultsDataMovie(response.data))
//     } catch (error) {
//         console.log(error);
//     }
// };

//   const TV = async () => {
//     try {
//       const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=53d8914dec27b153e9ddc38fedcfb93e&language=en-US&page=1&France')
//       console.log("TV", response.data);
//       console.log(response.data);
//       dispatch(saveResultsDataTV(response.data))
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const VideoGames = async () => {
//     try {
//       const response = await axios.get('https://api.rawg.io/api/games?key=65da31f76aac4be6aeead35e091febd7&dates=2022-01-01,2022-12-12')
//       console.log("VideoGames", response.data);
//       console.log(response.data);
//       dispatch(saveResultsDataVideoGames(response.data))
//     } catch (error) {
//       console.log(error);
//     }
//   }

  // useEffect(() => {

  //   console.log("1) je suis ici dans le useEffect")

  //   console.log({
  //     "AVANCEE" : "PREMIERE EXECUTION",
  //     resultsDataMovie,
  //   //   resultsDataTV,
  //   //   resultsDataVideoGames
  //   })

  //   // const execFetch = async () => {
  //   //   await inTheater()
  //   // //   await TV()
  //   // //   await VideoGames()
  //   //   console.log({
  //   //     "AVANCEE" : "DEUXIEME EXECUTION",
  //   //     resultsDataMovie,
  //   //     // resultsDataTV,
  //   //     // resultsDataVideoGames
  //   //   })
  //   // }
  //   // execFetch()




  //     const glides = document.querySelectorAll('.glide');
  //     if (glides && glides.length > 0) {
  //       for (let i = 0; i < glides.length; i++) {
  //         const glideElement = new Glide(glides[i], gliderOptions).mount();
  //         // glideElement.update({
  //         //   perView: menuIsOpen ? 7 : 9,
  //         // });
  //         // glidesList[i] = {
  //         //   name: `glide${i + 1}`,
  //         //   glideElement,
  //         // }
  //       }
  //     }
    
  //   // return () => {
  //   //   const glides = document.querySelectorAll('.glide');
  //   //   if (glides && glides.length > 0) {
  //   //     for (let i = 0; i < glides.length; i++) {
  //   //       const glideElement = new Glide(glides[i], gliderOptions).mount();
  //   //       // glideElement.update({
  //   //       //   perView: menuIsOpen ? 7 : 9,
  //   //       // });
  //   //       // glidesList[i] = {
  //   //       //   name: `glide${i + 1}`,
  //   //       //   glideElement,
  //   //       // }
  //   //     }
  //   //   }
  //   // }
  // }, []);

  
  const gliderOptions = {
    type: 'slider',
    startAt: 0,
    bound: true,
    focusAt: 0,
    perView: menuIsOpen ? 7 : 9,
    keyboard: false,
    swipeThreshold: false,
    dragThreshold: false,
    breakpoints: {
      1650: {
        perView: menuIsOpen ? 5 : 7,
      },
      1250: {
        perView: menuIsOpen ? 3 : 5,
      },
      880: {
        perView: menuIsOpen ? 1 : 3,
      },
      590: {
        perView: 1,
      }
    }
  }
  
  // useEffect(() => {
  //   return() => {
  //       console.log(resultsData);
  //   }
  // }, [resultsDataMovie])
  // let glidesList = [];

  // useEffect(() => {
  //   console.log(glidesList);
  //   glidesList.forEach((glide) => {
  //     console.log('perView :', glide.glideElement._o.perView);
  //   });
  // }, [glidesList]);

    return (
        <section>
            <div className='homePage'>
                {/* <div key="Movie">
                    <h2 style={{ fontWeight: 'bold', fontSize: '2em', marginBottom: '1.2em', textAlign: 'center'}}>My Movies</h2>
                    <div className="glide" style={{ transition: 'all 550ms' }}>
                        <div className="glide__track" data-glide-el="track">
                            <ul className="glide__slides">
                            {resultsDataMovie && resultsDataMovie.map((item) => (
                              <li key={item.id} className="glide__slide">
                                <Link to={`/movies/${item.id}`} className="glide__slide-link">
                                  <img className="glide__slide-link-image" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
                                  <span className="glide__slide-link-title">{item.title}</span>
                                </Link>
                              </li>
                            ))}
                            </ul>
                            <div className="glide__arrows" data-glide-el="controls">
                                <button className="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                                <button className="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <div className='main_soon'>
                <div key="main_soon">
                    <h2 style={{ fontWeight: 'bold', fontSize: '2em', marginBottom: '1.2em' }}>Top Rated</h2>
                    <div className="glide" style={{ transition: 'all 550ms' }}>
                        <div className="glide__track" data-glide-el="track">
                        <ul className="glide__slides">
                        {resultsBestRated?.length > 0 && resultsBestRated.map((item) => (
                            <li key={item.title} className="glide__slide">
                                <img className="glide__slide-image" src={item.coverurl} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                            ))}
                        </ul>
                        <div className="glide__arrows" data-glide-el="controls">
                            <button className="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                            <button className="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
                        </div>
                        </div>
                    </div>
                    </div>
                // </div> */}
                <div className='main_top'>

                </div>
            </div>
        </section>
    )
}

export default LibraryPage