import React, {useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Image,
    TouchableWithoutFeedback,
    PanResponder,
    Animated,
    ScrollView
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";
import {CommonActions, useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
    const user = useSelector(state => state.userData?.user);

    console.log(user, "user")

    const [modalVisible, setModalVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [translateY] = useState(new Animated.Value(0));
    const navigation = useNavigation();

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
            return Math.abs(gestureState.dy) > 10;
        },
        onPanResponderMove: (_, gestureState) => {
            translateY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dy > 100) {
                closeBottomSheet();
            } else {
                Animated.spring(translateY, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            }
        },
    });

    const openBottomSheet = () => {
        setModalVisible(true);
    };

    const closeBottomSheet = () => {
        setModalVisible(false);
    };

    const pickImage = () => {
        launchImageLibrary({mediaType: 'photo', maxWidth: 200, maxHeight: 200, quality: 1}, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                setProfileImage(response.assets[0].uri);
            }
            closeBottomSheet();
        });
    };

    const takePhoto = () => {
        launchCamera({mediaType: 'photo', maxWidth: 200, maxHeight: 200, quality: 1}, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('Camera Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                setProfileImage(response.assets[0].uri);
            }
            closeBottomSheet();
        });
    };

    const removePhoto = () => {
        setProfileImage(null);
        closeBottomSheet();
    };

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.profileText}>Profile</Text>
                    <Feather name="bell" size={26} color="black" style={styles.notificationIcon}/>
                </View>
                <View style={styles.profileRow}>
                    <TouchableOpacity onPress={openBottomSheet} style={styles.profileImageContainer}>
                        {profileImage ? (
                            <Image source={{uri: profileImage}} style={styles.profileImage}/>
                        ) : (
                            <Feather name="user" size={40} color="white"/>
                        )}
                    </TouchableOpacity>
                    <View style={styles.profileInfo}>
                        <Text style={styles.firstName}>{user.username || "Guest"}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate(user.username ? 'PersonalInfo' : "Login")}>
                            <Text style={styles.descriptionText}>Show Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.horizontalLine}/>

                <Text style={styles.settingsHeading}>Settings</Text>
                {!user.username ? <View>
                        <TouchableOpacity style={styles.settingsRow} onPress={() => navigation.navigate('Login')}>
                            <Feather name="user" size={24} color="black" style={styles.settingsIcon}/>
                            <Text style={styles.settingsText}>Login</Text>
                            <Feather name="chevron-right" size={24} color="black" style={styles.arrowIcon}/>
                        </TouchableOpacity>
                        <View style={styles.horizontalSubLine}/>
                        <TouchableOpacity style={styles.settingsRow} onPress={() => navigation.navigate('SignUp')}>
                            <Feather name="user" size={24} color="black" style={styles.settingsIcon}/>
                            <Text style={styles.settingsText}>Sign Up</Text>
                            <Feather name="chevron-right" size={24} color="black" style={styles.arrowIcon}/>
                        </TouchableOpacity>
                        <View style={styles.horizontalSubLine}/>
                        <TouchableOpacity style={styles.addBoardingButton}
                                          onPress={() => navigation.navigate('BodimateYourHome')}>
                            <Text style={styles.addBoardingButtonText}>Bodimate Your Home</Text>
                        </TouchableOpacity>
                    </View> :
                    <View>
                        <TouchableOpacity style={styles.settingsRow}
                                          onPress={() => navigation.navigate('PersonalInfo')}>
                            <Feather name="user" size={24} color="black" style={styles.settingsIcon}/>
                            <Text style={styles.settingsText}>Profile information</Text>
                            <Feather name="chevron-right" size={24} color="black" style={styles.arrowIcon}/>
                        </TouchableOpacity>
                        <View style={styles.horizontalSubLine}/>
                        <TouchableOpacity style={styles.settingsRow}
                                          onPress={() => navigation.navigate('LoginSecurity')}>
                            <Feather name="shield" size={24} color="black" style={styles.settingsIcon}/>
                            <Text style={styles.settingsText}>Login & security</Text>
                            <Feather name="chevron-right" size={24} color="black" style={styles.arrowIcon}/>
                        </TouchableOpacity>
                        <View style={styles.horizontalSubLine}/>
                        <TouchableOpacity style={styles.settingsRow}
                                          onPress={() => navigation.navigate('PaymentsPayouts')}>
                            <Feather name="credit-card" size={24} color="black" style={styles.settingsIcon}/>
                            <Text style={styles.settingsText}>Payments and payouts</Text>
                            <Feather name="chevron-right" size={24} color="black" style={styles.arrowIcon}/>
                        </TouchableOpacity>
                        <View style={styles.horizontalSubLine}/>

                        <TouchableOpacity style={styles.settingsRow}
                                          onPress={() => navigation.navigate('NotificationsSettings')}>
                            <Feather name="bell" size={24} color="black" style={styles.settingsIcon}/>
                            <Text style={styles.settingsText}>Notifications</Text>
                            <Feather name="chevron-right" size={24} color="black" style={styles.arrowIcon}/>
                        </TouchableOpacity>
                        <View style={styles.horizontalSubLine}/>
                        <TouchableOpacity style={styles.settingsRow}
                                          onPress={() => {
                                              AsyncStorage.clear();
                                              navigation.dispatch(
                                                  CommonActions.reset({
                                                      index: 0,
                                                      routes: [{name: 'Login'}],
                                                  })
                                              );
                                          }}>
                            <Feather name="bell" size={24} color="black" style={styles.settingsIcon}/>
                            <Text style={styles.settingsText}>Logout</Text>
                            <Feather name="chevron-right" size={24} color="black" style={styles.arrowIcon}/>
                        </TouchableOpacity>
                        <View style={styles.horizontalSubLine}/>

                        <TouchableOpacity style={styles.addBoardingButton}
                                          onPress={() => navigation.navigate('OwnerBoardingDetails')}>
                            <Text style={styles.addBoardingButtonText}>Add Boarding</Text>
                        </TouchableOpacity>
                    </View>
                }


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeBottomSheet}
                >
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <Animated.View
                                style={[
                                    styles.bottomSheet,
                                    {
                                        transform: [{translateY}],
                                    },
                                ]}
                                {...panResponder.panHandlers}
                            >
                                <View style={styles.bottomSheetHeader}>
                                    <TouchableOpacity onPress={closeBottomSheet}>
                                        <Feather name="x" size={24} color="black"/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.profileImageContainerLarge}>
                                    {profileImage ? (
                                        <Image source={{uri: profileImage}} style={styles.profileImageLarge}/>
                                    ) : (
                                        <Feather name="user" size={80} color="white"/>
                                    )}
                                </View>
                                <TouchableOpacity style={styles.button} onPress={pickImage}>
                                    <Text style={styles.buttonText}>Select from device</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                                    <Text style={styles.buttonText}>Take a photo</Text>
                                </TouchableOpacity>
                                {profileImage && (
                                    <TouchableOpacity style={[styles.button, styles.removeButton]}
                                                      onPress={removePhoto}>
                                        <Text style={styles.buttonText}>Remove photo</Text>
                                    </TouchableOpacity>
                                )}
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    contentContainer: {},
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 40,
    },
    profileText: {
        fontSize: 30,
        fontWeight: "500",
        color: "#000000",
    },
    notificationIcon: {
        marginLeft: 10,
    },
    profileRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    profileImageContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#cccccc",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    profileInfo: {
        flex: 1,
        marginLeft: 10,
    },
    firstName: {
        fontSize: 18,
        fontWeight: "350",
        marginBottom: 2,
        color: "#000000",
    },
    descriptionText: {
        fontSize: 14,
        color: "#767676",
        fontWeight: "350",
    },
    horizontalLine: {
        height: 1,
        backgroundColor: "#d5d5d5",
        marginBottom: 10,
        marginTop: 10,
    },
    settingsHeading: {
        fontSize: 20,
        fontWeight: "500",
        color: "#000000",
        marginVertical: 20,
    },
    settingsRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    settingsIcon: {
        marginRight: 15,
    },
    settingsText: {
        fontSize: 16,
        color: "#000000",
        flex: 1,
    },
    arrowIcon: {
        marginLeft: "auto",
    },
    horizontalSubLine: {
        height: 1,
        backgroundColor: "#d5d5d5",
        marginBottom: 0,
        marginTop: 0,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    bottomSheet: {
        backgroundColor: "#ffffff",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    bottomSheetHeader: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 20,
    },
    profileImageContainerLarge: {
        alignSelf: "center",
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#cccccc",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    profileImageLarge: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    button: {
        backgroundColor: "#024950",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 10,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
    },
    removeButton: {
        backgroundColor: "#ff0000",
    },
    addBoardingButton: {
        backgroundColor: '#024950',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginTop: 30,
    },
    addBoardingButtonText: {
        color: '#ffffff',
        fontFamily: 'Poppins-Regular',
    },
});

export default ProfileScreen;
