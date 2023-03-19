import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoviesList from './src/MoviesList';
import MovieDetails from './src/MovieDetails';

const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Procurador de Filmes" component={MoviesList} />
        <Stack.Screen name="Umas infos do filme" component={MovieDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}