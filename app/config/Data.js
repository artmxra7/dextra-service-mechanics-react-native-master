import React,{ Component } from 'react';
import { AsyncStorage } from 'react-native';

export default class Data extends Component {
     constructor(props) {
         super(props);
     }

     async insert(key, data) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
     }

     async select(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return JSON.parse(value);
            }
        } catch (error) {
            console.log(error);
        }
     }
}
