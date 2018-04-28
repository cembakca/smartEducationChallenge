import React, { Component } from 'react';
import { Linking, Image } from 'react-native';
import { Content, List, ListItem, Text, Body, Button } from 'native-base';
import axios from 'axios';


export default class MovieDetail extends Component {

  
  static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {};
    };
    constructor(props) {
      super(props);
      this.state = {
        selectedMovie: {},
    };
    }
    
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    const { params } = this.props.navigation.state;
      console.log(params.item);
      const urlid = `http://www.omdbapi.com/?i=${params.item}&apikey=530c3fd2`;
      console.log(urlid);
      axios({
        method: 'get',
        url: urlid,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response);
          this.setState({
            selectedMovie: response.data
          }); 
      })
      .catch((error) => {
          console.log(error);
          this.setState({
            selectedMovie: false,
          });
      });
  }
  goBack = () => {
    this.props.navigation.goBack();
  }
  render() {
    const selectedMovie = this.state.selectedMovie;
    return (

      <Content>
        <ListItem>
            <Image
              resizeMode='contain'
              style={{ height: 200, width: null, flex: 1 }}
              source={{ uri: selectedMovie.Poster }}
            />
          </ListItem>
        <List style={{ backgroundColor: 'white' }}>
          <ListItem itemDivider>
            <Text>Filmin Adı</Text>
          </ListItem>
          <ListItem >
            <Text> {selectedMovie.Title}</Text>
          </ListItem>
          <ListItem itemDivider>
            <Text>Genel Bilgiler</Text>
          </ListItem>
          <ListItem >
                <Body left>
                  <Text>Yapım Yılı</Text>
                  <Text note>{selectedMovie.Year}</Text>
                </Body>
                <Body>
                  <Text>Imdb Puanı</Text>
                  <Text note>{selectedMovie.imdbRating}</Text>
                </Body>
                <Body right>
                  <Text>Box Office</Text>
                  <Text note>{selectedMovie.BoxOffice}</Text>
                </Body>
          </ListItem>


          <ListItem itemDivider>
            <Text>İnternet Sitesi</Text>
          </ListItem>
          <ListItem >
          <Body>
          {selectedMovie.Website !== 'N/A' && (
            <Button 
            block dark
            onPress={() => {
              console.log(selectedMovie.Website);
              Linking.openURL(selectedMovie.Website);
            }} 
            >
              <Text>Film Sitesi</Text>
            </Button>
          )
          }
          {selectedMovie.Website === 'N/A' && (
            <Text style={{ fontSize: 12 }} >Bu filme ait resmi bir website bulunmamaktadır.</Text>
          )
          }
          </Body>
          </ListItem>

          <ListItem itemDivider>
            <Text>Hakkında</Text>
          </ListItem>
          <ListItem >
          <Body>
            <Text> {selectedMovie.Plot}</Text>
          </Body>
          </ListItem>
        </List>
      </Content>
      
    );
  }
}

