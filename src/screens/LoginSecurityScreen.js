import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import globalStyles from '../styles/globalStyles';
import {loginSecurityValidate} from '../../src/utils/validation';
import FormHandler from '../utils/FormHandler';

function LoginSecurityScreen({navigation}) {
    const [password, setPassword] = useState('');
    const [tempPassword, setTempPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [editPassword, setEditPassword] = useState(false);
    const [errorsPassword, setErrorsPassword] = useState({});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const {
        values,
        errors,
        handleChange,
        initForm,
    } = FormHandler(() => {
    }, loginSecurityValidate);

    const handleSavePassword = () => {
        const validationErrors = loginSecurityValidate({password: tempPassword});
        if (Object.keys(validationErrors).length > 0) {
            setErrorsPassword(validationErrors);
        } else {
            setErrorsPassword({});
            setPassword(tempPassword);
            setEditPassword(false);
        }
    };

    const handleEditTogglePassword = () => {
        setEditPassword(!editPassword);
        setTempPassword(password);
        if (!editPassword) {
            initForm({password: ''});
        }
        setErrorsPassword({});
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={20} color="#000000"/>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.headerText}>Login & security</Text>
                <Text style={styles.loginHeading}>Login</Text>
                <View style={styles.section}>
                    <View style={styles.row}>
                        <View style={styles.firstLine}>
                            <Text style={styles.label}>Password</Text>
                            <TouchableOpacity onPress={handleEditTogglePassword} style={styles.button}>
                                <Text style={styles.buttonText}>{editPassword ? 'Cancel' : 'Update'}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.secondLine}>
                            {editPassword
                                ? "The password you would like to use for your Bodimate account."
                                : password
                                    ? 'Last updated 2 months ago'
                                    : 'Not provided'}
                        </Text>
                        {editPassword && (
                            <View style={styles.editContainer}>
                                <Text style={styles.textLabel}>Current password</Text>
                                <View
                                    style={[
                                        globalStyles.textInputContainer,
                                        errorsPassword.password && {borderColor: '#FF7A7A'},
                                    ]}
                                >
                                    <TextInput
                                        style={globalStyles.textInputStyle}
                                        placeholder="Enter password"
                                        placeholderTextColor="gray"
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => handleChange('password', text)}
                                        value={values.password}
                                        secureTextEntry={!isPasswordVisible}
                                    />
                                    <TouchableOpacity
                                        style={{justifyContent: 'center', paddingVertical: 5, paddingRight: 10}}
                                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                    >
                                        <Feather name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color="gray"/>
                                    </TouchableOpacity>
                                </View>
                                {errorsPassword.password && (
                                    <Text style={globalStyles.errorMsg}>{errorsPassword.password}</Text>
                                )}
                                <TouchableOpacity style={styles.linkButton} onPress={() => {
                                }}>
                                    <Text style={styles.linkButtonText}>Need a new password?</Text>
                                </TouchableOpacity>
                                <Text style={styles.textLabel}>New password</Text>
                                <View
                                    style={[
                                        globalStyles.textInputContainer,
                                        errorsPassword.newPassword && {borderColor: '#FF7A7A'},
                                    ]}
                                >
                                    <TextInput
                                        style={globalStyles.textInputStyle}
                                        placeholder="Enter new password"
                                        placeholderTextColor="gray"
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => setNewPassword(text)}
                                        value={newPassword}
                                        secureTextEntry={!isNewPasswordVisible}
                                    />
                                    <TouchableOpacity
                                        style={{justifyContent: 'center', paddingVertical: 5, paddingRight: 10}}
                                        onPress={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                                    >
                                        <Feather name={isNewPasswordVisible ? 'eye-off' : 'eye'} size={20}
                                                 color="gray"/>
                                    </TouchableOpacity>
                                </View>
                                {errorsPassword.newPassword && (
                                    <Text style={globalStyles.errorMsg}>{errorsPassword.newPassword}</Text>
                                )}
                                <Text style={styles.textLabel}>Confirm password</Text>
                                <View
                                    style={[
                                        globalStyles.textInputContainer,
                                        errorsPassword.confirmPassword && {borderColor: '#FF7A7A'},
                                    ]}
                                >
                                    <TextInput
                                        style={globalStyles.textInputStyle}
                                        placeholder="Confirm new password"
                                        placeholderTextColor="gray"
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => setConfirmPassword(text)}
                                        value={confirmPassword}
                                        secureTextEntry={!isConfirmPasswordVisible}
                                    />
                                    <TouchableOpacity
                                        style={{justifyContent: 'center', paddingVertical: 5, paddingRight: 10}}
                                        onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                    >
                                        <Feather name={isConfirmPasswordVisible ? 'eye-off' : 'eye'} size={20}
                                                 color="gray"/>
                                    </TouchableOpacity>
                                </View>
                                {errorsPassword.confirmPassword && (
                                    <Text style={globalStyles.errorMsg}>{errorsPassword.confirmPassword}</Text>
                                )}
                                <TouchableOpacity style={styles.saveButton} onPress={handleSavePassword}>
                                    <Text style={styles.saveButtonText}>Update password</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <View style={styles.horizontalLine}/>
                    <Text style={styles.loginHeading}>Account</Text>
                    <View style={styles.deactivateSection}>
                        <Text style={styles.deactivateText}>Deactivate your account</Text>
                        <TouchableOpacity onPress={() => {}} style={styles.deactivateButton}>
                            <Text style={styles.deactivateButtonText}>Deactivate</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.horizontalLine}/>
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
        marginVertical: 20,
    },
    loginHeading: {
        fontSize: 24,
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
    horizontalLine: {
        height: 1,
        backgroundColor: '#d5d5d5',
        marginVertical: 20,
    },
    editContainer: {
        marginTop: 20,
    },
    textLabel: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
        alignSelf: "flex-start",
        color: "#000000",
        marginTop: 6,
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
    linkButton: {
        marginTop: 10,
    },
    linkButtonText: {
        color: '#0000EE',
        textDecorationLine: 'underline',
        marginBottom: 20,
    },
    deactivateSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    deactivateText: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '450',
    },
    deactivateButton: {
        backgroundColor: 'transparent',
    },
    deactivateButtonText: {
        fontSize: 16,
        color: '#FF0000',
        fontWeight: '500',
    },
});

export default LoginSecurityScreen;
