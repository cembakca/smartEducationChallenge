import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container, Content, Text } from 'native-base';
import axios from 'axios';

import SearchHeader from './components/SearchHeader';
import MovieColumn from './components/MovieColumn';


export default class MovieList extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: 'Film Listesi',
    };
};

  constructor(props) {
    super(props);
    this.state = { 
      searchMovie: '',
      movieFound: false,
      movieData: {},
      isLoading: false,
      selectedData: {}
    };
  }
 

  movieSearch = () => {
    const movieTitle = this.state.searchMovie;
    const urltitlesearch = `http://www.omdbapi.com/?s=${movieTitle}&apikey=530c3fd2`;
    //const url = 'https://api.themoviedb.org/3/discover/movie?api_key=976bb6979598cfdb112fc4680db79813&sort_by=popularity.desc';
    this.setState({ isLoading: false });
    axios({
      method: 'get',
      url: urltitlesearch,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      const data = response.data.Search ? response.data.Search : false;
      console.log(data);
      if (data) {
        this.setState({
          movieData: data,
          movieFound: true
        });
      }
    })
    .catch((error) => {
        console.log(error);
        this.setState({
          movieFound: false,
        });
        return (
          <Container>
            <Text>Bulunamadı</Text>
          </Container>
        );
    });
    }
    
    movieDetail = (item) => {
      console.log(item);
      this.props.navigation.navigate('MovieDetail', {
          item
      });
      console.log(item);
  }


    renderMovie = () => {
      if (this.state.movieFound) {
        return (
          <FlatList 
           data={this.state.movieData}
           renderItem={({ item, index }) => {
             console.log(`Item= ${JSON.stringify(item)}, index= ${index}`);
             return (
               <MovieColumn
               item={item} 
               index={index}
               onPress={this.movieDetail.bind(this, item.imdbID)}
               />

             );
           }}
           keyExtractor={(item) => item.movieID}

          />
        );
      } else {
        console.log('Film Bulunamadı.');
      }
    }

  
  render() {
      return (
        <Container>
          <SearchHeader
            value={this.state.searchMovie}
            onChangeText={(searchMovie) => {
              const split = searchMovie.split(' ');
              const join = split.join("");
              console.log(join);
              this.setState({ searchMovie: join });
              this.movieSearch();
            }}
            movieSearch={this.movieSearch.bind(this)}
          />
          <Content>
          {this.renderMovie()}
          </Content>
        </Container>
      );
  }
}
