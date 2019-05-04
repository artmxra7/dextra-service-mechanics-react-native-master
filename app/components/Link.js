import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableNativeFeedback
} from 'react-native';

export default class Link extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let {
            children,
            onPress
        } = this.props;

        return(
            <TouchableNativeFeedback onPress={onPress}>
                {children}
            </TouchableNativeFeedback>
        );
    }
}
