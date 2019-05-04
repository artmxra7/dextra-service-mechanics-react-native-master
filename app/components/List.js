import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

export default class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            style,
            children
        } = this.props;

        return (
            <View style={[styles.container, style]}>
                {children}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 2,
        flexDirection: 'row',
    },
});
