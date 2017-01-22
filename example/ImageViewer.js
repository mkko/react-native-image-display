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
} from 'react-native';

const propTypes = {
  style: View.propTypes.style,
  source: Image.propTypes.source,
};

const defaultProps = {
  layoutOpacity: new Animated.Value(1),
};

const intialState = {
  backgroundOpacity: new Animated.Value(1),
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

    // Image.getSize(this.props.source.uri, (width, height) => {
    //   console.log('size:', width, 'x', height);
    //   this.setState({size : {width, height}});
    // });

    const uri = this.props.source.uri;
    Image
      .prefetch(uri)
      .then(() => {
        console.log(`✔ Prefetch OK from ${uri}`);
      })
      .then(() => getSize(uri))
      .then(size => {
        console.log(`✔ Got size ${size}`);
        this.setState({
          preloadedSource: this.props.source,
          size,
        })
      });

    this.onImageLoad = this.onImageLoad.bind(this);
  }

  handleScroll(event) {
    console.log(event.nativeEvent.contentOffset.y);
  }

  onImageLoad() {
    console.log('Image loaded:');
    this.setState({
      isLoading: false,
    });
  }

  renderLoading() {
    return (
      <ActivityIndicator animating={true} />
    );
  }

  render() {
    const onTap = this.props.onTap ? this.props.onTap : function() {};

    const isLoading = (this.state.isLoading || !this.state.size)

    return (
      <View style={styles.container}>
        <ScrollView
          style={{backgroundColor: '#000d'}}
          contentContainerStyle={{ alignItems:'center', justifyContent:'center', width: 2448, height: 3264}}
          centerContent={true}
          maximumZoomScale={this.state.maximumZoomScale}
          minimumZoomScale={this.state.minimumZoomScale} 
          alwaysBounceHorizontal={true}
          alwaysBounceVertical={true}
          horizontal={true}
          directionalLockEnabled={false}
          showsHorizontalScrollIndicator={this.props.showsHorizontalScrollIndicator} 
          showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator} 
          onScroll={this.handleScroll}>

          {this.state.isLoading && this.renderLoading()}
          {this.state.size &&
            <TouchableWithoutFeedback onPress={onTap}>
              <Image
                source={this.state.preloadedSource}
                style={{width: this.state.size.width, height: this.state.size.height}}
                onLoad={this.onImageLoad} />
            </TouchableWithoutFeedback>}

        </ScrollView>
      </View>
    );
  }}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000d',
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