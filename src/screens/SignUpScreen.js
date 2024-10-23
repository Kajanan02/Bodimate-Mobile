import React, {useState} from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Modal,
    TouchableWithoutFeedback,
    PanResponder,
    Animated,
    ScrollView,
    StyleSheet,
} from "react-native";
import globalStyles from "../styles/globalStyles";
import FormHandler from "../utils/FormHandler";
import {signupValidate} from "../utils/validation";
import Feather from "react-native-vector-icons/Feather";
import LOGO from "../../assets/logo.png";
import axios from "axios";
import {BASE_URL} from "../utils/Enum";
import Toast from "react-native-toast-message";
import {storeData} from "../utils/utils";
import {CommonActions} from "@react-navigation/native";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";

function SignUpScreen({navigation}) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [translateY] = useState(new Animated.Value(0));
    const [isUploading, setIsUploading] = useState(false)

    const {values, errors, handleChange, handleSubmit,
        setValue
    } = FormHandler(register, signupValidate);


    function imageUpload(file, key) {
        console.log("File")

        setIsUploading(true)
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "xi7icexi")
        data.append("cloud_name", "dacrccjrm")
        axios.put("https://api.cloudinary.com/v1_1/dacrccjrm/image/upload", data)
            .then((res) => {
                console.log(res.data.url)
                setValue({[key]: res.data.url})
            }).finally(() => setIsUploading(false))
    }


    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 10,
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
        launchImageLibrary({mediaType: "photo"}, (response) => {
            if (response.assets && response.assets.length > 0) {
                setProfileImage(response.assets[0].uri);
                // imageUpload(response.assets[0],"profilePic");
                setValue({"profilePic": response.assets[0].uri})

            }
            closeBottomSheet();
        });
    };

    const takePhoto = () => {
        launchCamera({mediaType: "photo"}, (response) => {
            if (response.assets && response.assets.length > 0) {
                setProfileImage(response.assets[0].uri);
            }
            closeBottomSheet();
        });
    };

    function register() {
        setIsLoading(true);
        axios.post(`${BASE_URL}/users/register`, values)
            .then((res) => {
                Toast.show({
                    type: "success",
                    text1: "SignUp Successful",
                });
                storeData("user", JSON.stringify(res.data)).then(() => {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{name: "Login"}],
                        })
                    );
                });
            })
            .catch(() => {
                Toast.show({
                    type: "error",
                    text1: "Sign Up Failed",
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    console.log(values)

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
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

                <TextInputField label="First Name" name="firstName" handleChange={handleChange} value={values.firstName}
                                errors={errors.firstName}/>
                <TextInputField label="Last Name" name="lastName" handleChange={handleChange} value={values.lastName}
                                errors={errors.lastName}/>
                <TextInputField label="Username" name="username" handleChange={handleChange} value={values.username}
                                errors={errors.username}/>
                <TextInputField label="Email" name="email" handleChange={handleChange} value={values.email}
                                errors={errors.email}/>
                <TextInputField label="Contact Number" name="contactNo" handleChange={handleChange}
                                value={values.contactNo} errors={errors.contactNo}/>
                <TextInputField label="Gender" name="gender" handleChange={handleChange} value={values.gender}
                                errors={errors.gender}/>
                <TextInputField label="Address" name="address" handleChange={handleChange} value={values.address}
                                errors={errors.address}/>
                <TextInputField label="NIC Number" name="nicNo" handleChange={handleChange} value={values.nicNo}
                                errors={errors.nicNo}/>

                <Text style={[globalStyles.textLabel, {marginTop: 20}]}>Password</Text>
                <View style={[globalStyles.textInputContainer, errors.password && {borderColor: "#FF7A7A"}]}>
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

                <Text style={[globalStyles.textLabel, {marginTop: 20}]}>Profile Picture</Text>
                <TouchableOpacity onPress={openBottomSheet} style={styles.profileImageContainer}>

                    {isUploading ? <ActivityIndicator size="small" color="#fff"/> : profileImage ? (
                        <Image source={{uri: profileImage}} style={styles.profileImage}/>
                    ) : (
                        <Feather name="user" size={40} color="gray"/>
                    )}
                </TouchableOpacity>

                <View style={styles.signUpBtn}>
                    <TouchableOpacity style={[globalStyles.primaryButton, {marginHorizontal: 20}]}
                                      onPress={handleSubmit}>
                        {isLoading ? <ActivityIndicator size="small" color="#fff"/> :
                            <Text style={{fontFamily: "Poppins-Regular"}}>Sign Up</Text>}
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeBottomSheet}
                >
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <Animated.View
                                style={[styles.bottomSheet, {transform: [{translateY}]}]}
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
                                                      onPress={() => setProfileImage(null)}>
                                        <Text style={styles.buttonText}>Remove photo</Text>
                                    </TouchableOpacity>
                                )}
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    )
        ;
}

const TextInputField = ({label, name, handleChange, value, errors}) => (
    <>
        <Text style={[globalStyles.textLabel, {marginTop: 20}]}>{label}</Text>
        <View style={[globalStyles.textInputContainer, errors && {borderColor: "#FF7A7A"}]}>
            <TextInput
                style={globalStyles.textInputStyle}
                placeholder={`Enter ${label.toLowerCase()}`}
                placeholderTextColor="gray"
                underlineColorAndroid="transparent"
                onChangeText={(text) => handleChange(name, text)}
                value={value}
            />
        </View>
        {errors && <Text style={globalStyles.errorMsg}>{errors}</Text>}
    </>
);

const styles = StyleSheet.create({
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
    signUpBtn: {
        marginVertical: 20,
    }
});

export default SignUpScreen;
