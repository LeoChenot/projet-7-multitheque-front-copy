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
  const { bookDetailsLoading, bookDetailsResult } = useSelector((state) => state.bookDetails);
  const bookId = useParams().mediaId;
  const [inLibrary, setInLibrary] = useState(false);
  const { auth } = useSelector((state) => state.user);
  let baseURL = "https://image.tmdb.org/t/p/original";
  
  useEffect(() => {
    dispatch(fetchBookDetailsById(bookId));
  }, []);

  

  async function PostReview(list, title, coverURL) {
    console.log('post')
      try {
        console.log(list)
        console.log(title)
        const response = await axios.post(`https://collectio-app.herokuapp.com/api/books/${bookId}`, {
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

       const response = await axios.patch(`https://collectio-app.herokuapp.com/api/books/${bookId}`, {
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
            <h1 className="mediaDetails__mediaTitle">{bookDetailsResult.volumeInfo.title}</h1>
          
          {typeof bookDetailsResult.volumeInfo.imageLinks !== 'undefined' && (
          <img src={bookDetailsResult.volumeInfo.imageLinks.thumbnail} alt="" />         
          )}
           
            <h2 className="mediaDetails__mediaReleaseYear">({bookDetailsResult.volumeInfo.publishedDate.substring(0,4)})</h2>
            <h2 className="mediaDetails__mediaRunTime">{bookDetailsResult.volumeInfo.pageCount} pages</h2>
            <div className='mediaDetails__mediaGenreContainer'>
              <h4 className="mediaDetails__mediaGenre">{bookDetailsResult.volumeInfo.categories}</h4>
          </div>                       
          <div className="mediaTextContainer"> 
            
           <div className="mediaCrewContainer">
            {typeof bookDetailsResult.volumeInfo.authors !== 'undefined' && (
              <div>
                <h3 className="mediaDetails__mediaCrew">Author{bookDetailsResult.volumeInfo.authors.length > 1 ? 's' : ''}</h3>
                <br />
                {bookDetailsResult.volumeInfo.authors.map((author) => (
                  <h4 key={author} className="mediaDetails__mediaTitle">{author}</h4>
                ))}                
                
              </div>              
              
            )}
              </div>                   
                                     
            <h2 className="mediaDetails__mediaTitle">Publisher : {bookDetailsResult.volumeInfo.publisher}</h2>
           
            </div>
            
            <div className="mediaOverviewContainer">        
              <h4 className="mediaDetails__mediaCast" dangerouslySetInnerHTML={{__html: bookDetailsResult.volumeInfo.description}} />
            </div>

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
                  <button type="button" className="button" value='wishlist' onClick={() => PostReview('wishlist', bookDetailsResult.bookDetailsResult.original_title, `${baseURL}${bookDetailsResult.bookDetailsResult.poster_path}`)}>
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

                <button type="button" className="button" value='favorites' onClick={() => PostReview('favorite', bookDetailsResult.bookDetailsResult.original_title, bookDetailsResult.bookDetailsResult.poster_path)}>
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
                <button type="button" className="button" value='check' onClick={() => PostReview('check', bookDetailsResult.bookDetailsResult.original_title, bookDetailsResult.bookDetailsResult.poster_path)}>
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
                <button type="button" className="button" value='in_progress' onClick={() => PostReview('in_progress', bookDetailsResult.bookDetailsResult.original_title, bookDetailsResult.bookDetailsResult.poster_path)}>
                <span className="button__text">In Progress</span>
                <span className="button__icon">
                <ion-icon name="eye"></ion-icon>
                </span>
                </button>
              }
            </div>
                        
            

            </div>  

          )}
                                 
           
               </div>
  
        
      </div>
    )}
    </div>
  );
}

export default BookDetails;
