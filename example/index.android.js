/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Modal
} from 'react-native';

import Lightbox from './Lightbox';

const images = [{
  uri: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Wurstplatte.jpg'
  // uri: 'file:///Users/mval/Desktop/Wurstplatte.jpg'
}];

export default class example extends Component {

  componentWillMount() {
    Image.prefetch(images[0].uri);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>
          Click the photo
        </Text>
        <Lightbox images={images}>
          <Image
            style={styles.contain}
            resizeMode="cover"
            source={{ uri: images[0].uri }}
          />
        </Lightbox>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 48,
    backgroundColor: '#F5FCFF',
  },
  contain: {
    flex: 1,
    height: 150,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  bannerImageContainer: {
    backgroundColor: 'red',
    height: 200,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('example', () => example);
