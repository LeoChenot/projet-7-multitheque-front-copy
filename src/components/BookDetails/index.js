import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBookDetailsById } from '../../actions/bookDetails';
import Loader from '../Loader';
import './style.scss';

function BookDetails() {
  const dispatch = useDispatch();
  
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const { bookDetailsLoading, bookDetailsResult } = useSelector((state) => state.bookDetails);
  const bookId = useParams().mediaId;
  const [inLibrary, setInLibrary] = useState(false);
  const [reviewDetails, setReviewDetails] = useState({});
  const [libraryList, setLibraryList] = useState('');
  const { auth } = useSelector((state) => state.user);
  
  useEffect(() => {
    dispatch(fetchBookDetailsById(bookId));
  }, [userId]);
  useEffect(() => {    
    GetReview();      
  }, [libraryList, inLibrary]);

  async function GetReview() {
    console.log('get')
      try {
        const response = await axios.get(`https://collectio-app.herokuapp.com/api/book/${bookId}`,{
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
      const response = await axios.delete(`https://collectio-app.herokuapp.com/api/book/${bookId}`,{
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
    console.log('post')
      try {
        console.log(list)
        console.log(title)
        console.log(coverURL);
        const response = await axios.post(`https://collectio-app.herokuapp.com/api/book/${bookId}`, {
           "list": list,
           "title": title,
           "coverURL": coverURL
         }, {
          headers: {
            "authorization": token
          },
        })
        setInLibrary(true);
        setLibraryList(list);
      } catch (error) {
        console.log(error)
      }

  }

  async function PatchReview(list) {

    console.log('patch')
     try {

       const response = await axios.patch(`https://collectio-app.herokuapp.com/api/book/${bookId}`, {
          "list": list
        }, {
         headers: {
           "authorization": token
         },
       })
       setLibraryList(list);
     } catch (error) {
       console.log(error)
     }


  }

  
  
  // /**
  //  * ! show bookDetailsResult in console
  //  */
  // const isInitialMount = useRef(true);
  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   }
  //   else {
  //     console.log('bookDetailsResult', bookDetailsResult);
  //   }
  // }, [bookDetailsResult]);


  return (
    <div className="mediaDetails">
    {bookDetailsLoading ? (
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
            <h1 className="mediaDetails__mediaTitle">{bookDetailsResult.volumeInfo.title}</h1>
          
          {typeof bookDetailsResult.volumeInfo.imageLinks !== 'undefined' && (
          <img src={bookDetailsResult.volumeInfo.imageLinks.thumbnail} alt="" />         
          )}
          {typeof bookDetailsResult.volumeInfo.publishedDate !== "undefined" && (
            <h2 className="mediaDetails__mediaReleaseYear">({bookDetailsResult.volumeInfo.publishedDate.substring(0,4)})</h2>
          )}
            <h2 className="mediaDetails__mediaRunTime">{bookDetailsResult.volumeInfo.pageCount} pages</h2>
            <div className='mediaDetails__mediaGenreContainer'>
              <h4 className="mediaDetails__mediaGenre">{bookDetailsResult.volumeInfo.categories}</h4>
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
              <button type="button" className="button" value='wishlist' onClick={() => PostReview('wishlist', bookDetailsResult.volumeInfo.title, bookDetailsResult.volumeInfo.imageLinks.thumbnail)}>
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
              <button type="button" className="button" value='favorite' onClick={() => PostReview('favorite', bookDetailsResult.volumeInfo.title, bookDetailsResult.volumeInfo.imageLinks.thumbnail)}>
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
              <button type="button" className="button" value='check' onClick={() => PostReview('check', bookDetailsResult.volumeInfo.title, bookDetailsResult.volumeInfo.imageLinks.thumbnail)}>
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
              <button type="button" className="button" value='in_progress' onClick={() => PostReview('in_progress', bookDetailsResult.volumeInfo.title, bookDetailsResult.volumeInfo.imageLinks.thumbnail)}>
                <span className="button__text">In Progress</span>
                <span className="button__icon">
                <ion-icon name="eye"></ion-icon>
                </span>
              </button>}
            </div>
          </div>
            )}

            <div className="mediaCrewContainer">
                <h3 className="mediaDetails__mediaCrew">Author{bookDetailsResult.volumeInfo.authors.length > 1 ? 's' : ''}</h3>
                <br />
                <div className='mediaDetails__mediaCrew'>
                  {bookDetailsResult.volumeInfo.authors.map((author) => (
                    <h4 key={author.id} className="mediaDetails__mediaCrew">{author}</h4>
                  ))}                
                  
                </div>
                
            </div>

            <div className="mediaCastContainer">
              <h3 className="mediaDetails__mediaCast">Publisher</h3>
              <br />
              <h4 className="mediaDetails__mediaCast">{bookDetailsResult.volumeInfo.publisher}</h4>
            </div>  


        <div className="mediaOverviewContainer">        
          <h4 className="mediaDetails__mediaOverview" dangerouslySetInnerHTML={{__html: bookDetailsResult.volumeInfo.description}} />
        </div>
        
        </div>
      </div>
    )}
    </div>
  );
}

export default BookDetails;
