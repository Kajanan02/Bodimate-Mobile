import React, {useState, useRef} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {SCREEN_HEIGHT} from "../utils/Enum";

const AddGuestBottomSheet = ({visible, onClose, onSave}) => {
    const [guestCount, setGuestCount] = useState(1);
    const intervalRef = useRef(null);

    const increaseGuests = () => {
        setGuestCount(prevCount => (prevCount < 20 ? prevCount + 1 : 20));
    };

    const decreaseGuests = () => {
        setGuestCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
    };

    const startLongPress = (action) => {
        intervalRef.current = setInterval(action, 100);
    };

    const stopLongPress = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    const handleSave = () => {
        onSave(guestCount);
        onClose();
    };

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
                                <Text style={[styles.title, styles.titleWithBackButton]}>
                                    Add guests
                                </Text>
                                <View style={styles.spacer}/>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={onClose}
                                >
                                    <Feather name="x" size={24} color="#000000"/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.body}>
                                <View style={styles.row}>
                                    <TouchableOpacity
                                        style={[styles.button, guestCount === 1 && styles.buttonDisabled]}
                                        onPress={decreaseGuests}
                                        onLongPress={() => startLongPress(decreaseGuests)}
                                        onPressOut={stopLongPress}
                                        disabled={guestCount === 1}
                                    >
                                        <Feather name="minus" size={18}
                                                 color={guestCount === 1 ? '#d3d3d3' : '#ffffff'}/>
                                    </TouchableOpacity>
                                    <Text style={styles.guestText}>
                                        {guestCount > 1 ? `${guestCount} guests` : '1 guest'}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={increaseGuests}
                                        onLongPress={() => startLongPress(increaseGuests)}
                                        onPressOut={stopLongPress}
                                    >
                                        <Feather name="plus" size={18} color='#ffffff'/>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                    <Text style={styles.saveButtonText}>Save</Text>
                                </TouchableOpacity>
                            </View>
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
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 0.8,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
        flexShrink: 1,
    },
    titleWithBackButton: {
        marginLeft: 8,
    },
    closeButton: {
        padding: 8,
    },
    spacer: {
        flex: 1,
    },
    body: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#024950',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#d3d3d3',
    },
    guestText: {
        fontSize: 18,
        color: '#000000',
        fontWeight: '500',
    },
    saveButton: {
        backgroundColor: "#024950",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 10,
    },
    saveButtonText: {
        color: "#ffffff",
        fontSize: 16,
    },
});

export default AddGuestBottomSheet;
