import React, {Component} from 'react';
import {
    TextInput,
    View,
    StyleSheet
} from 'react-native';

export default class Input extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TextInput
              style={[styles.input, this.props.style]}
              underlineColorAndroid="transparent"
              {...this.props}
            />
        );
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 2,
    }
});
