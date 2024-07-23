import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CountryPicker from 'react-native-country-picker-modal';
import { SCREEN_HEIGHT } from "../utils/Enum";

const PhoneNoBottomSheet = ({ visible, onClose, onSave, mode }) => {
    const [expanded, setExpanded] = useState(false);
    const [phoneNo, setPhoneNo] = useState('');
    const [countryCode, setCountryCode] = useState('US'); // Default country code
    const [viewMode, setViewMode] = useState('phoneInput'); // New state variable to control view mode
    const [otp, setOtp] = useState('');

    const getTitle = () => {
        return mode === 'add' ? 'Add Phone Number' : 'Edit Phone Number';
    };

    const handleSaveChanges = () => {
        onSave();
    };

    const handleCancelChanges = () => {
        onClose();
    };

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const renderTextPreview = () => {
        const previewText = "For notifications, reminders, and help logging in.";
        if (expanded) {
            return (
                <Text style={styles.expandedText} onPress={toggleExpand}>
                    {previewText}
                </Text>
            );
        } else {
            return (
                <Text style={styles.previewText} onPress={toggleExpand}>
                    {previewText.length > 40 ? previewText.substring(0, 40) + '...' : previewText}
                </Text>
            );
        }
    };

    const handleCountryChange = (country) => {
        setCountryCode(country.cca2);
    };

    const handleContinue = () => {
        setViewMode('otpInput');
    };

    const handleBack = () => {
        setViewMode('phoneInput');
    };

    const handleOtpContinue = () => {
        // Handle OTP verification and navigation to personal info page here
        onSave(); // This could be replaced with navigation logic
    };

    const renderPhoneInputView = () => (
        <View>
            {renderTextPreview()}
            <View style={styles.phoneInputContainer}>
                <CountryPicker
                    {...{
                        countryCode,
                        withCallingCode: true,
                        withAlphaFilter: true,
                        withFilter: true,
                        withEmoji: true,
                        onSelect: handleCountryChange
                    }}
                    containerButtonStyle={styles.countryPickerButton}
                    visible={false}
                />
                <TextInput
                    style={styles.phoneInput}
                    placeholder="Enter phone number"
                    placeholderTextColor="#999999"
                    keyboardType="phone-pad"
                    onChangeText={setPhoneNo}
                    value={phoneNo}
                />
            </View>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );

    const renderOtpInputView = () => (
        <View>
            <Text style={styles.otpDescription}>
                Enter the 4-digit code Bodimate just sent to "{phoneNo}":
            </Text>
            <TextInput
                style={styles.otpInput}
                placeholder="Enter OTP"
                placeholderTextColor="#999999"
                keyboardType="numeric"
                onChangeText={setOtp}
                value={otp}
                maxLength={4}
            />
            <TouchableOpacity style={styles.continueButton} onPress={handleOtpContinue}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );

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
                                {viewMode === 'otpInput' && (
                                    <TouchableOpacity
                                        style={styles.backButton}
                                        onPress={handleBack}
                                    >
                                        <Feather name="arrow-left" size={24} color="#000000" />
                                    </TouchableOpacity>
                                )}
                                <Text style={[styles.title, viewMode === 'otpInput' && styles.titleWithBackButton]}>
                                    {getTitle()}
                                </Text>
                                <View style={styles.spacer} />
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={onClose}
                                >
                                    <Feather name="x" size={24} color="#000000" />
                                </TouchableOpacity>
                            </View>
                            <ScrollView contentContainerStyle={styles.body}>
                                {viewMode === 'phoneInput' ? renderPhoneInputView() : renderOtpInputView()}
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
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 0.8,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
        flexShrink: 1, // Allow the title to shrink if needed
    },
    titleWithBackButton: {
        marginLeft: 8, // Add a small margin for better spacing
    },
    backButton: {
        padding: 8,
    },
    closeButton: {
        padding: 8,
    },
    spacer: {
        flex: 1, // Spacer takes up remaining space to push close button to the end
    },
    body: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    previewText: {
        fontSize: 16,
        color: '#333333',
        lineHeight: 20,
    },
    expandedText: {
        fontSize: 16,
        color: '#333333',
        lineHeight: 20,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#f5f5f5',
    },
    countryPickerButton: {
        paddingHorizontal: 10,
        borderRightWidth: 0.8,
        borderColor: "#999999",
    },
    phoneInput: {
        flex: 1,
        marginLeft: 10,
        paddingTop: 10,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333333',
    },
    continueButton: {
        backgroundColor: '#024950',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginVertical: 20,
    },
    continueButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
    },
    otpDescription: {
        fontSize: 16,
        color: '#333333',
        marginVertical: 20,
    },
    otpInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333333',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
    },
});

export default PhoneNoBottomSheet;
