import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButtonGroup = ({ label, selectedValue, options, onSelect }) => {
    return (
        <View style={styles.radioGroupContainer}>
            <Text style={styles.radioGroupLabel}>{label}</Text>
            {options.map((option) => (
                <TouchableOpacity
                    key={option.value}
                    style={styles.radioButton}
                    onPress={() => onSelect(option.value)}
                >
                    <View style={[styles.radioOuter, selectedValue === option.value && styles.radioSelected]}>
                        {selectedValue === option.value && <View style={styles.radioInner} />}
                    </View>
                    <View style={styles.radioTextContainer}>
                        <Text style={styles.radioText}>{option.label}</Text>
                        <Text style={styles.radioSubText}>{option.subText}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    radioGroupContainer: {
        marginTop: 20,
        width: '100%',
    },
    radioGroupLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "#000000",
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#000000',
    },
    radioSelected: {
        borderColor: '#000000',
    },
    radioTextContainer: {
        flex: 1,
    },
    radioText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
    },
    radioSubText: {
        fontSize: 12,
        color: '#767676',
    },
});

export default RadioButtonGroup;
