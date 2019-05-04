import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableNativeFeedback
} from 'react-native';

export default class CapsuleTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            active,
            onPress,
            children
        } = this.props;

        let styleActive = active ? {
            backgroundColor: '#4C4949',
        } : {
            backgroundColor: '#ccc',
        };

        return (
            <TouchableNativeFeedback onPress={onPress}>
                <View style={[styles.container, styleActive]}>
                    <Text style={styles.text}>{children.toUpperCase()}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

CapsuleTab.propTypes = {
    active: React.PropTypes.bool,
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginVertical: 8,
        marginHorizontal: 4,
        minWidth: 100,
    },
    text: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 9,
    }
});
