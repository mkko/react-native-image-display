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
  isAnimated: PropTypes.bool,
  renderHeader: PropTypes.func.isRequired,
  renderFooter: PropTypes.func,
  onClose: PropTypes.func.isRequired,

};


class LightboxOverlay extends Component {

  static defaultProps = {
    layoutOpacity: new Animated.Value(1),
  }

  constructor(props) {
    super(props);
  }

  state = {
    openVal: new Animated.Value(0),
    isAnimating: false,
  };

  componentWillReceiveProps(newProps) {
    if (this.props.isVisible !== newProps.isVisible) {
      if (newProps.isVisible) {
        this.animateOpen();
      } else {
        this.animateClose();
      }
    }
  }

  animateOpen = () => {
    this.setState({ isAnimating: true });
    Animated.timing(
      this.state.openVal, {
        toValue: 1,
        duration: 400,
      }
    ).start(() => {
      this.setState({ isAnimating: false })
    });
  }

  animateClose = () => {
    this.setState({ isAnimating: true });
    Animated.timing(
      this.state.openVal, {
        toValue: 0,
        duration: 400,
      }
    ).start(() => {
      this.setState({
        isAnimating: false,
      });
      this.props.onClose();
    });
  }

  render() {

    return (
      <Modal visible={this.props.isVisible || this.state.isAnimating} transparent={true} onRequestClose={() => {}}>
        <Animated.View style={[styles.background, { opacity: this.state.openVal }]}>
          {this.props.children}
          <View pointerEvents='box-none' style={styles.overlay}>
            <View pointerEvents='auto' style={styles.headerContainer}>
              {this.props.renderHeader(this.props.onClose)}
            </View>
            <View pointerEvents='none' style={styles.footerContainer}>
              {this.props.renderFooter()}
            </View>
          </View>
        </Animated.View>
      </Modal>
    );
  }

}

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

export default LightboxOverlay;