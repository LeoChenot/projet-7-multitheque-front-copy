import axios from "axios";
import { FETCH_LATEST_BOOKS_RELEASE, saveLatestBooksReleaseResult, setLatestBooksReleaseLoading } from "../actions/homePage";
import { FETCH_BOOKS_DETAILS_BY_ID, saveBookDetailsResult, setBookDetailsLoading } from "../actions/bookDetails";
import { FETCH_IN_ALL_API_BY_TITLE, saveFoundBooksResult, setFoundBooksLoading } from "../actions/searchResults";

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1',
});

const booksApiKey = 'AIzaSyCvJHe09_0657sl8Gop_SsmJ6rMd7Cmov8';
const defaultTimeout = 500;
const timeout = 1500;

const fetchBooksMW = (store) => (next) => async (action) => {
  if (action.type === FETCH_LATEST_BOOKS_RELEASE) {
    try {
      const latestBooksReleaseResult = await instance.get(`/volumes?q=inauthor:J-R-R Tolkien&key=${booksApiKey}&projection=full&langRestrict=en`);
      store.dispatch(saveLatestBooksReleaseResult(latestBooksReleaseResult.data));
      setTimeout(() => {
        store.dispatch(setLatestBooksReleaseLoading(false));
      }, timeout);
    } catch (error) {
      console.log(error);
    }
  }
  else if (action.type === FETCH_IN_ALL_API_BY_TITLE) {
    store.dispatch(setFoundBooksLoading(true));
    try {
      const foundBooksResult = await instance.get(`/volumes?q=${action.title}&key=${booksApiKey}&projection=full&langRestrict=en`);
      store.dispatch(saveFoundBooksResult(foundBooksResult.data));
      setTimeout(() => {
        store.dispatch(setFoundBooksLoading(false));
      }, timeout);
    } catch (error) {
      console.log(error);
    }
  }
  else if (action.type === FETCH_BOOKS_DETAILS_BY_ID) {
    store.dispatch(setBookDetailsLoading(true));
    try {
      const bookDetailsResult = await instance.get(`/volumes/${action.bookId}`);
      
      store.dispatch(saveBookDetailsResult(bookDetailsResult.data));
      setTimeout(() => {
        store.dispatch(setBookDetailsLoading(false));        
      }, defaultTimeout);
    } catch (error) {
      console.log(error);
    }
  }
  next(action);
}

export default fetchBooksMW;