import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {personalInfoValidate} from "../../src/utils/validation";
import PhoneNoBottomSheet from '../components/PhoneNoBottomSheet';
import EditableField from '../components/EditableField';

function PersonalInfoScreen({navigation}) {
    const [firstName, setFirstName] = useState('');
    const [editFirstName, setEditFirstName] = useState(false);
    const [errorsFirstName, setErrorsFirstName] = useState({});

    const [lastName, setLastName] = useState('');
    const [editLastName, setEditLastName] = useState(false);
    const [errorsLastName, setErrorsLastName] = useState({});

    const [username, setUsername] = useState('');
    const [editUsername, setEditUsername] = useState(false);
    const [errorsUsername, setErrorsUsername] = useState({});

    const [phoneNo, setPhoneNo] = useState('');
    const [editPhoneNo, setEditPhoneNo] = useState(false);
    const [tempPhoneNo, setTempPhoneNo] = useState('');

    const [email, setEmail] = useState('');
    const [editEmail, setEditEmail] = useState(false);
    const [errorsEmail, setErrorsEmail] = useState({});

    const [address, setAddress] = useState('');
    const [editAddress, setEditAddress] = useState(false);
    const [errorsAddress, setErrorsAddress] = useState({});

    const [nicNo, setNicNo] = useState('');
    const [editNicNo, setEditNicNo] = useState(false);
    const [errorsNicNo, setErrorsNicNo] = useState({});

    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

    const handleSavePhoneNo = () => {
        const validationErrors = personalInfoValidate({phoneNo: tempPhoneNo});
        if (Object.keys(validationErrors).length > 0) {
            // setErrorsPhoneNo(validationErrors);
        } else {
            // setErrorsPhoneNo({});
            setPhoneNo(tempPhoneNo);
            setEditPhoneNo(false);
            setBottomSheetVisible(false);
        }
    };

    const handleEditTogglePhoneNo = () => {
        if (editPhoneNo) {
            setTempPhoneNo(phoneNo);
            // setErrorsPhoneNo({});
            setBottomSheetVisible(false);
        } else {
            setTempPhoneNo(phoneNo);
            setBottomSheetVisible(true);
        }
        setEditPhoneNo(!editPhoneNo);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={20} color="#000000"/>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.headerText}>Personal Info</Text>
                <View style={styles.section}>
                    <EditableField
                        label="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        placeholder="Enter first name"
                        onSave={(value) => setFirstName(value)}
                        error={errorsFirstName}
                        isEditing={editFirstName}
                        onEditToggle={() => setEditFirstName(!editFirstName)}
                    />
                    <EditableField
                        label="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        placeholder="Enter last name"
                        onSave={(value) => setLastName(value)}
                        error={errorsLastName}
                        isEditing={editLastName}
                        onEditToggle={() => setEditLastName(!editLastName)}
                    />
                    <EditableField
                        label="Username"
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Enter username"
                        onSave={(value) => setUsername(value)}
                        error={errorsUsername}
                        isEditing={editUsername}
                        onEditToggle={() => setEditUsername(!editUsername)}
                    />
                    <View style={styles.row}>
                        <View style={styles.firstLine}>
                            <Text style={styles.label}>Phone Number</Text>
                            <TouchableOpacity
                                onPress={handleEditTogglePhoneNo}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>
                                    {phoneNo ? 'Edit' : 'Add'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.secondLine}>
                            {phoneNo ? phoneNo : 'Not provided'}
                        </Text>
                    </View>
                    <View style={styles.horizontalLine}/>
                    <EditableField
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter email address"
                        onSave={(value) => setEmail(value)}
                        error={errorsEmail}
                        isEditing={editEmail}
                        onEditToggle={() => setEditEmail(!editEmail)}
                    />
                    <EditableField
                        label="Address"
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Enter address"
                        onSave={(value) => setAddress(value)}
                        error={errorsAddress}
                        isEditing={editAddress}
                        onEditToggle={() => setEditAddress(!editAddress)}
                    />
                    <EditableField
                        label="NIC Number"
                        value={nicNo}
                        onChangeText={setNicNo}
                        placeholder="Enter NIC number"
                        onSave={(value) => setNicNo(value)}
                        error={errorsNicNo}
                        isEditing={editNicNo}
                        onEditToggle={() => setEditNicNo(!editNicNo)}
                    />
                </View>
            </ScrollView>
            <PhoneNoBottomSheet
                visible={editPhoneNo}
                onClose={handleEditTogglePhoneNo}
                onSave={handleSavePhoneNo}
                tempPhoneNo={tempPhoneNo}
                setTempPhoneNo={setTempPhoneNo}
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
        color: "#000000",
        marginVertical: 20,
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    section: {
        position: 'relative',
    },
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
        fontWeight: "450",
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
        fontWeight: "350",
    },
    horizontalLine: {
        height: 1,
        backgroundColor: "#d5d5d5",
        marginVertical: 20,
    },
});

export default PersonalInfoScreen;
