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
  maximumZoomScale: 1,
  minimumZoomScale: 1,
};

class ImageViewer extends Component {

  constructor(props) {
    super(props);
    this.state = intialState;
  }

  _onPressButton() {
    console.log('!!!');
  }

  _onLightboxScroll() {

  }

  handleScroll(event) {
    console.log(event.nativeEvent.contentOffset.y);
  }

  onImageLayout(event) {
    console.log(event.nativeEvent);
  }

  onImageLoad() {

  }

  render() {
    const onTap = this.props.onTap ? this.props.onTap : function() {};

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

          <TouchableWithoutFeedback onPress={onTap}>
            <Image
              source={this.props.source}
              style={{width: 2448, height: 3264}}
              />
          </TouchableWithoutFeedback>

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