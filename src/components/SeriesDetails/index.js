import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSeriesDetailsById } from '../../actions/seriesDetails';
import Loader from '../Loader';
import './style.scss';

function SeriesDetails() {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [inLibrary, setInLibrary] = useState(false);
  const [reviewDetails, setReviewDetails] = useState({});
  const [libraryList, setLibraryList] = useState('');
  const { auth } = useSelector((state) => state.user);
  let baseURL = "https://image.tmdb.org/t/p/original";
  const dispatch = useDispatch();
  const { seriesDetailsLoading, seriesDetailsResults } = useSelector((state) => state.seriesDetails);
  const seriesId = useParams().mediaId;
  

  useEffect(() => {
    dispatch(fetchSeriesDetailsById(seriesId));
  }, [userId]);
  useEffect(() => {
    GetReview();    
  }, [libraryList, inLibrary]);

  async function GetReview() {
      try {
        const response = await axios.get(`https://collectio-copy.glitch.me/api/series/${seriesId}`,{
          headers: {
            "authorization": token
          },
        });

        if (response.request.response === `{"message":"This Media is not in user Library yet","avg_rating":[]}`) {
          setInLibrary(false);
        }
        else {
          setInLibrary(true);
          setLibraryList(response.data.user_review_details[0].listname);
        }
      } catch (error) {
        console.log(error);
      }
  }

  async function DeleteReview() {
      try {
        await axios.delete(`https://collectio-copy.glitch.me/api/series/${seriesId}`,{
          headers: {
            "authorization": token
          },
        });
        setInLibrary(false)
      } catch (error) {
        console.log(error);
      }

  }


  async function PostReview(list, title, coverURL) {
      try {
        await axios.post(`https://collectio-copy.glitch.me/api/series/${seriesId}`, {
           "list": list,
           "title": title,
           "coverURL": coverURL
         }, {
          headers: {
            "authorization": token
          },
        });
        setInLibrary(true);
        setLibraryList(list);
      } catch (error) {
        console.log(error);
      }
  }

  async function PatchReview(list) {
     try {
       await axios.patch(`https://collectio-copy.glitch.me/api/series/${seriesId}`, {
          "list": list
        }, {
         headers: {
           "authorization": token
         },
       });
       setLibraryList(list);
     } catch (error) {
       console.log(error);
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
          {seriesDetailsResults.seriesDetailsResult.first_air_date && seriesDetailsResults.seriesDetailsResult.last_air_date && (
            <h4 className="mediaDetails__mediaAirDate">{seriesDetailsResults.seriesDetailsResult.first_air_date.substring(0,4)}-{seriesDetailsResults.seriesDetailsResult.last_air_date.substring(0,4)} </h4>
          )}
          <h4 className="mediaDetails__mediaSeasonsAndEpisodes">{seriesDetailsResults.seriesDetailsResult.number_of_seasons} seasons - {seriesDetailsResults.seriesDetailsResult.number_of_episodes} episodes ({seriesDetailsResults.seriesDetailsResult.episode_run_time} minutes)</h4>                    
          <div className='mediaDetails__mediaGenreContainer'>
                {seriesDetailsResults.seriesDetailsResult.genres.map((genre) => (
                <h4 key={genre.id} className="mediaDetails__mediaGenre">{genre.name}</h4>
              ))}
          </div>
        </div>
        
        <div className="mediaTextContainer">
          <div>
            { inLibrary &&  <div><p>{reviewDetails.note}</p><p>{reviewDetails.comment}</p></div>}
          </div>
          {auth && (
          <div>
            <div className='mediaUserListContainer'>
              {inLibrary &&
              <button type="button" className="button button--delete" onClick={() => DeleteReview()}>
                <span className="button__text">Delete</span>
                <span className="button__icon">
                <ion-icon name="trash-outline"></ion-icon></span>
              </button>}
              { inLibrary?
              <button type="button" className={`button ${libraryList === 'wishlist' ? "button--dark_green" : ""}`} value='wishlist' onClick={() => PatchReview('wishlist')}>
                <span className="button__text">Wishlist</span>
                <span className="button__icon">
                <ion-icon name="bookmark"></ion-icon></span>
              </button>
              :
              <button type="button" className="button" value='wishlist' onClick={() => PostReview('wishlist', seriesDetailsResults.seriesDetailsResult.original_name, `${baseURL}${seriesDetailsResults.seriesDetailsResult.poster_path}`)}>
                <span className="button__text">Wishlist</span>
                <span className="button__icon">
                <ion-icon name="bookmark"></ion-icon></span>
              </button>}
              { inLibrary?
              <button type="button" className={`button ${libraryList === 'favorite' ? "button--dark_green" : ""}`} value='favorite' onClick={() => PatchReview('favorite')}>
                  <span className="button__text">Favorite</span>
                  <span className="button__icon">
                  <ion-icon name="heart"></ion-icon></span>
              </button>
              :                    
              <button type="button" className="button" value='favorite' onClick={() => PostReview('favorite', seriesDetailsResults.seriesDetailsResult.original_name, `${baseURL}${seriesDetailsResults.seriesDetailsResult.poster_path}`)}>
                <span className="button__text">Favorite</span>
                <span className="button__icon">
                  <ion-icon name="heart"></ion-icon></span>
              </button>}
              { inLibrary? 
              <button type="button" className={`button ${libraryList === 'check' ? "button--dark_green" : ""}`} value='check' onClick={() => PatchReview('check')}>
                <span className="button__text">To Library</span>
                <span className="button__icon">
                  <ion-icon name="checkmark"></ion-icon>
                </span>
              </button>
              :
              <button type="button" className="button" value='check' onClick={() => PostReview('check', seriesDetailsResults.seriesDetailsResult.original_name, `${baseURL}${seriesDetailsResults.seriesDetailsResult.poster_path}`)}>
                <span className="button__text">To Library</span>
                <span className="button__icon">
                <ion-icon name="checkmark"></ion-icon>
                </span>
              </button>}
              { inLibrary? 
              <button type="button" className={`button ${libraryList === 'in_progress' ? "button--dark_green" : ""}`} value='in_progress' onClick={() => PatchReview("in_progress")}>
                <span className="button__text">In Progress</span>
                <span className="button__icon">
                  <ion-icon name="eye"></ion-icon>
                </span>
              </button>
              :
              <button type="button" className="button" value='in_progress' onClick={() => PostReview('in_progress', seriesDetailsResults.seriesDetailsResult.original_name, `${baseURL}${seriesDetailsResults.seriesDetailsResult.poster_path}`)}>
                <span className="button__text">In Progress</span>
                <span className="button__icon">
                <ion-icon name="eye"></ion-icon>
                </span>
              </button>}
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
