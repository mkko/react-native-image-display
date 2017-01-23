import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Dimensions,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  View,
  Modal,
  Image,
} from 'react-native';
import LightboxOverlay from './LightboxOverlay';
import ImageViewer from './ImageViewer';
import ZoomableImage from './ZoomableImage';

const propTypes = {
  style: View.propTypes.style,
  images: PropTypes.array,
  children: PropTypes.node.isRequired,
  renderHeader: PropTypes.func,
  renderFooter: PropTypes.func,
};

const defaultProps = {
  layoutOpacity: new Animated.Value(1),
};

const intialState = {
  isOpen: true,
  backgroundOpacity: new Animated.Value(1),
};

const window = Dimensions.get('window');

class Lightbox extends Component {

  constructor(props) {
    super(props);
    this.state = intialState;

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.renderDefaultHeader = this.renderDefaultHeader.bind(this);
  }

  open() {
    this.setState({
      isOpen: true,
    });
  }

  close() {
    console.log('close!');
    this.setState({
      isOpen: false,
    });
  }

  renderDefaultHeader(close) {
    console.log('close:', close);
    return (
      <TouchableOpacity onPress={close}>
        <Text style={styles.close}>×</Text>
      </TouchableOpacity>
    );
  }

  render() {
    console.log('this.close', this.close);
    return (
      <View
        ref={component => this._root = component}
        style={this.props.style}>
        <Animated.View>
          <TouchableHighlight
            underlayColor={this.props.underlayColor}
            onPress={this.open}>
            {this.props.children}
          </TouchableHighlight>
        </Animated.View>

        <LightboxOverlay
          isVisible={this.state.isOpen}
          imageUrl={this.props.images[0].uri}
          renderHeader={this.props.renderHeader || this.renderDefaultHeader}
          renderFooter={this.props.renderFooter}
          onClose={this.close}
          >
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
    width: window.width,
    height: window.height,
  },
  close: {
    marginTop: 16,
    fontSize: 35,
    textAlign: 'center',
    color: 'white',
    width: 44,
    height: 44,
  }
});

Lightbox.propTypes = propTypes;
Lightbox.defaultProps = defaultProps;

export default Lightbox;