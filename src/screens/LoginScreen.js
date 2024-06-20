import React, { useState } from "react";
import { Text, View ,TextInput,TouchableOpacity} from "react-native";
import globalStyles from "../styles/globalStyles";
import FormHandler from "../utils/FormHandler";
import { loginValidate } from "../utils/validation";
import Feather from "react-native-vector-icons/Feather";

function LoginScreen({ navigation }) {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    values,
    errors,
    handleChange,
    initForm,
    handleSubmit,
  } = FormHandler(login, loginValidate);

  function login() {

    navigation.navigate("Main");
  }

  return (
    <View style={globalStyles.container}>
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
            handleChange("email", username);
          }}
          value={values.email}
        />
      </View>
      {errors.email && <Text style={globalStyles.errorMsg}>{errors.email}</Text>}
      <Text style={[globalStyles.textLabel,{marginTop:20}]}>Password</Text>
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
          style={{justifyContent: "center", paddingVertical: 5,paddingRight:10}}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Feather name={isPasswordVisible ? "eye-off" : "eye"} size={20} color="gray" />
        </TouchableOpacity >

      </View>
      {errors.password &&<Text style={globalStyles.errorMsg}>{errors.password}</Text>}

      <TouchableOpacity
        style={globalStyles.primaryButton}
        onPress={handleSubmit}
      ><Text style={{  fontFamily: "Poppins-Regular"}}>Login</Text></TouchableOpacity>
    </View>
  );
}

export default LoginScreen;
