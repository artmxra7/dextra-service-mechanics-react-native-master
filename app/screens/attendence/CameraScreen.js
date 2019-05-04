'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Camera from 'react-native-camera';

export default class CameraScreen extends Component {
    constructor(props) {
        super(props);

        this.takePicture = this.takePicture.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera 
                    ref={(cam) => { this.camera = cam; }}
                    captureTarget={Camera.constants.CaptureTarget.temp}
                    style={styles.preview}
                    orientation={Camera.constants.Orientation.portrait}
                    flashMode={Camera.constants.FlashMode.off}
                    type={Camera.constants.Type.front}
                    aspect={Camera.constants.Aspect.fill}>
                    <TouchableHighlight 
                        style={styles.capture} 
                        onPress={this.takePicture}>
                        <View style={{alignItems: 'center'}}>
                            <Icon name="camera-alt" color="#fff" size={64}/>
                        </View>
                    </TouchableHighlight>
                </Camera>
            </View>
        );
    }

    takePicture() {
        const options = {};
        this.camera.capture({metadata: options})
        .then((data) => this.props.onTakeCapture(data))
        .catch(err => console.error(err));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        marginBottom: 192
    }
});
