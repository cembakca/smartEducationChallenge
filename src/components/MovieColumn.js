import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Content, List, ListItem, Thumbnail, Text, Body } from 'native-base';

export default class MovieColumn extends Component {
  render() {
    const movieData = this.props.item;

    console.log(movieData);
    return (
      <Content>
        <List>
          <ListItem>
            <Thumbnail
              square
              size={80}
              source={{ uri: this.props.item.Poster }}
            />
            <Body>
              <Text>{this.props.item.Title}</Text>
              <Text note>Yapım Yılı: {this.props.item.Year}</Text>
              <Text note>{this.props.item.Released}</Text>
            </Body>
            <TouchableOpacity onPress={this.props.onPress}>
              <Body
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#1B263B',
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: '#E0E1DD', fontSize: 16 }}>Detay</Text>
              </Body>
            </TouchableOpacity>
          </ListItem>
        </List>
      </Content>
    );
  }
}
