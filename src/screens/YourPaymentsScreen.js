import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

function YourPaymentsScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={20} color="#000000"/>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.headerText}>Your payments</Text>
                <Text style={styles.subText}>Once you have a reservation, this is where you can come to track payments and refunds.</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: 0.5,
        borderBottomColor: '#d5d5d5',
        zIndex: 10,
    },
    headerText: {
        fontSize: 26,
        fontWeight: '500',
        color: '#000000',
        marginVertical: 20,
    },
    subText: {
        fontSize: 18,
        fontWeight: '300',
        color: '#000000',
        marginTop: 20,
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    buttonContainer: {
        alignItems: 'flex-start',
        marginVertical: 20,
    },
});

export default YourPaymentsScreen;
