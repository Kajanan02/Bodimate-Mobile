import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AddPaymentMethodBottomSheet from "../../src/components/AddPaymentMethodBottomSheet";

function PaymentMethodsScreen({ navigation }) {
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

    const handleOpenBottomSheet = () => {
        setBottomSheetVisible(true);
    };

    const handleCloseBottomSheet = () => {
        setBottomSheetVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={20} color="#000000" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.headerText}>Payment methods</Text>
                <Text style={styles.subText}>Add a payment method using our secure payment system, then start planning your boarding booking.</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleOpenBottomSheet}>
                        <Text style={styles.buttonText}>Add payment method</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <AddPaymentMethodBottomSheet
                visible={isBottomSheetVisible}
                onClose={handleCloseBottomSheet}
            />
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
        fontSize: 16,
        fontWeight: '300',
        color: '#000000',
        marginVertical: 3,
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    buttonContainer: {
        alignItems: 'flex-start',
        marginVertical: 20,
    },
    button: {
        backgroundColor: "#024950",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "600",
    },
});

export default PaymentMethodsScreen;
