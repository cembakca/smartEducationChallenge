import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container, Content } from 'native-base';

import axios from 'axios';

import SearchHeader from './components/SearchHeader';
import MovieColumn from './components/MovieColumn';
import * as Api from './api/Api';


export default class MovieList extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: 'Film Listesi',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      searchMovie: '',
      movieFound: false,
      movieData: {},
    };
  }


  movieSearch = () => {
    const movieTitle = this.state.searchMovie;
    axios({
      method: 'get',
      url: `${Api.TITLE_SEARCH_URL}${movieTitle}${Api.API_KEY}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const data = response.data.Search ? response.data.Search : false;
        if (data) {
          this.setState({
            movieData: data,
            movieFound: true,
          });
        }
      })
      .catch(() => {
        this.setState({
          movieFound: false,
        });
      });
  }
    movieDetail = (item) => {
      this.props.navigation.navigate('MovieDetail', {
        item,
      });
    }

    renderMovie = () => (
      <FlatList
        data={this.state.movieData}
        keyExtractor={item => item.movieID}
        renderItem={({ item, index }) => (
          <MovieColumn
            item={item}
            index={index}
            onPress={this.movieDetail.bind(this, item.imdbID)}
          />
          )}
      />
    )


    render() {
      return (
        <Container>
          <SearchHeader
            value={this.state.searchMovie}
            onChangeText={(searchMovie) => {
              const split = searchMovie.split(' ');
              const join = split.join('');
              this.setState({ searchMovie: join });
              this.movieSearch();
            }}
            movieSearch={this.movieSearch}
          />
          <Content>
            {this.state.movieFound && this.renderMovie()}
          </Content>
        </Container>
      );
    }
}

