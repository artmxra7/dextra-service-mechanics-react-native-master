import React, { Component } from 'react';
import {
    TouchableNativeFeedback,
    Text,
    View,
    StyleSheet
} from 'react-native';

export default class ButtonRadius extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            onPress,
            text,
            style
        } = this.props;

        return (
            <TouchableNativeFeedback
                onPress={onPress}
                style={styles.button}>
                <View style={[styles.button, style]}>
                    <Text style={styles.button_text}>{text}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#7F7F7F',
        paddingTop: 7,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        marginLeft: 6,
    },
    button_text: {
        color: '#fff',
        fontSize: 10,
    },
});
