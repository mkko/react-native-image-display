import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Animated,
  TouchableHighlight,
  View,
  Modal,
  ScrollView,
} from 'react-native';

const propTypes = {
  style: View.propTypes.style,
  imageUrl: PropTypes.string,
  isVisible: PropTypes.bool,
  renderHeader: PropTypes.func.isRequired,
  renderFooter: PropTypes.func,
  onClose: PropTypes.func.isRequired,

};

const defaultProps = {
  layoutOpacity: new Animated.Value(1),
};

const intialState = {
  openVal: new Animated.Value(0),
  isAnimating: false,
};

class LightboxOverlay extends Component {

  constructor(props) {
    super(props);
    this.state = intialState;
  }

  open() {
    Animated.spring(
      this.state.openVal,
      {
        toValue: 1,
      }
    ).start(() => this.setState({ isAnimating: false }));
  }

  close() {
    Animated.spring(
      this.state.openVal,
      {
        toValue: 0
      }
    ).start(() => {
      this.setState({
        isAnimating: false,
      });
      this.props.onClose();
    });
  }

  renderBackground() {
    return (
      <Animated.View
        style={styles.background}
      />
    );
  }

  render() {

    // var lightboxOpacity = {
    //   opacity: this.openVal.interpolate({inputRange: [0, 1], outputRange: [0, target.opacity]})
    // };

    return (
      <Modal visible={this.props.isVisible} transparent={true} onRequestClose={() => {}}>
        {this.renderBackground()}
        {this.props.children}
        <View pointerEvents='box-none' style={styles.overlay}>
          <View pointerEvents='auto' style={styles.headerContainer}>
            {this.props.renderHeader(this.props.onClose)}
          </View>
          <View pointerEvents='none' style={styles.footerContainer}>
            {this.props.renderFooter()}
          </View>
        </View>
      </Modal>
    );
  }}

var styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000e',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    minHeight: 66, // TODO: Depends on the device family.
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
});


LightboxOverlay.propTypes = propTypes;
LightboxOverlay.defaultProps = defaultProps;

export default LightboxOverlay;