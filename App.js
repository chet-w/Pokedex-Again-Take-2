import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { StyleSheet } from 'react-native';
import Expo from "expo";

import PokemonSearch from './pages/pokemon-search.js';
import Pokemon from './pages/pokemon.js';
import BerriesSearch from './pages/berries-search.js';
import Berry from './pages/berry.js';
import MachinesSearch from './pages/machines-search.js';
import Machine from './pages/machine.js';
import Games from './pages/games.js';






const Drawer = createDrawerNavigator({
  Pokemon: {
    screen: PokemonSearch
  },
  PokemonPage: {
    screen: Pokemon
  },
  Berries: {
    screen: BerriesSearch
  },
  BerriesPage : {
    screen: Berry
  },
  Machines: {
    screen: MachinesSearch
  },
  MachinePage: {
    screen: Machine
  },
  Games: {
    screen: Games
  }
})

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }

  render() {
    if(this.state.loading){
      return <Expo.AppLoading />
    }
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
