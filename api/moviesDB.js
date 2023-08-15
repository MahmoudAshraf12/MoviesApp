import axios from "axios";
import { apiKey } from "../constants";


const baseUrl = 'https://api.themoviedb.org/3'
const trendingMovieEndPoint = `${baseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMovieEndPoint = `${baseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMovieEndPoint = `${baseUrl}/movie/top_rated?api_key=${apiKey}`
const searchMoviesEndpoint = `${baseUrl}/search/movie?api_key=${apiKey}`;


export const image500 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w500'+posterPath : null;
export const image342 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w342'+posterPath : null;
export const image185 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w185'+posterPath : null;

export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

// movie
const movieDetailsEndpoint = id=> `${baseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id=> `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id=> `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`;

// person
const personDetailsEndpoint = id=> `${baseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = id=> `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`



const apiCall = async (endpoint, params)=>{
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params: {}
    };

    try{
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.log('error: ',error);
        return {};
    }
}

// home screen apis
export const fetchTrendingMovies = ()=>{
    return apiCall(trendingMovieEndPoint);
}
export const fetchUpcomingMovies = ()=>{
    return apiCall(upcomingMovieEndPoint);
}
export const fetchTopRatedMovies = ()=>{
    return apiCall(topRatedMovieEndPoint);
}
export const fetchMovieDetails = (id)=>{
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = (movieId)=>{
    return apiCall(movieCreditsEndpoint(movieId));
}
export const fetchSimilarMovies = (movieId)=>{
    return apiCall(similarMoviesEndpoint(movieId));
}

// person screen apis
export const fetchPersonDetails = (personId)=>{
    return apiCall(personDetailsEndpoint(personId));
}
export const fetchPersonMovies = (personId)=>{
    return apiCall(personMoviesEndpoint(personId));
}

// search screen apis
export const searchMovies = (params)=>{
    return apiCall(searchMoviesEndpoint, params);
} 