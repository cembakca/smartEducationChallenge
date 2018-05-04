import React, { Component } from 'react';
import { Linking, Image } from 'react-native';
import { Content, List, ListItem, Text, Body, Button } from 'native-base';
import axios from 'axios';
import * as Api from './api/Api';


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
    axios({
      method: 'get',
      url: `${Api.ID_SEARCH_URL}${params.item}${Api.API_KEY}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        this.setState({
          selectedMovie: response.data,
        });
      })
      .catch(() => {
        this.setState({
          selectedMovie: false,
        });
      });
  }
  render() {
    return (
      <Content>
        <ListItem>
          <Image
            resizeMode="contain"
            style={{ height: 200, width: null, flex: 1 }}
            source={{ uri: this.state.selectedMovie.Poster }}
          />
        </ListItem>
        <List style={{ backgroundColor: 'white' }}>
          <ListItem itemDivider>
            <Text>Filmin Adı</Text>
          </ListItem>
          <ListItem >
            <Text> { this.state.selectedMovie.Title }</Text>
          </ListItem>
          <ListItem itemDivider>
            <Text>Genel Bilgiler</Text>
          </ListItem>
          <ListItem >
            <Body>
              <Text>Yapım Yılı</Text>
              <Text note>{ this.state.selectedMovie.Year }</Text>
            </Body>
            <Body>
              <Text>Imdb Puanı</Text>
              <Text note>{ this.state.selectedMovie.imdbRating }</Text>
            </Body>
            <Body>
              <Text>Box Office</Text>
              <Text note>{ this.state.selectedMovie.BoxOffice }</Text>
            </Body>
          </ListItem>
          <ListItem itemDivider>
            <Text>İnternet Sitesi</Text>
          </ListItem>
          <ListItem >
            <Body>
              { this.state.selectedMovie.Website !== 'N/A' && (
              <Button
                block
                dark
                onPress={() => {
                Linking.openURL(this.state.selectedMovie.Website);
              }}
              >
                <Text>Film Sitesi</Text>
              </Button>
              )}
              { this.state.selectedMovie.Website === 'N/A' && (
                <Text style={{ fontSize: 12 }} >
                  Bu filme ait resmi bir website bulunmamaktadır.
                </Text>
              )}
            </Body>
          </ListItem>
          <ListItem itemDivider>
            <Text>Hakkında</Text>
          </ListItem>
          <ListItem >
            <Body>
              <Text> { this.state.selectedMovie.Plot }</Text>
            </Body>
          </ListItem>
          <ListItem itemDivider>
            <Text>Tür</Text>
          </ListItem>
          <ListItem >
            <Body>
              <Text> { this.state.selectedMovie.Genre }</Text>
            </Body>
          </ListItem>
          <ListItem itemDivider>
            <Text>Oyuncular</Text>
          </ListItem>
          <ListItem >
            <Body>
              <Text> { this.state.selectedMovie.Actors }</Text>
            </Body>
          </ListItem>
        </List>
      </Content>

    );
  }
}
