import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import InboxScreen from "../screens/InboxScreen";
import BookingScreen from "../screens/BookingScreen";
import Feather from "react-native-vector-icons/Feather";
import { StyleSheet, Text } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import LoginScreen from "../screens/LoginScreen";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getData} from "../utils/utils";
import {userDataUpdate} from "../redux/features/userDataSlice";

const Tab = createBottomTabNavigator();

function TabsNavigation() {


    const dispatch = useDispatch();


    useEffect(() => {
        getData("user").then((res) => {
            console.log(res, "res")
            let userData = JSON.parse(res);
            dispatch(userDataUpdate(userData))
        })
    }, []);

    return (
        <Tab.Navigator sceneContainerStyle={{backgroundColor: "#fff"}} screenOptions={({route}) => ({
            headerShown: false,
            tabBarStyle: {
                height: 60,
                backgroundColor: "#fff",
                borderTopWidth: 0.2,
            },
        })}>
            <Tab.Screen
                options={{
                    tabBarLabel: ({focused, color, size}) => (
                        <Text style={[styles.tabBarLabel, {color: focused ? "#024950" : "#808080"}]}>Explore</Text>
                    ),
                    tabBarIcon: ({focused, color, size}) => (
                        <Feather name="search" color={focused ? "#024950" : "#808080"} size={size}/>
                    ),
                }} name="Home" component={HomeScreen}/>

      <Tab.Screen   options={{
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={[styles.tabBarLabel,{ color: focused ? "#024950" : "#808080" }]}>Wishlists</Text>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="heart" color={focused ? "#024950" : "#808080"} size={size} />
          ),
        }} name="Wishlists" component={HomeScreen} />
      <Tab.Screen   options={{
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={[styles.tabBarLabel,{ color: focused ? "#024950" : "#808080" }]}>Bookings</Text>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="book" color={focused ? "#024950" : "#808080"} size={size} />
          ),
        }} name="Bookings" component={BookingScreen} />
      <Tab.Screen   options={{
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={[styles.tabBarLabel,{ color: focused ? "#024950" : "#808080" }]}>Inbox</Text>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="inbox" color={focused ? "#024950" : "#808080"} size={size} />
          ),
        }} name="Inbox" component={InboxScreen} />
      <Tab.Screen   options={{
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={[styles.tabBarLabel,{ color: focused ? "#024950" : "#808080" }]}>Profile</Text>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" color={focused ? "#024950" : "#808080"} size={size} />
          ),
        }} name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 14, fontWeight: "500", marginTop: -10, marginBottom: 5,
  },
  tabBarStyle: {

  },
});

export default TabsNavigation;
