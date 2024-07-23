import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import globalStyles from '../styles/globalStyles';

const EditableField = ({label, value, onChangeText, placeholder, onSave, error, isEditing, onEditToggle}) => {
    const [tempValue, setTempValue] = useState(value);
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        setTempValue(value);
    }, [isEditing, value]);

    const validateInput = (inputValue) => {
        let error = '';
        if (!inputValue) {
            error = `${label} is required`;
        } else if (label === 'Email' && !/\S+@\S+\.\S+/.test(inputValue)) {
            error = 'Email is not valid';
        }
        return error;
    };

    const handleSave = () => {
        const error = validateInput(tempValue);
        if (!error) {
            onSave(tempValue);
            onEditToggle();
        } else {
            setValidationError(error);
        }
    };

    const placeholderMessages = {
        'First Name': "The first name or business name that you'd like to go by on Bodimate.",
        'Last Name': "The last name or business name that you'd like to go by on Bodimate.",
        'Username': "The username or business name that you'd like to go by on Bodimate.",
        'Email': "Your email address for communication.",
        'Address': "Your residential or business address.",
        'NIC Number': "Your National Identity Card (NIC) number.",
    };

    return (
        <View style={styles.row}>
            <View style={styles.firstLine}>
                <Text style={styles.label}>{label}</Text>
                <TouchableOpacity onPress={onEditToggle} style={styles.button}>
                    <Text style={styles.buttonText}>{isEditing ? 'Cancel' : (value ? 'Edit' : 'Add')}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.secondLine}>
                {isEditing ? placeholderMessages[label] : (value ? value : 'Not provided')}
            </Text>
            {isEditing && (
                <View style={styles.editContainer}>
                    <View style={[globalStyles.textInputContainer, validationError && {borderColor: '#FF7A7A'}]}>
                        <TextInput
                            style={globalStyles.textInputStyle}
                            placeholder={placeholder}
                            placeholderTextColor="gray"
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => {
                                setTempValue(text);
                                setValidationError('');
                            }}
                            value={tempValue}
                        />
                    </View>
                    {validationError && <Text style={globalStyles.errorMsg}>{validationError}</Text>}
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            )}
            <View style={styles.horizontalLine}/>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        marginVertical: 5,
    },
    firstLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 3,
    },
    label: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '450',
    },
    button: {},
    buttonText: {
        fontSize: 16,
        color: '#000000',
        textDecorationLine: 'underline',
        fontWeight: '500',
    },
    secondLine: {
        fontSize: 14,
        color: '#808080',
        fontWeight: '350',
    },
    editContainer: {
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: '#024950',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    saveButtonText: {
        color: '#ffffff',
        fontFamily: 'Poppins-Regular',
    },
    horizontalLine: {
        height: 1,
        backgroundColor: '#d5d5d5',
        marginVertical: 20,
    },
});

export default EditableField;
