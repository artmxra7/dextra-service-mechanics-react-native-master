import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import { Icon } from 'react-native-elements';

export default class TabBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.bar}>
                <View style={styles.icon}>
                    <Icon name="menu" color="#fff"/>
                </View>
                <View>
                    <Image
                      style={styles.dextra_logo}
                      source={require('../assets/images/dextra.png')}
                    />
                </View>
                <View style={styles.title_container}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
                <View style={styles.search_container}>
                    <Icon name="search" color="#fff"/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bar: {
        backgroundColor: '#4C4949',
        padding: 10,
        flexDirection: 'row',
    },
    bar_text: {
        color: '#fff',
    },
    icon: {
        justifyContent: 'center',
        paddingRight: 10,
    },
    dextra_logo: {
        width: 80,
        height: 60,
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center',
    },
    title_container: {
        justifyContent: 'center',
        paddingLeft: 20,
        flex: 2,
        width: '100%',
    },
    search_container: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10,
    },
});
