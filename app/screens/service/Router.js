import React, { Component } from 'react';
import {
    Text,
    View,
    Alert,
    Image
} from 'react-native';
import { Icon } from 'native-base';
import { TabNavigator, StackNavigator } from 'react-navigation';
import OpenJobs from './OpenJobs';
import Wip from './Wip';
import CloseJobs from './CloseJobs';
import ServiceDetail from './ServiceDetail';
import StartWorking from '../attendence/StartWorking';
import WorkInProgress from '../attendence/WorkInProgress';

import { styles } from '../../assets/styles/Style';

export const ServiceRouter = TabNavigator({
    OpenJobs: {
        screen: OpenJobs,
        navigationOptions: {
            tabBarLabel: 'Open Jobs',
        }
    },
    Wip: {
        screen: Wip,
        navigationOptions: {
            tabBarLabel: 'WIP',
        }
    },
    CloseJobs: {
        screen: CloseJobs,
        navigationOptions: {
            tabBarLabel: 'Close Jobs'
        }
    },
}, {
    tabBarOptions: {
        style: {
            backgroundColor: '#fff',
        },
        activeTintColor: '#f39c12',
        activeBackgroundColor: 'red',
        inactiveTintColor: '#3E3C3C',
        upperCaseLabel: false,
        indicatorStyle: {
            backgroundColor: 'transparent'
        },
        labelStyle: {
            fontWeight: 'bold'
        }
    }
})

export const RouterDetail = StackNavigator({
    ServiceRouter: {
        screen: ServiceRouter,
        navigationOptions: {
            headerStyle: styles.header_menu,
            headerTitleStyle: styles.header_title,
            headerTintColor: '#fff',
            title: 'Job',
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

export default class Router extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <RouterDetail />
    }
}
