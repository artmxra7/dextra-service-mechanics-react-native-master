import React, { Component } from 'react';
import {
    TouchableNativeFeedback,
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
} from 'react-native';

import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import CameraItem from './CameraItem';
import Input from './Input';

export default class ModalAttendance extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            isOpen,
            isReadOnly,
            onPressCamera,
            onPressClose,
            onInsert,
            images,
            form
        } = this.props;

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={isOpen}
                onRequestClose={() => {}}>
                <ScrollView style={styles.container}>
                    <TouchableWithoutFeedback onPress={onPressClose}>
                        <View style={styles.close}>
                            <Icon
                                name="close"
                                type="font-awesome"
                                color="#bbb"
                                size={16} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.label}>Activity Picture</Text>
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16}}>
                            <CameraItem onPress={() => onPressCamera(0)} image={images[0]} isReadOnly={isReadOnly} />
                            <CameraItem onPress={() => onPressCamera(1)} image={images[1]} isReadOnly={isReadOnly} />
                            <CameraItem onPress={() => onPressCamera(2)} image={images[2]} isReadOnly={isReadOnly} />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16}}>
                            <CameraItem onPress={() => onPressCamera(3)} image={images[3]} isReadOnly={isReadOnly} />
                            <CameraItem onPress={() => onPressCamera(4)} image={images[4]} isReadOnly={isReadOnly} />
                            <CameraItem onPress={() => onPressCamera(5)} image={images[5]} isReadOnly={isReadOnly} />
                        </View>
                    </View>
                    <Text style={styles.label}>Notes</Text>
                    <Input
                        style={{ backgroundColor: '#eee' }}
                        value={form.notes}
                        editable={!isReadOnly}
                        onChangeText={(text) => onInsert('notes', text)} />
                    <Text style={styles.label}>Recommendations</Text>
                    <Input
                        style={{ backgroundColor: '#eee' }}
                        value={form.recommendations}
                        editable={!isReadOnly}
                        onChangeText={(text) => onInsert('recommendations', text)} />
                </ScrollView>
            </Modal>
        );
    }
}

ModalAttendance.propTypes = {
    isOpen: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    onPressCamera: PropTypes.func,
    onPressClose: PropTypes.func
};

ModalAttendance.defaultProps = {
    isOpen: false,
    isReadOnly: false,
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: 'white'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 12
    },
    close: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3
    },
});
