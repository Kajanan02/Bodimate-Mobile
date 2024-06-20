import React from "react";
import { Text, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";

function HomeScreen({navigation}) {
  // const navigation = useNavigation();
  return (
    <View>
      <Text onPress={()=> navigation.navigate("Login")} style={{color:"#000"}}>Home Screen</Text>
    </View>
  );
}

export default HomeScreen;
