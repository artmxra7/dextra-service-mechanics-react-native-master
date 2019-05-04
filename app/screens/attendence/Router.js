import React, {Component} from 'react';
import {
    Text,
    View,
    Alert,
    Image
} from 'react-native';
import { Icon } from 'native-base';
import {TabNavigator,StackNavigator} from 'react-navigation';
import {styles} from '../../assets/styles/Style';
import WorkSchedule from './WorkSchedule';
import WorkHistory from './WorkHistory';
import WorkHours from './WorkHours';
import ServiceDetail from '../service/ServiceDetail';
import StartWorking from './StartWorking';
import WorkInProgress from './WorkInProgress';

export const AttendRouter = TabNavigator({
    WorkSchedule:{
        screen:WorkSchedule,
        navigationOptions:{
            tabBarLabel:'Work Schedule',
        }
    },
    WorkHours:{
        screen:WorkHours,
        navigationOptions:{
            tabBarLabel:'Work Hours',
        }
    },
    WorkHistory:{
        screen:WorkHistory,
        navigationOptions:{
            tabBarLabel:'Work History',
        }
    },
},{
    tabBarOptions:{
        style:{
            backgroundColor:'#fff',
        },
        activeTintColor:'#f39c12',
        activeBackgroundColor:'red',
        inactiveTintColor:'#3E3C3C',
        upperCaseLabel:false,
        indicatorStyle:{
            backgroundColor:'transparent'
        },
        labelStyle:{
            fontWeight:'bold'
        }
    }
})

export const RouterDetail = StackNavigator({
    AttendRouter:{
        screen:AttendRouter,
        navigationOptions: {
            headerStyle: styles.header_menu,
            headerTitleStyle: styles.header_title,
            headerTintColor: '#fff',
            title:'Attendence',
        },
    },
    ServiceDetail: {
        screen: ServiceDetail,
        navigationOptions: {
            headerStyle: styles.header_menu,
            headerTitleStyle: styles.header_title,
            headerTintColor: '#fff',
            title: 'Service Detail',
        },
    },
    StartWorking: {
        screen: StartWorking,
        navigationOptions: {
            headerStyle: styles.header_menu,
            headerTitleStyle: styles.header_title,
            headerTintColor: '#fff',
            title: 'Start Working',
        },
    },
    WorkInProgress: {
        screen: WorkInProgress,
        navigationOptions: {
            headerStyle: styles.header_menu,
            headerTitleStyle: styles.header_title,
            headerTintColor: '#fff',
            title: 'Work In Progress',
        },
    },
})
export default class Router extends Component{

    constructor(props)
    {
        super(props)
    }

    render()
    {
        return <RouterDetail/>
    }

}
