import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const BoardingInputField = ({ placeholder, value, onChangeText }) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                placeholderTextColor="gray"
                value={value}
                onChangeText={onChangeText}
                underlineColorAndroid="transparent"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#d5d5d5",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        color: "#000000",
    },
});

export default BoardingInputField;
