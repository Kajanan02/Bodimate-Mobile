import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {SCREEN_HEIGHT} from "../utils/Enum";

const AddPaymentMethodBottomSheet = ({visible, onClose}) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View style={styles.innerContainer}>
                            <View style={styles.header}>
                                <Text style={styles.title}>
                                    Add payment method
                                </Text>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={onClose}
                                >
                                    <Feather name="x" size={24} color="#000000"/>
                                </TouchableOpacity>
                            </View>
                            <ScrollView contentContainerStyle={styles.body}>

                            </ScrollView>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    innerContainer: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        maxHeight: SCREEN_HEIGHT * 0.95,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 0.8,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
    },
    closeButton: {
        padding: 8,
    },
    body: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
});

export default AddPaymentMethodBottomSheet;
