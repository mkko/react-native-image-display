import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Modal,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

const propTypes = {
  style: View.propTypes.style,
  source: Image.propTypes.source,
};

const defaultProps = {
  layoutOpacity: new Animated.Value(1),
};

const intialState = {
  backgroundOpacity: new Animated.Value(0),
  isLoading: true,
  size: null,
  maximumZoomScale: 1,
  minimumZoomScale: 1,
};

function getSize(uri) {
  return new Promise((resolve, reject) => {
    Image.getSize(uri, (width, height) => {
      resolve({width, height});
    }, err => {
      reject(err);
    });
  });
}

class ImageViewer extends Component {

  constructor(props) {
    super(props);
    this.state = intialState;

    const uri = this.props.source.uri;
    Image
      .prefetch(uri)
      .then(() => {
        console.log(`✔ Prefetch OK from ${uri}`);
      })
      .then(() => getSize(uri))
      .then(size => {
        console.log(`✔ Got size ${size}`);
        // TODO: layout might not be available yet.
        const {width, height} = this.state.layout;
        const minimumZoomScale = Math.min(height / size.height, width / size.width);
        console.log('minimumZoomScale', minimumZoomScale);
        
        size = Dimensions.get('window');

        // TODO: The component might not be mounted anymore.
        this.setState({
          preloadedSource: this.props.source,
          minimumZoomScale,
          size,
        });
      });

    this.onLayout = this.onLayout.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);
  }

  onLayout(event) {
    console.log('w:', event.nativeEvent.layout.width);
    this.setState({
      layout: event.nativeEvent.layout,
    });
  }

  handleScroll(event) {
    console.log(event.nativeEvent.contentOffset.y);
  }

  onImageLoad() {
    console.log('Image loaded:');
    this.setState({
      isLoading: false,
    }, () => {
      Animated.timing(
        this.state.backgroundOpacity, {
          toValue: 1,
          duration: 400,
        }
      ).start();
    });
    
  }

  renderLoading() {
    return (
      <View style={styles.activityOverlay}>
        <ActivityIndicator style={styles.activityIndicator} animating={true} />
      </View>
    );
  }

  renderContent() {
    return this.state.size && (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems:'center', justifyContent:'center', width: this.state.size.width, height: this.state.size.height}}
        minimumZoomScale={1} 
        maximumZoomScale={10}
        centerContent={true}
        bounces={true}
        bouncesZoom={true}
        alwaysBounceHorizontal={true}
        alwaysBounceVertical={true}
        horizontal={true}
        directionalLockEnabled={false}
        showsHorizontalScrollIndicator={this.props.showsHorizontalScrollIndicator} 
        showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator} 
        scrollEventThrottle={200}
        onScroll={this.handleScroll}>
          <TouchableWithoutFeedback style={styles.container}>
            <Animated.Image
              source={this.state.preloadedSource}
              style={[styles.image, {width: this.state.size.width, height: this.state.size.height, opacity: this.state.backgroundOpacity}]}
              onLoad={this.onImageLoad} />
          </TouchableWithoutFeedback>
      </ScrollView>
    );
  }

  render() {
    const onTap = this.props.onTap ? this.props.onTap : function() {};

    return (
      <View style={styles.container} onLayout={this.onLayout}>
        {this.renderLoading()}
        {this.renderContent()}
      </View>
    );
  }}

var styles = StyleSheet.create({
  container: {
  },
  image: {
    resizeMode: 'contain',
  },
  activityOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },
  activityIndicator: {
    flex: 1,
  },
  contain: {
    flex: 1,
    alignSelf: 'stretch',
  },
  imageStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 200,
    height: 200,
  },
});

ImageViewer.propTypes = propTypes;
ImageViewer.defaultProps = defaultProps;

export default ImageViewer;