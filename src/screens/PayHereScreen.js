import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Alert, Image } from 'react-native';
import Feather from "react-native-vector-icons/Feather";
import { SCREEN_WIDTH } from "../utils/Enum";
import {CardDetailsValidate} from "../utils/validation";

function PayHereScreen({ navigation, route }) {
    const { totalAmount } = route.params;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [errors, setErrors] = useState({});

    const initiatePayment = () => {
        setBottomSheetVisible(true);
    };

    const handlePayNow = () => {
        const validationErrors = CardDetailsValidate(cardDetails);
        if (Object.keys(validationErrors).length === 0) {
            Alert.alert("Payment Process", "Replace with payment API integration.");
            setBottomSheetVisible(false);
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={20} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Select payment method</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Payment Details</Text>
                <Text style={styles.amount}>Total Amount: Rs. {totalAmount}</Text>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <TouchableOpacity style={styles.button} onPress={initiatePayment}>
                        <Text style={styles.buttonText}>Pay Now</Text>
                    </TouchableOpacity>
                )}
                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isBottomSheetVisible}
                onRequestClose={() => setBottomSheetVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.bottomSheet}>
                        <View style={styles.sheetHeader}>
                            <Image
                                source={require('../../assets/PaymentDetails/payhere_banner.png')}
                                style={styles.bannerImage}
                            />
                            <Text style={styles.sheetTitle}>Add card details</Text>
                        </View>

                        <TextInput
                            style={[styles.input, errors.cardNumber && styles.errorInput]}
                            placeholder="Card Number"
                            placeholderTextColor="#888888"
                            keyboardType="numeric"
                            value={cardDetails.cardNumber}
                            onChangeText={(text) => setCardDetails({ ...cardDetails, cardNumber: text })}
                        />
                        {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber}</Text>}

                        <View style={styles.row}>
                            <TextInput
                                style={[styles.input, styles.halfInput, errors.expiryDate && styles.errorInput]}
                                placeholder="Expiry (MM/YY)"
                                placeholderTextColor="#888888"
                                value={cardDetails.expiryDate}
                                onChangeText={(text) => setCardDetails({ ...cardDetails, expiryDate: text })}
                            />


                            <TextInput
                                style={[styles.input, styles.halfInput, errors.cvv && styles.errorInput]}
                                placeholder="CVV"
                                placeholderTextColor="#888888"
                                secureTextEntry={true}
                                keyboardType="numeric"
                                value={cardDetails.cvv}
                                onChangeText={(text) => setCardDetails({ ...cardDetails, cvv: text })}
                            />

                        </View>

                        <View style={styles.row}>
                            <View style={styles.errorContainer}>
                                {errors.expiryDate && <Text style={styles.errorText}>{errors.expiryDate}</Text>}
                            </View>
                            <View style={styles.errorContainer}>
                                {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}
                            </View>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handlePayNow}>
                            <Text style={styles.buttonText}>Pay Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
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
    },
    headerText: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 30,
        color: "#000000",
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#000000",
    },
    amount: {
        fontSize: 18,
        marginTop: 20,
        color: "#000000",
    },
    button: {
        backgroundColor: '#024950',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginHorizontal: 5,
        marginVertical: 5,
        fontSize: 14,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bottomSheet: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    sheetHeader: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    bannerImage: {
        width: '100%',
        height: 50,
        resizeMode: 'contain',
    },
    sheetTitle: {
        fontSize: 20,
        fontWeight: '400',
        marginBottom: 20,
        color: '#000000',
    },
    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
        color: '#000000',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        flex: 0.48,
        marginBottom: 10,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
    },

});

export default PayHereScreen;
