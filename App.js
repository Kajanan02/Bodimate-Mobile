import React, {useEffect} from "react";
import {StyleSheet} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import BoardingDetailsScreen from "./src/screens/BoardingDetailsScreen";
import TabsNavigation from "./src/navigations/tabs-navigation";
import PersonalInfoScreen from "./src/screens/PersonalInfoScreen";
import LoginSecurityScreen from "./src/screens/LoginSecurityScreen";
import PaymentsPayoutsScreen from "./src/screens/PaymentsPayoutsScreen";
import PaymentMethodsScreen from "./src/screens/PaymentMethodsScreen";
import YourPaymentsScreen from "./src/screens/YourPaymentsScreen";
import NotificationsSettingsScreen from "./src/screens/NotificationsSettingsScreen";
import ConfirmAndPayScreen from "./src/screens/ConfirmAndPayScreen";
import ChatScreen from "./src/screens/ChatScreen";
import OwnerBoardingDetailsScreen from "./src/screens/OwnerBoardingDetailsScreen";
import Toast from "react-native-toast-message";
import {Provider} from "react-redux";
import store from "./src/redux/store";
import SignUpScreen from "./src/screens/SignUpScreen";
import BodimateYourHomeScreen from "./src/screens/BodimateYourHomeScreen";

const Stack = createNativeStackNavigator();

function App() {


    useEffect(() => {
        console.log("App.js")
    }, []);


    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false,
                }}>
                    <Stack.Screen name="Main" component={TabsNavigation}/>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="SignUp" component={SignUpScreen}/>
                    <Stack.Screen name="BoardingDetails" component={BoardingDetailsScreen}/>
                    <Stack.Screen name="Chat" component={ChatScreen}/>
                    <Stack.Screen name="ConfirmAndPay" component={ConfirmAndPayScreen}/>
                    <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen}/>
                    <Stack.Screen name="LoginSecurity" component={LoginSecurityScreen}/>
                    <Stack.Screen name="PaymentsPayouts" component={PaymentsPayoutsScreen}/>
                    <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen}/>
                    <Stack.Screen name="YourPayments" component={YourPaymentsScreen}/>
                    <Stack.Screen name="NotificationsSettings" component={NotificationsSettingsScreen}/>
                    <Stack.Screen name="OwnerBoardingDetails" component={OwnerBoardingDetailsScreen}/>
                    <Stack.Screen name="BodimateYourHome" component={BodimateYourHomeScreen}/>
                </Stack.Navigator>
                <Toast/>
            </NavigationContainer>
        </Provider>

    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "600",
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: "400",
    },
    highlight: {
        fontWeight: "700",
    },
});

export default App;
