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
} from 'react-native';
import LightboxOverlay from './LightboxOverlay';
import ImageViewer from './ImageViewer';

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
        style={[this.props.style]}>
        <TouchableHighlight
          underlayColor={this.props.underlayColor}
          onPress={this.open}>
          <View>
            {this.props.children}
          </View>
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
    flex: 1
  },
  touchArea: {
    flex: 1,
    alignSelf: 'stretch',
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
