import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
} from 'react-native';

import CapsuleTab from '../components/CapsuleTab';

export default class CapsuleTabList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: 0,
        };

        this.selectTab = this.selectTab.bind(this);
    }

    selectTab(index) {
        let currentIndex = this.state.currentTab;

        this.slider.scrollTo({
            x: index * 100,
        });

        this.setState({currentTab: index});

        if (this.props.onSelect) {
            this.props.onSelect(index);
        }
    }

    render() {
        let height = this.props.height || 48;

        return (
            <View style={styles.container}>
                <ScrollView
                  bounces={false}
                  decelerationRate={'fast'}
                  directionalLockEnabled
                  removeClippedSubviews
                  showsHorizontalScrollIndicator={false}
                  automaticallyAdjustContentInsets={false}
                  scrollEventThrottle={200}
                  horizontal
                  ref={(slider) => { this.slider = slider; }}>
                {this.props.data.map((title, index) => {
                  return (
                    <CapsuleTab
                        key={index}
                        active={this.state.currentTab == index}
                        onPress={() => this.selectTab(index)}>
                        {title}
                    </CapsuleTab>
                  )
                })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 4,
    },
});
