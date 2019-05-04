import React, {Component} from 'react';
import {
    TouchableOpacity,
    TextInput,
    Text,
    View,
    StyleSheet
} from 'react-native';
import List from '../components/List';
import {styles} from '../assets/styles/Style';
import { Icon } from 'react-native-elements';

export default class JobItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            onPress,
            job_category,
            customer_name,
            customer_company,
            location,
        } = this.props;

        return (
            <TouchableOpacity
                onPress={onPress}>
                <List>
                    <View style={[styles.col_list, {flexDirection:'row', flex:1}]}>
                        <View style={local_styles.content}>
                            <View style={local_styles.job_category}>
                                <Text style={[local_styles.job_category_text, {flex:1}]}>{job_category}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={[styles.content_body_font, {flex:1}]}>{customer_name}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={[styles.content_body_font, {flex:1}]}>{customer_company}</Text>
                            </View>
                            <View style={local_styles.location}>
                                <Icon name="location-on" size={14} style={{flex: 0.7}}/>
                                <Text style={[local_styles.location_text, {flex:1, marginLeft: 5}]}>{location}</Text>
                            </View>
                        </View>
                    </View>
                </List>
            </TouchableOpacity>
        );
    }
}

const local_styles = StyleSheet.create({
    content: {
        flexDirection:'column',
        flex: 2,
        position: 'relative',
    },
    job_category: {
        position: 'absolute',
        right: 5,
        top: 0,
    },
    job_category_text: {
        backgroundColor: '#333',
        color: '#fff',
        fontSize: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    location: {
        flexDirection:'row',
        marginTop: 10,
    },
    location_text: {
        color: '#363636',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
