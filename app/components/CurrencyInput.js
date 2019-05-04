import React, { Component } from 'react';
import {
    TouchableNativeFeedback,
    View,
    StyleSheet,
    TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

export default class CurrencyInput extends Component {
    constructor(props) {
        super(props);
    }

    formatToCurrency(value) {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    removeFormat(value) {
        return value.replace(/,/g, '');
    }

    render() {
        let { 
            style,
            value,
            onChangeText,
            placeholder,
        } = this.props;

        const formatted = this.formatToCurrency(value);

        return (
            <TextInput
                style={[styles.input, style]}
                underlineColorAndroid="transparent"
                keyboardType="numeric"
                value={formatted}
                placeholder={placeholder}
                onChangeText={(text) => {
                    let result = this.removeFormat(text);
                    onChangeText(result);
                }}
            />
        );
    }
}

CurrencyInput.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func,
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 2,
    }
});