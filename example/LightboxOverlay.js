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
};

const defaultProps = {
  layoutOpacity: new Animated.Value(1),
};

const intialState = {
  backgroundOpacity: new Animated.Value(1),
};

class LightboxOverlay extends Component {

  constructor(props) {
    super(props);
    this.state = intialState;
  }

  _onPressButton() {
    console.log('!!!');
  }

  _onLightboxScroll() {

  }

  render() {
    return (
      <Modal visible={this.props.isVisible} transparent={true}>
        {this.props.header}
        {this.props.children}
        {this.props.footer}
      </Modal>
    );
    // return (
    //   <Modal visible={this.props.isVisible} transparent={true}>
    //     <ScrollView
    //       style={styles.container}
    //       minimumZoomScale={1}
    //       maximumZoomScale={10}
    //       bouncesZoom={true}
    //       centerContent={true}
    //       scrollEventThrottle={200}
    //       onScroll={this._onLightboxScroll}
    //       onTouchEnd={(evt) => {
    //         // if (this.props.swipeToDismiss) {
    //         //   return;
    //         // }
    //         // this._handleDoubleTap(evt,false);
    //       }}>
    //       <Animated.Image source={{uri: this.props.imageUrl}} style={styles.imageStyle}/>
    //     </ScrollView>
    //   </Modal>
    // );
  }}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#0005',
  },
});


LightboxOverlay.propTypes = propTypes;
LightboxOverlay.defaultProps = defaultProps;

export default LightboxOverlay;