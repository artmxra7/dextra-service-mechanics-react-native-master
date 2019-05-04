import React, {Component} from 'react';
import {
    TouchableNativeFeedback,
    Text,
    View,
    StyleSheet
} from 'react-native';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            text,
            lowerCase,
            onPress,
            style
        } = this.props;

        if (lowerCase != true) {
            text = text.toUpperCase();
        }

        return (
            <TouchableNativeFeedback onPress={onPress}>
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
        alignItems: 'center',
        borderRadius: 2,
        paddingBottom: 10,
        paddingTop: 10,
        width: '100%',
    },
    button_text: {
        color: '#fff',
    },
});
