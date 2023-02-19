import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchVideoGameDetailsById } from '../../actions/videoGameDetails';
import Loader from '../Loader';
import './style.scss';

function VideoGameDetails() {
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const { videoGameDetailsLoading, videoGameDetailsResult } = useSelector((state) => state.videoGameDetails);
  const videoGameId = useParams().mediaId;
  const [inLibrary, setInLibrary] = useState(false);
  const [reviewDetails, setReviewDetails] = useState({});
  const [libraryList, setLibraryList] = useState('');
  const { auth } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchVideoGameDetailsById(videoGameId));
  }, [userId]);
  useEffect(() => {
    GetReview();      
  }, [libraryList, inLibrary]);

  async function GetReview() {
      try {
        const response = await axios.get(`https://collectio-copy.glitch.me/api/video_game/${videoGameId}`,{
          headers: {
            "authorization": token
          },
        });            
        if (response.request.response === `{"message":"This Media is not in user Library yet","avg_rating":[]}`) {
          setInLibrary(false);
        } else {
          setInLibrary(true);
          setLibraryList(response.data.user_review_details[0].listname);
        }
      } catch (error) {
        console.log(error);
      }
  };

  async function DeleteReview() {
    try {
      await axios.delete(`https://collectio-copy.glitch.me/api/video_game/${videoGameId}`,{
        headers: {
          "authorization": token
        },
      });
      setInLibrary(false);
    } catch (error) {
      console.log(error);
    }
  };

  async function PostReview(list, title, coverURL) {
    try {
      await axios.post(`https://collectio-copy.glitch.me/api/video_game/${videoGameId}`, {
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
      await axios.patch(`https://collectio-copy.glitch.me/api/video_game/${videoGameId}`, {
          "list": list
        }, {
         headers: {
           "authorization": token
         },
       });
       setLibraryList(list);
     } catch (error) {
       console.log(error)
     }
  }

  // /**
  //  * ! show videoGameDetailsResult in console
  //  */
  // const isInitialMount = useRef(true);
  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   }
  //   else {
  //     console.log('videoGameDetailsResult', videoGameDetailsResult);
  //   }
  // }, [videoGameDetailsResult]);

  return (
    <div className="mediaDetails">
    {videoGameDetailsLoading ? (
      <Loader />
    ) : (
    <div className="mediaContainer">
      <div className="mediaRatingContainer">
          {auth && <div className="collectioRatingContainer">
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>       
          </div>}
          <div className='userRatingContainer'>  
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
            <h1 className="mediaDetails__mediaTitle">{videoGameDetailsResult.name_original}</h1>
            <img src={videoGameDetailsResult.background_image} alt="" />
            <h2 className="mediaDetails__mediaReleaseYear">({videoGameDetailsResult.released.substring(0,4)})</h2>
            <div className='mediaDetails__mediaGenreContainer'>
            {videoGameDetailsResult.genres.map((genre) => (
              <h4 className="mediaDetails__mediaGenre" key={genre.id}>{genre.name}</h4>
              ))}            
             </div>

             <div className="mediaCastContainer">       

                <h4 className="mediaDetails__mediaCast"></h4>        
            
                {videoGameDetailsResult.publishers.map((publisher) => (
                  <p key={publisher.id}>{publisher.name}</p>
                  ))}
              </div>
            {/* <h3>Playtime: {videoGameDetailsResult.playtime} hours</h3> */}

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
              <button type="button" className="button" value='wishlist' onClick={() => PostReview('wishlist', videoGameDetailsResult.name_original, videoGameDetailsResult.background_image)}>
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
              <button type="button" className="button" value='favorite' onClick={() => PostReview('favorite', videoGameDetailsResult.name_original, videoGameDetailsResult.background_image)}>
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
              <button type="button" className="button" value='check' onClick={() => PostReview('check', videoGameDetailsResult.name_original, videoGameDetailsResult.background_image)}>
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
              <button type="button" className="button" value='in_progress' onClick={() => PostReview('in_progress', videoGameDetailsResult.name_original, videoGameDetailsResult.background_image)}>
                <span className="button__text">In Progress</span>
                <span className="button__icon">
                <ion-icon name="eye"></ion-icon>
                </span>
              </button>}
          </div>
                      
          

          </div>  

        )}
          <div className="mediaOverviewContainer">
            <h4 className="mediaDetails__mediaOverview">{videoGameDetailsResult.description_raw}</h4>           
          </div>
        </div>

          {/* <br />
          <br />
          <h3 className="mediaDetails__mediaCast">Director{videoGameResult.cast.crew.filter((crew) => crew.department === "Directing").length > 1 ? 's' : ''}</h3>
          <br />
          {videoGameResult.cast.crew.filter((crew) => crew.department === "Directing").slice(0, 5).map((crew) => (
            <h4 key={crew.id} className="mediaDetails__mediaGenre">{crew.name}</h4>
          ))}

          <br />
          <br />
          <h3 className="mediaDetails__mediaCast">Main cast</h3>
          <br />
          {videoGameResult.cast.cast.slice(0, 5).map((cast) => (
            <div key={cast.id}>
              <h4 className="mediaDetails__mediaGenre">{cast.name}</h4>
              <span>{cast.character}</span>
              <br />
              <br />
            </div>
          ))}

          <br />
          <br />
          <h3 className="mediaDetails__mediaOverview">Overview</h3>
          <br />
          <p className="mediaDetails__mediaOverview">{videoGameResult.movie.overview}</p>

          <br />
          <br />
          <h3 className="mediaDetails__mediaOverview">Genres</h3>
          <br />
          {videoGameResult.movie.genres.map((genre) => (
            <h4 key={genre.id} className="mediaDetails__mediaGenre">{genre.name}</h4>
          ))} */}
      </div>
    )}
    </div>
  );
}

export default VideoGameDetails;
