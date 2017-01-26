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
  isOpen: false,
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
    this.setState({
      isOpen: false,
    });
  }

  renderDefaultHeader(close) {
    return (
      <TouchableOpacity onPress={close}>
        <Text style={styles.close}>×</Text>
      </TouchableOpacity>
    );
  }

  renderOverlayContent(source) {
    return (
      <ImageViewer
        source={source}
        style={styles.image} />
    );
  }

  render() {
    return (
      <View
        ref={component => this._root = component}
        style={[this.props.style]}>
        <TouchableHighlight
          underlayColor={this.props.underlayColor}
          onPress={this.open}>
          {this.props.children}
        </TouchableHighlight>

        <LightboxOverlay
          isVisible={this.state.isOpen}
          imageUrl={this.props.images[0].uri}
          renderHeader={this.props.renderHeader || this.renderDefaultHeader}
          renderFooter={this.props.renderFooter}
          onClose={this.close}>
          {this.renderOverlayContent(this.props.images[0])}
        </LightboxOverlay>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  touchArea: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'yellow',
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