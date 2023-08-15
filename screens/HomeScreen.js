import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import { styles } from '../theme';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviesDB';

const ios = Platform.OS === 'ios';

const HomeScreen = () => {

    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        // console.log('got trending:', data);
        if(data && data.results) setTrending(data.results);
        setLoading(false);
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        // console.log('got upcoming:', data);
        if(data && data.results) setUpcoming(data.results);
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        // console.log('got TopRated:', data);
        if(data && data.results) setTopRated(data.results);
    }

    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    },[])

    return (
        <View className= "flex-1 bg-neutral-800">
            <SafeAreaView className={ios? "-mb-2": "mb-3"}>
                <StatusBar style='light'/>
                <View className= "flex-row justify-between mx-4 items-center">
                    <Bars3CenterLeftIcon  size="30" strokeWidth={2} color="white"/>
                    <Text className= "text-white text-3xl font-bold">
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {loading?(
                <Loading />
            ):(
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom:10}}
                >
                    {/* Trending Moving Carousel */}
                    {trending.length>0 && <TrendingMovies data={trending}/>}
                    {/* Upcoming Movies */}
                    <MovieList title= "Upcoming" data= {upcoming}/>
                    {/* Top Rated Movies */}
                    <MovieList title= "Top Rated" data= {topRated}/>
                </ScrollView>
            )}
            
        </View>
    )
}

export default HomeScreen;