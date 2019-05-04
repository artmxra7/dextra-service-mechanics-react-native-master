import React, {Component} from 'react';
import {
    TouchableNativeFeedback,
    Text,
    View,
    StyleSheet
} from 'react-native';

export default class Ref extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableNativeFeedback onPress={this.props.onPress}>
               <Text style={{color:this.props.color}}>{this.props.text}</Text>
            </TouchableNativeFeedback>
        );
    }

}

const styles = StyleSheet.create({
    button: {
        color: '#3498db',
    },
});
