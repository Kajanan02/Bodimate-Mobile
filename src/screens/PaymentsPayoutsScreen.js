import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

function PaymentsPayoutsScreen({navigation}) {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={20} color="#000000"/>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.headerText}>Payments & payouts</Text>
                <Text style={styles.subHeading}>Booking</Text>
                <View style={styles.section}>
                    <TouchableOpacity style={styles.settingsRow} onPress={() => navigation.navigate('PaymentMethods')}>
                        <Feather name="user" size={24} color="black" style={styles.settingsIcon}/>
                        <Text style={styles.settingsText}>Payment methods</Text>
                        <Feather name="chevron-right" size={24} color="black" style={styles.arrowIcon}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <TouchableOpacity style={styles.settingsRow} onPress={() => navigation.navigate('YourPayments')}>
                        <Feather name="list" size={24} color="black" style={styles.settingsIcon}/>
                        <Text style={styles.settingsText}>Your payments</Text>
                        <Feather name="chevron-right" size={24} color="black" style={styles.arrowIcon}/>
                    </TouchableOpacity>
                </View>
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
        marginTop: 20,
    },
    subHeading: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000',
        marginVertical: 20,
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    section: {
        position: 'relative',
    },
    settingsRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    settingsIcon: {
        marginRight: 15,
    },
    settingsText: {
        fontSize: 16,
        color: "#000000",
        flex: 1,
    },
    arrowIcon: {
        marginLeft: "auto",
    },
});

export default PaymentsPayoutsScreen;
