import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import LOGO from '../../assets/logo.png';
import globalStyles from '../styles/globalStyles';

function SignUpMethodScreen({navigation}) {
    return (
        <View style={globalStyles.container}>
            <View style={{flexDirection: 'row', marginVertical: 20, alignItems: 'center'}}>
                <Image source={LOGO} style={{width: 100, height: 100}}/>
                <Text
                    style={{
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: 24,
                        color: '#000',
                        marginTop: 10,
                        marginLeft: 16,
                    }}
                >
                    Bodimate
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={globalStyles.primaryButton}
                    // onPress={() => navigation.navigate('StudentCardSignUpScreen')}
                >
                    <Text style={styles.buttonText}>Sign Up with Student Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={globalStyles.primaryButton}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Manual Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
});

export default SignUpMethodScreen;
