import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSeriesDetailsById } from '../../actions/seriesDetails';
import Loader from '../Loader';
import './style.scss';

function SeriesDetails() {
  const token = localStorage.getItem('token');
  const { seriesDetailsLoading, seriesDetailsResults } = useSelector((state) => state.seriesDetails);
  const seriesId = useParams().mediaId;
  const [inLibrary, setInLibrary] = useState(false);
  const { auth } = useSelector((state) => state.user);
  let baseURL = "https://image.tmdb.org/t/p/original";
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSeriesDetailsById(seriesId));
    GetReview();
  }, []);

  async function GetReview() {
    console.log('get')
      try {

        const response = await axios.get(`https://collectio-app.herokuapp.com/api/series/${seriesId}`,{
          headers: {
            "authorization": token
          },
        })                

        if (response.request.response === `{"message":"This Media is not in user Library yet","avg_rating":[]}`) {

          console.log("no review")

          setInLibrary(false)

      } else {
        setInLibrary(true)
      }  
        
      } catch (error) {
        console.log(error)
      }

  }

  async function DeleteReview() {
    console.log('delete')
      try {

        const response = await axios.delete(`https://collectio-app.herokuapp.com/api/series/${seriesId}`,{
          headers: {
            "authorization": token
          },
        })
        console.log(`Voici la reponse du delete`);     
        console.log(response)
        setInLibrary(false)
      } catch (error) {
        console.log(error)
      }

  }


  async function PostReview(list, title, coverURL) {
    console.log('post')
      try {
        // console.log(list)
        // console.log(title)
        const response = await axios.post(`https://collectio-app.herokuapp.com/api/series/${seriesId}`, {
           "list": list,
           "title": title,
           "coverURL": coverURL
         }, {
          headers: {
            "authorization": token
          },
        })
        console.log(response);
        //setResults(response.data[0].note_moyenne)
        //console.log(results);
        setInLibrary(true)
      } catch (error) {
        console.log(error)
      }

  }

  


  async function PatchReview(list) {

    console.log('patch')
     try {

       const response = await axios.patch(`https://collectio-app.herokuapp.com/api/series/${seriesId}`, {
          "list": list
        }, {
         headers: {
           "authorization": token
         },
       })
       console.log(response);
       //setResults(response.data[0].note_moyenne)
       //console.log(results);
     } catch (error) {
       console.log(error)
     }


  }

  // /**
  //  * ! show seriesDetailsResults in console
  //  */
  // const isInitialMount = useRef(true);
  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   }
  //   else {
  //     console.log('seriesDetailsResults', seriesDetailsResults);
  //   }
  // }, [seriesDetailsResults]);

  return (
    <div className="mediaDetails">
    {seriesDetailsLoading ? (
      <Loader />
    ) : (
      <div className='mediaContainer'>
        <div className="mediaRatingContainer">
          {auth &&<div className="collectioRatingContainer">
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>

          </div>}
          <div className="userRatingContainer">
            <span className="fa fa-star"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
          </div>
          {auth && <div className='mediaUserReview'>
             
                <button type="button" className="button button--review">
                <span className="button__text">Rating</span>              
                <span className="button__icon">
                <ion-icon name="star"></ion-icon>
                </span>
                </button>
           
                  
        
          
                <button type="button" className="button button--review">
                <span className="button__text">Review</span>              
                <span className="button__icon">
                <ion-icon name="reader"></ion-icon>
                <ion-icon name="pencil"></ion-icon>        
                </span>
                </button>
          </div>}

        </div> 


        <div className="mediaImageContainer"> 
          <h1 className="mediaDetails__mediaTitle">{seriesDetailsResults.seriesDetailsResult.original_name}</h1>
          <img src={`https://image.tmdb.org/t/p/original/${seriesDetailsResults.seriesDetailsResult.poster_path}`} alt="" />
          <h4 className="mediaDetails__mediaAirDate">{seriesDetailsResults.seriesDetailsResult.first_air_date.substring(0,4)}-{seriesDetailsResults.seriesDetailsResult.last_air_date.substring(0,4)} </h4>
          <h4 className="mediaDetails__mediaSeasonsAndEpisodes">{seriesDetailsResults.seriesDetailsResult.number_of_seasons} seasons - {seriesDetailsResults.seriesDetailsResult.number_of_episodes} episodes ({seriesDetailsResults.seriesDetailsResult.episode_run_time} minutes)</h4>                    
          <div className='mediaDetails__mediaGenreContainer'>
                {seriesDetailsResults.seriesDetailsResult.genres.map((genre) => (
                <h4 key={genre.id} className="mediaDetails__mediaGenre">{genre.name}</h4>
              ))}
          </div>
        </div>
        
        <div className="mediaTextContainer">

          
        {auth && (
            <div>

              
          <div className='mediaUserListContainer'>
            { inLibrary?



            // si PAS de token, griser les boutons d'ajout de liste
              <button type="button" className="button--activelist" value='wishlist' onClick={() => PatchReview('wishlist')}>
                <span className="button__text">Wishlist</span>
                <span className="button__icon">
                <ion-icon name="bookmark"></ion-icon></span>
              </button>
            :
                <button type="button" className="button" value='wishlist' onClick={() => PostReview('wishlist', seriesDetailsResults.seriesDetailsResult.original_name, `${baseURL}${seriesDetailsResults.seriesDetailsResult.poster_path}`)}>
                  <span className="button__text">Wishlist</span>
                  <span className="button__icon">
                  <ion-icon name="bookmark"></ion-icon></span>
                </button>

            }

            { inLibrary?

            // si PAS de token, griser les boutons d'ajout de liste
              <button type="button" className="button--activelist" value='favorites' onClick={() => PatchReview('favorite')}>
                  <span className="button__text">Favorites</span>
                  <span className="button__icon">
                  <ion-icon name="bookmark"></ion-icon></span>
                </button>
            :                    

              <button type="button" className="button" value='favorites' onClick={() => PostReview('favorite', seriesDetailsResults.seriesDetailsResult.original_name, seriesDetailsResults.seriesDetailsResult.poster_path)}>
              <span className="button__text">Favorites</span>
              <span className="button__icon">
                <ion-icon name="heart"></ion-icon></span>
              </button>
                
            }   

            { inLibrary? 

              <button type="button" className="button--activelist" value='check' onClick={() => PatchReview('check')}>
              <span className="button__text">Add to Library</span>
              <span className="button__icon">
                <ion-icon name="checkmark"></ion-icon>
              </span>
              </button>
            :
              <button type="button" className="button" value='check' onClick={() => PostReview('check', seriesDetailsResults.seriesDetailsResult.original_name, seriesDetailsResults.seriesDetailsResult.poster_path)}>
              <span className="button__text">Add to Library</span>
              <span className="button__icon">
              <ion-icon name="checkmark"></ion-icon>
              </span>
              </button>
            }

            { inLibrary? 

            // si PAS de token, griser les boutons d'ajout de liste
              <button type="button" className="button--activelist" value='in_progress' onClick={() => PatchReview("in_progress")}>
              <span className="button__text">In Progress</span>
              <span className="button__icon">
                <ion-icon name="eye"></ion-icon>
              </span>
              </button>
            :
              <button type="button" className="button" value='in_progress' onClick={() => PostReview('in_progress', seriesDetailsResults.seriesDetailsResult.original_name, seriesDetailsResults.seriesDetailsResult.poster_path)}>
              <span className="button__text">In Progress</span>
              <span className="button__icon">
              <ion-icon name="eye"></ion-icon>
              </span>
              </button>
            }

            { inLibrary?

            <button type="button" className="button button--delete" onClick={() => DeleteReview()}>
                  <span className="button__text">Delete</span>
                  <span className="button__icon">
                  <ion-icon name="trash-outline"></ion-icon></span>
                </button>
              :
                null
              
            }

          </div>
                      
          

          </div>  

        )}
          
          <div className="mediaCrewContainer">   
          <h3 className="mediaDetails__mediaCast">Director{seriesDetailsResults.seriesDetailsCastResult.crew.filter((crew) => crew.known_for_department === "Directing").length > 1 ? 's' : ''}</h3>
          <br />
            <div className='mediaDetails__mediaCrew'> 
            {seriesDetailsResults.seriesDetailsCastResult.crew.filter((crew) => crew.known_for_department === "Directing").slice(0, 5).map((crew) => (
              <h4 key={crew.id} className="mediaDetails__mediaCrew">{crew.name}</h4>
            ))}
              </div> 
        </div>

        <div className="mediaCastContainer">
        <h3 className="mediaDetails__mediaCast">Main cast</h3>
        <br />
        {seriesDetailsResults.seriesDetailsCastResult.cast.slice(0, 5).map((cast) => (
          <div key={cast.id}>
            <h4 className="mediaDetails__mediaCast">{cast.name} ({cast.character})</h4>
                      
          </div>

        ))}
        </div>

        <div className="mediaOverviewContainer">
        <h4 className="mediaDetails__mediaOverview">{seriesDetailsResults.seriesDetailsResult.overview}</h4>

        </div>           
       
      </div>
      </div>
    )}
    </div>
  );
}

export default SeriesDetails;
