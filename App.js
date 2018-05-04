import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import MovieList from './src/MovieList';
import MovieDetail from './src/MovieDetail';


class App extends Component {
  render() {
    return <RootStack />;
  }
}


const RootStack = StackNavigator(
  {
    MovieList: {
      screen: MovieList,
    },
    MovieDetail: {
      screen: MovieDetail,
    },
  },
  {
    initialRouteName: 'MovieList',
  },
);

export default App;
