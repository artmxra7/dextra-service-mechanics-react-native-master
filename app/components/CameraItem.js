import React, { Component } from 'react';
import {
    TouchableNativeFeedback,
    View,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

export default class CameraItem extends Component {
    render() {
        let {
            onPress,
            iconSize,
            iconColor,
            containerSize,
            containerColor,
            image,
            isReadOnly,
        } = this.props;

        let propStyles = {
            ...containerSize,
            backgroundColor: containerColor,
        };

        return (
            <TouchableNativeFeedback 
                onPress={() => {
                    if (!isReadOnly) onPress();
                }}>
                <View style={[styles.container, propStyles]}>
                    {image ? (
                        <Image
                            style={containerSize}
                            source={{ uri: image }}
                            resizeMode="cover" />
                    ) : (
                        <Icon 
                            name="camera"
                            type="font-awesome"
                            color={iconColor}
                            size={iconSize} />
                    )}
                </View>
            </TouchableNativeFeedback>
        );
    }
}

CameraItem.propTypes = {
    isReadOnly: PropTypes.bool,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
    containerSize: PropTypes.object,
    containerColor: PropTypes.string,
    onPress: PropTypes.func
};

CameraItem.defaultProps = {
    isReadOnly: false,
    iconSize: 32,
    iconColor: 'white',
    containerSize: { width: 96, height: 96 },
    containerColor: '#555',
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});
