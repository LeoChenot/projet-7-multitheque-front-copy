export const FETCH_IN_ALL_API_BY_TITLE = 'FETCH_IN_ALL_API_BY_TITLE';

export const fetchInAllApiByTitle = (title) => ({
    type: FETCH_IN_ALL_API_BY_TITLE,
    title,
});


export const SAVE_FOUND_MOVIES_RESULT = 'SAVE_FOUND_MOVIES_RESULT';
export const SAVE_FOUND_SERIES_RESULT = 'SAVE_FOUND_SERIES_RESULT';
export const SAVE_FOUND_BOOKS_RESULT = 'SAVE_FOUND_BOOKS_RESULT';
export const SAVE_FOUND_VIDEO_GAMES_RESULT = 'SAVE_FOUND_VIDEO_GAMES_RESULT';

export const saveFoundMoviesResult = (newFoundMoviesResult) => ({
    type: SAVE_FOUND_MOVIES_RESULT,
    newFoundMoviesResult,
});

export const saveFoundSeriesResult = (newFoundSeriesResult) => ({
    type: SAVE_FOUND_SERIES_RESULT,
    newFoundSeriesResult,
});

export const saveFoundBooksResult = (newFoundBooksResult) => ({
    type: SAVE_FOUND_BOOKS_RESULT,
    newFoundBooksResult,
});

export const saveFoundVideoGamesResult = (newFoundVideoGamesResult) => ({
    type: SAVE_FOUND_VIDEO_GAMES_RESULT,
    newFoundVideoGamesResult,
});


export const SET_FOUND_MOVIES_LOADING = 'SET_FOUND_MOVIES_LOADING';
export const SET_FOUND_SERIES_LOADING = 'SET_FOUND_SERIES_LOADING';
export const SET_FOUND_BOOKS_LOADING = 'SET_FOUND_BOOKS_LOADING';
export const SET_FOUND_VIDEO_GAMES_LOADING = 'SET_FOUND_VIDEO_GAMES_LOADING';

export const setFoundMoviesLoading = (newFoundMoviesLoading) => ({
    type: SET_FOUND_MOVIES_LOADING,
    newFoundMoviesLoading,
});

export const setFoundSeriesLoading = (newFoundSeriesLoading) => ({
    type: SET_FOUND_SERIES_LOADING,
    newFoundSeriesLoading,
});

export const setFoundBooksLoading = (newFoundBooksLoading) => ({
    type: SET_FOUND_BOOKS_LOADING,
    newFoundBooksLoading,
});

export const setFoundVideoGamesLoading = (newFoundVideoGamesLoading) => ({
    type: SET_FOUND_VIDEO_GAMES_LOADING,
    newFoundVideoGamesLoading,
});
