import { StyleSheet, Text, View, FlatList, Image, TextInput, Button, ScrollView } from 'react-native';
import { useRoute } from "@react-navigation/native"
import React, { useEffect, useState } from 'react';

const MovieDetails = ({ route, navigation }) => {


    const movie = route.params.item;

    // const movie = navigation.route.params.item
    const [movieDetails, setMovieDetails] = useState(true)

    const getMovieDetail = async () => {
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=41cf651b&i=${movie.imdbID}&plot=full`)
            const json = await response.json()
            console.log(json)
            setMovieDetails(json)
        } catch (error) {
            console.error(error)
        } finally {
            // go loading to false
        }
    }


    useEffect(() => {
        getMovieDetail()
    }, [])


    return (
        <View style={styles.container}>

            <Text>{movie.Title}</Text>
            <Image
                style={styles.image}
                source={{ uri: movie.Poster }}
            />
            <Text>Sinopse: {movieDetails.Plot}</Text>

            <View style={[{ marginTop: 40, justifyContent: 'center' }]}>
                <Button
                    onPress={() => navigation.goBack()}
                    title="Voltar"
                    color="#FF3D00"
                />
            </View>
        </View>
    )
}

export default MovieDetails


const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        width: '70%',
        borderWidth: 1,
    },
    card: {
        padding: 10,
    },
    item: {
        height: 48,
    },
    image: {
        resizeMode: 'contain',
        marginTop: 10,
        height: "50%",
    }
});
