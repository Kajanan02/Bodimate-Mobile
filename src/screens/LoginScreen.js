import React, {useState} from "react";
import {Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import globalStyles from "../styles/globalStyles";
import FormHandler from "../utils/FormHandler";
import {loginValidate} from "../utils/validation";
import Feather from "react-native-vector-icons/Feather";
import LOGO from "../../assets/logo.png";
import axios from "axios";
import {BASE_URL} from "../utils/Enum";
import Toast from "react-native-toast-message";
import {storeData} from "../utils/utils";
import {CommonActions} from "@react-navigation/native";

function LoginScreen({navigation}) {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const {
        values,
        errors,
        handleChange,
        initForm,
        handleSubmit,
    } = FormHandler(login, loginValidate);

    function login() {
        setIsLoading(true);
        axios.post(`${BASE_URL}/users/login`, values)
            .then((res) => {
                console.log(res.data);
                Toast.show({
                    type: 'success',
                    text1: 'Login Successful',
                });
                storeData("user", JSON.stringify(res.data)).then(() => {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Main' }],
                        })
                    );
                });
                // navigation.navigate("Main");
            }).catch((err) => {
            Toast.show({
                type: 'error',
                text1: 'Your email or password is incorrect',
            });
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        });

    }


    return (
        <View style={globalStyles.container}>
            <View style={{flexDirection: "row", marginVertical: 20, alignItems: "center"}}>
                <Image source={LOGO} style={{width: 100, height: 100}}/>
                <Text style={{
                    fontFamily: "Poppins-SemiBold",
                    fontSize: 24,
                    color: "#000",
                    marginTop: 10,
                    marginLeft: 16
                }}>Bodimate</Text>
            </View>
            <Text style={globalStyles.textLabel}>Username</Text>
            <View
                accessible={true}
                style={[globalStyles.textInputContainer, errors.email && {borderColor: "#FF7A7A"}]}>
                <TextInput
                    style={globalStyles.textInputStyle}
                    placeholder="Enter username"
                    placeholderTextColor="gray"
                    underlineColorAndroid="transparent"
                    onChangeText={(username) => {

                        handleChange("email", username.toLowerCase());
                    }}
                    value={values.email}
                />
            </View>
            {errors.email && <Text style={globalStyles.errorMsg}>{errors.email}</Text>}
            <Text style={[globalStyles.textLabel, {marginTop: 20}]}>Password</Text>
            <View
                style={[globalStyles.textInputContainer, errors.password && {borderColor: "#FF7A7A"}]}>
                <TextInput
                    style={globalStyles.textInputStyle}
                    placeholder="Enter password"
                    placeholderTextColor="gray"
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => handleChange("password", text)}
                    value={values.password}
                    secureTextEntry={!isPasswordVisible}
                />


                <TouchableOpacity
                    style={{justifyContent: "center", paddingVertical: 5, paddingRight: 10}}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <Feather name={isPasswordVisible ? "eye-off" : "eye"} size={20} color="gray"/>
                </TouchableOpacity>

            </View>
            {errors.password && <Text style={globalStyles.errorMsg}>{errors.password}</Text>}

            <TouchableOpacity
                style={globalStyles.primaryButton}
                onPress={handleSubmit}
            >{isLoading ? <ActivityIndicator size="small" color="#fff"/> :
                <Text style={{fontFamily: "Poppins-Regular"}}>Login</Text>}</TouchableOpacity>
        </View>
    );
}

export default LoginScreen;
