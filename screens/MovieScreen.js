import { View, Text, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackMoviePoster, fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies } from '../api/moviesDB';
import { image500 } from '../api/moviesDB';

const ios = Platform.OS == 'ios';
const topMargin = ios? '':' mt-3';
var {width, height} = Dimensions.get('window');

const MovieScreen = () => {
    const navigation = useNavigation();
    const{params: item} = useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});

    useEffect(() => {
        // console.log('item id: '+item.id);
        setLoading(true);
        getMoviesDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
    },[item])

    const getMoviesDetails = async id => {
        const data = await fetchMovieDetails(id)
        if(data) setMovie(data)
        setLoading(false)
    }

    const getMovieCredits = async id=>{
        const data = await fetchMovieCredits(id);
        // console.log('got movie credits')
        if(data && data.cast){
            setCast(data.cast);
        }
    }

    const getSimilarMovies = async id=>{
        const data = await fetchSimilarMovies(id);
        // console.log('got similar movies');
        if(data && data.results){
            setSimilarMovies(data.results);
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{paddingBottom:20}}
            className= "bg-neutral-900"
        >
            <View className='w-full'>
                <SafeAreaView className= {'absolute z-20 w-full flex-row justify-between items-center px-4'+topMargin}>
                    <TouchableOpacity style={styles.background} className='rounded-xl p-1' onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon strokeWidth={2.5} size='28' color='white'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size='35' color={isFavourite? theme.background : 'white'}/>
                    </TouchableOpacity>
                </SafeAreaView>
                {loading?(
                    <Loading />
                ):(
                    <View>
                    <Image 
                        source={{uri: image500(movie?.poster_path) || fallbackMoviePoster}}
                        style={{width, height: height * 0.60}}
                    />
                    <LinearGradient 
                        colors={['transparent', 'rgba(23,23,23,.8)', 'rgba(23,23,23,1)']}
                        style={{width, height: height*0.40}}
                        className='absolute bottom-0'
                        start={{x:.5, y:0}}
                        end={{x:.5, y:1}}
                    />
                </View>
                )}
                
            </View>
            <View style={{marginTop:-(height*.09)}} className='space-y-3'>
                <Text className='text-white font-bold text-center text-3xl tracking-widest'>
                    {movie?.title}
                </Text>
                {
                    movie?.id?(
                        <Text className= 'text-neutral-400 text-center font-semibold text-base'>
                            {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min
                        </Text>
                ):null
                }
                <View className="flex-row justify-center mx-4 space-x-2">
                    {
                        movie?.genres?.map((genre,index) => {
                            let showDot = index+1 != movie.genres.length;
                            return(
                                <Text key = {index} className="text-neutral-400 font-semibold text-base text-center">
                                    {genre?.name} {showDot?'•':null}
                                </Text>
                            )
                        })
                    }
                </View>
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {movie?.overview}
                </Text>
            </View>
            {cast.length>0 && <Cast cast= {cast} navigation={navigation}/>}
            {/* Similar Movies */}
            {similarMovies.length>0 && <MovieList title='Similar Movies' data= {similarMovies} hideSeeAll= {true}/> }
        </ScrollView>
    )
}

export default MovieScreen;