import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Dimensions,
  Animated,
  TouchableHighlight,
  View,
  Modal,
} from 'react-native';
import LightboxOverlay from './LightboxOverlay';
import ImageViewer from './ImageViewer';
import ZoomableImage from './ZoomableImage';

const propTypes = {
  style: View.propTypes.style,
  images: PropTypes.array,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  layoutOpacity: new Animated.Value(1),
};

const intialState = {
  isOpen: false,
  backgroundOpacity: new Animated.Value(1),
};

const window = Dimensions.get('window');

class Lightbox extends Component {

  constructor(props) {
    super(props);
    this.state = intialState;

    this._onPressButton = this._onPressButton.bind(this);
  }

  _onPressButton() {
    this.setState({
      isOpen: true,
    });
  }

  render() {
    return (
      <View
        ref={component => this._root = component}
        style={this.props.style}>
        <Animated.View>
          <TouchableHighlight
            underlayColor={this.props.underlayColor}
            onPress={this._onPressButton}>
            {this.props.children}
          </TouchableHighlight>
        </Animated.View>

        <LightboxOverlay isVisible={this.state.isOpen} imageUrl={this.props.images[0].uri}>
          <ImageViewer
            source={{ uri: this.props.images[0].uri }}
            style={styles.image}
            />
        </LightboxOverlay>
      </View>
    );
  }
}

var styles = StyleSheet.create({
    image: {
        width: window.width - 50,
        height: window.height - 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

Lightbox.propTypes = propTypes;
Lightbox.defaultProps = defaultProps;

export default Lightbox;