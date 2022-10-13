import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (movieSearch) => {
    // const movieSearch = "Harry";
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${movieSearch}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (seriesSearch) => {
    // const seriesSearch = "Friends";
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${seriesSearch}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
    movies: {},
    shows: {},
    selectMovieOrShow: {},
    loading: false
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state) => {
            state.selectMovieOrShow = {};
        },
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: (state) => {
            // console.log("Pending");
            return {...state, loading: true}
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            // console.log("Fetched Successfully!", state.movies);
            // console.log("hdkfka",payload)
            return { ...state, movies: payload, loading: false };
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log("Rejected!");
        },
        [fetchAsyncShows.pending]: () => {
            console.log("Pending shows");
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfully!");
            return { ...state, shows: payload };
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfully!");
            return { ...state, selectMovieOrShow: payload };
        },
    },
});

export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export const loadingMovies = (state) => state.movies.loading;
export const { removeSelectedMovieOrShow } = movieSlice.actions;
export default movieSlice.reducer;