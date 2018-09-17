import React from 'react';
import PokemonSearch from './pages/pokemon-search.js';
import Pokemon from './pages/pokemon.js';
import BerriesSearch from './pages/berries-search.js';
import { createDrawerNavigator } from 'react-navigation';
import { StyleSheet } from 'react-native';
import Expo from "expo";


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
