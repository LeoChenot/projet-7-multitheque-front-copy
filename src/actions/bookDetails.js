export const FETCH_BOOKS_DETAILS_BY_ID = 'FETCH_BOOKS_DETAILS_BY_ID';
export const SET_BOOK_DETAILS_LOADING = 'SET_BOOK_DETAILS_LOADING';
export const SAVE_BOOK_DETAILS_RESULT = 'SAVE_BOOK_DETAILS_RESULT';

export const fetchBookDetailsById = (bookId) => ({
  type: FETCH_BOOKS_DETAILS_BY_ID,
  bookId,
});

export const setBookDetailsLoading = (newBookDetailsLoading) => ({
  type: SET_BOOK_DETAILS_LOADING,
  newBookDetailsLoading,
});

export const saveBookDetailsResult = (newBookDetailsResult) => ({
  type: SAVE_BOOK_DETAILS_RESULT,
  newBookDetailsResult,
});