import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput, Button, TouchableWithoutFeedback } from 'react-native';


const MoviesList = ({ navigation }) => {

    const [movies, setMovies] = useState("")
    const [query, setQuery] = useState("")
    const [page, setPage] = useState(1)

    const getMovies = async () => {
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=41cf651b&s=${query}&page=1`)
            const json = await response.json()
            console.log(json.Search)
            setMovies(json)
        } catch (error) {
            console.error(error)
        } finally {
            // go loading to false
        }
    }

    const getMoreMovies = async () => {
        try {
            setPage(page+1)
            const response = await fetch(`http://www.omdbapi.com/?apikey=41cf651b&s=${query}&page=${page}`)
            const json = await response.json()
            // setMovies(movies+json)
            console.log(movies)
            console.log("fim lista velha")
            console.log(json.Search)
        } catch (error) {
            console.error(error)
        } finally {
            // disable loading
        }
    }

    useEffect(() => {
        // todo 
    }, [])

    return (
        <View style={styles.container}>
            <Text>Buscar por título</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setQuery(text)}
                    value={query}
                />
                <View style={[{ width: "30%", justifyContent: 'center' }]}>
                    <Button
                        onPress={() => getMovies()}
                        title="Buscar"
                        color="#FF3D00"
                    />
                </View>
            </View>

            <Text style={{ marginTop: 8 }}>{movies.totalResults} resultados encontrados

            </Text>
            <FlatList
                style={styles.item}
                data={movies.Search}
                key={movies.imdbID}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={() => {
                        navigation.navigate('Umas infos do filme', { item })
                    }}>

                        <View style={styles.card}>
                            <Image
                                style={styles.image}
                                source={{ uri: item.Poster }}
                            />
                            <Text>
                                {item.Title}
                            </Text>
                        </View>

                    </TouchableWithoutFeedback>
                )}
                onEndReachedThreshold={0.1}
                onEndReached={
                    console.log(`passou aqui na pagina ${page}`)
                }
            />

        </View>
    );
}

export default MoviesList

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
        borderRadius: 10,
        resizeMode: 'contain',
        marginTop: 20,
        height: 300,
    }
});
