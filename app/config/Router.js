import React, {Component} from 'react';
import {
    Text,
    Image,
    View,
    AsyncStorage
} from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';
import {StyleSheet} from 'react-native';
import Intro from '../screens/auth/Intro';
import Login from '../screens/auth/Login';
import EmailSent from '../screens/auth/EmailSent';
import ResetPassword from '../screens/auth/ResetPassword';
import Timeline from '../screens/timelines/Timeline';
import TimelineDetail from '../screens/timelines/TimelineDetail';
import { default as RouterCommision} from '../screens/commisions/Router';
import CommisionWithdraw from '../screens/commisions/CommisionWithdraw';
import CommisionDetail from '../screens/commisions/CommisionDetail';
import OpenJobs from '../screens/service/OpenJobs';
import Router from '../screens/service/Router';
import ServiceDetail from '../screens/service/ServiceDetail';
import WorkInProgress from '../screens/attendence/WorkInProgress';
import {default as RouterAttendence} from '../screens/attendence/Router';
import Storage from 'react-native-storage';
import TabBar from '../components/TabBar';
import {styles} from '../assets/styles/Style';
import {
    Icon
} from 'react-native-elements';
import { Icon as Icons } from 'native-base';
import LibGeolocation from '../libraries/LibGeolocation';

var routeStorage = ({
    data: function(){
        var storage = new Storage({
            // maximum capacity, default 1000
            size: 1000,

            // Use AsyncStorage for RN, or window.localStorage for web.
            // If not set, data would be lost after reload.
            storageBackend: AsyncStorage,

            // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
            // can be null, which means never expire.
            defaultExpires: 1000 * 3600 * 24,

            // cache data in the memory. default is true.
            enableCache: true,

            // if data was not found in storage or expired,
            // the corresponding sync method will be invoked and return
            // the latest data.
            sync : {
                // we'll talk about the details later.
            }
        })

        storage.load({
            key: 'routes',

            // autoSync(default true) means if data not found or expired,
            // then invoke the corresponding sync method
            autoSync: true,

            // syncInBackground(default true) means if data expired,
            // return the outdated data first while invoke the sync method.
            // It can be set to false to always return data provided by sync method when expired.(Of course it's slower)
            syncInBackground: true,

            // you can pass extra params to sync method
            // see sync example below for example
            syncParams: {
                extraFetchOptions: {
                    // blahblah
                },
                someFlag: true,
            },
        }).then(ret => {
            // found data go to then()
            return  ret.routeTab
        }).catch(err => {
            // any exception including data not found
            // goes to catch()
            // console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                // TODO;
                break;
                case 'ExpiredError':
                // TODO
                break;
            }
        })
    }
})

export default class RouterMain extends Component {
    logout(navigation) {
        AsyncStorage.clear();
        navigation.navigate('Intro');
        LibGeolocation.unwatch();
    }
}

const Route = new RouterMain();

export const AttendenceIndex = StackNavigator({
    RouterAttendence: {
        screen: RouterAttendence,
        navigationOptions: {
            header: false
        }
    }
})

export const CommisionIndex = StackNavigator({
    RouterCommision: {
        screen: RouterCommision,
        navigationOptions: {
            headerStyle: styles.header_menu,
            headerTitleStyle: styles.header_title,
            headerTintColor: '#fff',
            title: 'Income',
        },
    },
    CommisionDetail: {
        screen: CommisionDetail
    },
    CommisionWithdraw: {
        screen: CommisionWithdraw,
        navigationOptions: {
            headerStyle: styles.header_menu,
            headerTitleStyle: styles.header_title,
            headerTintColor: '#fff',
            title: 'Income Withdraw',
        },
    }
})

export const ServiceJobIndex = StackNavigator({
    Router: {
        screen: Router,
    }
},{
    navigationOptions: {
        header: false
    }
})

// Timeline
export const TimelineIndex = StackNavigator({
    Timeline: {
        screen: Timeline,
        navigationOptions: ({ navigation }) => ({
            headerStyle: styles.header_menu,
            headerTitleStyle: styles.header_title,
            headerTintColor: '#fff',
            title: 'Home Timeline',
            headerRight: <Icons name="md-exit" style={{alignSelf: 'center', color: '#fff', marginRight: 20}} onPress={() => Route.logout(navigation)}/>,
        }),
    },
    TimelineDetail: {
        screen: TimelineDetail,
        navigationOptions: {
            headerStyle: styles.header_menu,
            headerTitleStyle: styles.header_title,
            headerTintColor: '#fff',
            title: 'Home Timeline',
        }
    }
})


export const FeedMechanic = TabNavigator({
    TimelineIndex: {
        screen: TimelineIndex,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon:  ({tintColor}) => <Icon name="home" color={tintColor} size={24}/>
        }
    },
    ServiceJobIndex: {
        screen: ServiceJobIndex,
        navigationOptions: {
            tabBarLabel: 'Job',
            tabBarIcon:  ({tintColor}) => <Image source={require('../assets/images/icons/icon-service-jobs.png')} style={{width: 24,height: 24, tintColor: tintColor}}/>,
            tabBarLabelStyle: {
                fontSize: 2
            }
        }
    },
    AttendenceIndex: {
        screen: AttendenceIndex,
        navigationOptions: {
            tabBarLabel: 'Attendence',
            tabBarIcon:  ({tintColor}) => <Image source={require('../assets/images/icons/icon-clock.png')} style={{width: 24,height: 24, tintColor: tintColor}}/>
        }
    },
    CommisionIndex: {
        screen: CommisionIndex,
        navigationOptions: {
            tabBarLabel: 'Income',
            tabBarIcon:  ({tintColor}) => <Icon name="money" type="font-awesome"  color={tintColor} size={24}/>
        }
    }
},{
    lazy: true,
    navigationOptions: {
        tabBarVisible:  routeStorage.data()
    },
    tabBarPosition: 'bottom',
    tabBarOptions: {
        style: {
            backgroundColor: '#3E3C3C',
        },
        indicatorStyle: {
            backgroundColor: '#fff',
            height: 4,
            alignContent: 'center'
        },
        labelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            padding: 0,
            margin: 0,
        },
        iconStyle: {
            width: 24,
        },
        activeTintColor: '#fff',
        scrollEnabled: false,
        showIcon: true,
        upperCaseLabel: false,
        pressColor: 'transparent'
    },
    swipeEnabled: false,
    animationEnabled: false,

})


export const Reset  = StackNavigator({
    EmailSent: {
        screen: EmailSent,
        navigationOptions: {
            header: false
        }
    },
    ResetPassword: {
        screen: ResetPassword,
        navigationOptions: {
            header: false
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: {
                visible: false
            }
        }
    }
})

// Main Router
export const Stack = StackNavigator({
    Intro: {
        screen: Intro,
        navigationOptions: {
            header: false
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: false
        }
    },
    Reset: {
        screen: Reset,
        navigationOptions: {
            header: false
        }
    },
    FeedMechanic: {
        screen: FeedMechanic,
        navigationOptions: {
            header: false,
        }
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
