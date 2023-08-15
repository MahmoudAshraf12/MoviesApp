import React from 'react'
import { View, Text, Dimensions,TouchableWithoutFeedback, Image } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'
import { image500 } from '../api/moviesDB'


var {width, height} = Dimensions.get('window');

const TrendingMovies = ({data}) => {
    const navigation = useNavigation();
    
    const handleClick = item =>{
        navigation.navigate('Movie', item);
    }

    return (
        <View className= "mb-8">
            <Text className= "text-white mx-4 text-xl mb-5">Trending</Text>
            <Carousel
            data={data}
            renderItem={({item})=> <MovieCard handleClick={handleClick} item={item} />}
            firstItem={1}
            // loop={true}
            // inactiveSlideScale={0.86}
            inactiveSlideOpacity={0.60}
            sliderWidth={width}
            itemWidth={width*0.62}
            slideStyle={{display: 'flex', alignItems: 'center'}}
        />
        </View>
    )
}

export default TrendingMovies;

const MovieCard = ({item, handleClick})=>{

    return (
        <TouchableWithoutFeedback onPress={()=> handleClick(item)}>
            <Image 
                // source={require('../assets/images/moviePoster1.png')} 
                source={{uri: image500(item.poster_path)}} 
                style={{
                    width: width * 0.6,
                    height: height * 0.4
                }}
                className="rounded-3xl" 
            />
        </TouchableWithoutFeedback>
    )
}