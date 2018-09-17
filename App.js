import React from 'react';
import PokemonSearch from './pages/pokemon-search.js';
import Pokemon from './pages/pokemon.js';
import BerriesSearch from './pages/berries-search.js';
import { createDrawerNavigator } from 'react-navigation';
import { StyleSheet } from 'react-native';


const Drawer = createDrawerNavigator({
  Pokemon: {
    screen: PokemonSearch
  },
  PokemonPage: {
    screen: Pokemon
  },
  Berries: {
    screen: BerriesSearch
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Drawer />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
