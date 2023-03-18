import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput, Button } from 'react-native';

export default function App() {

  const [movies, setMovies] = useState(true)
  const [query, setQuery] = useState("");

  const getMovies = async () => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=41cf651b&s=${query}`)
      const json = await response.json()
      console.log(json.Search)
      setMovies(json)
    } catch (error) {
      console.error(error)
    } finally {
      // go loading to false
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
        keyExtractor={() => movies.imdbID}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              style={styles.image}
              source={{ uri: item.Poster }}
            />
            <Text>
              {item.Title}
            </Text>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
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
    marginTop: 20,
    height: 100,
  }
});
