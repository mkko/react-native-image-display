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
  //uri: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Wurstplatte.jpg'
  uri: 'file:///Users/mval/8866.jpeg'
}];

export default class example extends Component {

  componentWillMount() {
    Image.prefetch(images[0].uri);
  }

  renderFooter() {
    return (
      <View style={{paddingLeft: 16, paddingRight: 16, paddingBottom: 12, paddingTop: 12, backgroundColor: '#0007'}}>
        <Text style={{color: 'white'}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti ab ea nisi suscipit, optio officia, autem ad provident tempora alias laborum culpa ratione accusantium. Ex minima asperiores eius ipsa itaque!
        </Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>
          Click the photo
        </Text>
        <Lightbox
          images={images}
          renderFooter={this.renderFooter}>
          <Image
            style={styles.thumbnail}
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
  thumbnail: {
    flex: 1,
    height: 150,
    width: 150,
    resizeMode: 'stretch',
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
