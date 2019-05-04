import React, { Component } from 'react';
import {
    TouchableNativeFeedback,
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
} from 'react-native';

import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import Camera from 'react-native-camera';

export default class ModalJobCamera extends Component {
    constructor(props) {
        super(props);

        this.capture = this.capture.bind(this);
    }

    capture() {
        let {
            onPressClose,
            onPressCapture,
        } = this.props;

        const options = {};

        this.camera
            .capture({metadata: options})
            .then((data) => { 
                onPressCapture(data);
                onPressClose();
            })
            .catch(err => console.error(err));
    }

    render() {
        let {
            isOpen,
            onPressClose,
        } = this.props;

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={isOpen}
                onRequestClose={() => {}}>
                <View style={styles.container}>
                    <Camera 
                        ref={(cam) => { this.camera = cam; }}
                        captureQuality={Camera.constants.CaptureQuality.low}
                        captureTarget={Camera.constants.CaptureTarget.temp}
                        style={styles.preview}
                        orientation={Camera.constants.Orientation.portrait}
                        flashMode={Camera.constants.FlashMode.off}
                        type={Camera.constants.Type.back}
                        aspect={Camera.constants.Aspect.fill}>
                        <TouchableWithoutFeedback  
                            onPress={this.capture}>
                            <View style={styles.capture}>
                                <Icon name="camera-alt" color="#fff" size={42}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback 
                            onPress={onPressClose}>
                            <View style={styles.close}>
                                <Icon name="close" color="#fff" size={24}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </Camera>
                </View>
            </Modal>
        );
    }
}

ModalJobCamera.propTypes = {
    isOpen: PropTypes.bool,
    onPressCapture: PropTypes.func,
    onPressClose: PropTypes.func
};

ModalJobCamera.defaultProps = {
    isOpen: false,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    close: {
        position: 'absolute',
        top: 24,
        right: 24,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        alignItems: 'center',
        marginBottom: 96,
    }
});
