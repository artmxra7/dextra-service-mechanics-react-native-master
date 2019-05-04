import React, {Component} from 'react';
import {
    TouchableNativeFeedback,
    Text,
    View,
    StyleSheet
} from 'react-native';

export default class Switch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLeftActived: true,
            isRightActived: false,
            leftColor: '#2196f3',
            rightColor: '#7F7F7F',
            textLeft: 'Price',
            textRight: '',
        };
    }

    leftActived() {
        this.setState({
            isLeftActived: true,
            isRightActived: false,
            leftColor: '#2196f3',
            rightColor: '#7F7F7F',
        });

        this.setState({textLeft: 'on'});
        this.setState({textRight: ''});
    }

    rightActived() {
        this.setState({
            isRightActived: true,
            isLeftActived: false,
            rightColor: '#2196f3',
            leftColor: '#7F7F7F',
        });

        this.setState({textRight: 'on'});
        this.setState({textLeft: ''});
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableNativeFeedback onPress={() => this.leftActived()}>
                    <View style={[styles.button, {backgroundColor: this.state.leftColor}]}>
                        <Text style={styles.text}>{this.state.textLeft}</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => this.rightActived()}>
                    <View style={[styles.button, {backgroundColor:this.state.rightColor}]}>
                        <Text style={styles.text}>{this.state.textRight}</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: 'red',
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,
        width: '50%',
        height: 20,
    },
    text: {
        alignSelf:'center',
        color:'#fff',
    },
});
