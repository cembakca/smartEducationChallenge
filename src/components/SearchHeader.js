import React, { Component } from 'react';
import { } from 'react-native';
import { Header, Item, Input } from 'native-base';


export default class SearchHeader extends Component {
  render() {
    return (
      <Header
        style={{ height: 60, backgroundColor: 'white' }}
        searchBar
        rounded
      >
        <Item>
          <Input
            placeholder="Aramak istediğiniz film..."
            onChangeText={this.props.onChangeText}
            returnKeyType="search"
            onSubmitEditing={this.props.movieSearch}
          />
        </Item>
      </Header>
    );
  }
}
