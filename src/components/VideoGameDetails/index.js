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
  const { videoGameDetailsLoading, videoGameDetailsResult } = useSelector((state) => state.videoGameDetails);
  const videoGameId = useParams().mediaId;
  const [inLibrary, setInLibrary] = useState(false);
  const { auth } = useSelector((state) => state.user);
  let baseURL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    dispatch(fetchVideoGameDetailsById(videoGameId));
  }, []);

  async function PostReview(list, title, coverURL) {
    console.log('post')
      try {
        console.log(list)
        console.log(title)
        const response = await axios.post(`https://collectio-app.herokuapp.com/api/video-games/${videoGameId}`, {
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
      } catch (error) {
        console.log(error)
      }

  }

  


  async function PatchReview(list) {

    console.log('patch')
     try {

       const response = await axios.patch(`https://collectio-app.herokuapp.com/api/video-games/${videoGameId}`, {
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
        <div className="collectioRatingContainer">
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>

          </div> 
          <div className="userRatingContainer">
            <span className="fa fa-star"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
          </div>

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
          {auth && (
            <div>

      
            <div className='mediaUserReview'>
             
                <button type="button" class="button -review">
                <span className="button__text">Rating</span>              
                <span className="button__icon">
                <ion-icon name="star"></ion-icon>
                </span>
                </button>
           
                  
        
          
                <button type="button" class="button -review">
                <span className="button__text">Review</span>              
                <span className="button__icon">
                <ion-icon name="reader"></ion-icon>
                <ion-icon name="pencil"></ion-icon>        
                </span>
                </button>  
             
              
          </div>
              
          <div className='mediaUserListContainer'>
            { inLibrary?



            // si PAS de token, griser les boutons d'ajout de liste
              <button type="button" className="button--activelist" value='wishlist' onClick={() => PatchReview('wishlist')}>
                <span className="button__text">Wishlist</span>
                <span className="button__icon">
                <ion-icon name="bookmark"></ion-icon></span>
              </button>
            :
                <button type="button" className="button" value='wishlist' onClick={() => PostReview('wishlist', videoGameDetailsResult.videoGameDetailsResult.original_title, `${baseURL}${videoGameDetailsResult.videoGameDetailsResult.poster_path}`)}>
                  <span className="button__text">Wishlist</span>
                  <span className="button__icon">
                  <ion-icon name="bookmark"></ion-icon></span>
                </button>

            }

            { inLibrary?

            // si PAS de token, griser les boutons d'ajout de liste
              <button type="button" className="button--activelist" value='favorites' onClick={() => PatchReview('favorites')}>
                  <span className="button__text">Favorites</span>
                  <span className="button__icon">
                  <ion-icon name="bookmark"></ion-icon></span>
                </button>
            :                    

              <button type="button" className="button" value='favorites' onClick={() => PostReview('favorites', videoGameDetailsResult.videoGameDetailsResult.original_title, videoGameDetailsResult.videoGameDetailsResult.poster_path)}>
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
              <button type="button" className="button" value='check' onClick={() => PostReview('check', videoGameDetailsResult.videoGameDetailsResult.original_title, videoGameDetailsResult.videoGameDetailsResult.poster_path)}>
              <span className="button__text">Add to Library</span>
              <span className="button__icon">
              <ion-icon name="checkmark"></ion-icon>
              </span>
              </button>
            }

            { inLibrary? 

            // si PAS de token, griser les boutons d'ajout de liste
              <button type="button" className="button--activelist" value='in_progress' onClick={() => PatchReview("in progress")}>
              <span className="button__text">In Progress</span>
              <span className="button__icon">
                <ion-icon name="eye"></ion-icon>
              </span>
              </button>
            :
              <button type="button" className="button" value='in_progress' onClick={() => PostReview('in progress', videoGameDetailsResult.videoGameDetailsResult.original_title, videoGameDetailsResult.videoGameDetailsResult.poster_path)}>
              <span className="button__text">In Progress</span>
              <span className="button__icon">
              <ion-icon name="eye"></ion-icon>
              </span>
              </button>
            }
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
