import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Content, List, ListItem, Thumbnail, Text, Body } from 'native-base';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B263B',
    borderRadius: 10,
  },
  detailText: {
    color: '#E0E1DD',
    fontSize: 16,
  },
});

export default class MovieColumn extends Component {
  render() {
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
              <Body style={styles.body}>
                <Text style={styles.detailText}>Detay</Text>
              </Body>
            </TouchableOpacity>
          </ListItem>
        </List>
      </Content>
    );
  }
}
