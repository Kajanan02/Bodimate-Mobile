import React, {useState} from "react";
import {
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    PermissionsAndroid,
    Platform,
    Alert
} from "react-native";
import RadioButtonGroup from "../components/RadioButtonGroup";
import {boardingDetailsValidate} from "../utils/validation";
import globalStyles from "../styles/globalStyles";
import {MultiSelect, Dropdown} from 'react-native-searchable-dropdown-kj';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SCREEN_WIDTH} from "../utils/Enum";
import {launchImageLibrary} from 'react-native-image-picker';

const OwnerBoardingDetailsScreen = () => {
    const [boardingName, setBoardingName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const [boardingType, setBoardingType] = useState('');
    const [stayPreference, setStayPreference] = useState('');
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [noOfRooms, setNoOfRooms] = useState('');
    const [membersCount, setMembersCount] = useState('');
    const [pricePerMonth, setPricePerMonth] = useState('');
    const [distance, setDistance] = useState('');
    const [nearestUniversityName, setNearestUniversityName] = useState('');
    const [advancePayment, setAdvancePayment] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);

    const provinces = [
        {label: "Central Province", value: "Central Province"},
        {label: "Eastern Province", value: "Eastern Province"},
        {label: "Northern Province", value: "Northern Province"},
        {label: "Southern Province", value: "Southern Province"},
        {label: "Western Province", value: "Western Province"},
        {label: "North Western Province", value: "North Western Province"},
        {label: "North Central Province", value: "North Central Province"},
        {label: "Uva Province", value: "Uva Province"},
        {label: "Sabaragamuwa Province", value: "Sabaragamuwa Province"},
    ];

    const facilities = [
        {label: 'WiFi', value: 'wifi'},
        {label: 'Water Heater', value: 'water_heater'},
        {label: 'Study Hall', value: 'study_hall'},
        {label: 'Kitchen', value: 'kitchen'},
        {label: 'Fan', value: 'fan'},
        {label: 'Cooker', value: 'cooker'},
        {label: 'Other Facilities', value: 'other'},
    ];

    const [errors, setErrors] = useState({});

    const handleSave = () => {
        const values = {
            boardingName, street, city, district, province,
            boardingType, stayPreference, selectedFacilities, membersCount, noOfRooms, pricePerMonth,
            distance, nearestUniversityName, advancePayment, selectedImages
        };
        const validationErrors = boardingDetailsValidate(values);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            console.log("Data is valid, proceed with saving", values);
        }
    };

    const requestPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message: 'This app needs access to your storage to upload images',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };

    const selectImages = async () => {
        const hasPermission = await requestPermission();
        if (!hasPermission) {
            Alert.alert('Permission Denied', 'You need to give storage permissions to continue');
            return;
        }

        launchImageLibrary(
            {
                mediaType: 'photo',
                selectionLimit: 0,
            },
            response => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else if (response.assets) {
                    setSelectedImages(response.assets);
                    console.log('Selected Images: ', response.assets);
                }
            },
        );
    };


    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.addBoardingText}>Add Boarding</Text>
                </View>

                <Text style={styles.subDetailHeading}>Boarding Details</Text>
            </View>

            <View style={globalStyles.container}>
                <Text style={globalStyles.textLabel}>Boarding Name</Text>
                <View style={[globalStyles.textInputContainer, errors.boardingName && {borderColor: "#FF7A7A"}]}>
                    <TextInput
                        style={globalStyles.textInputStyle}
                        placeholder="Enter Boarding Name"
                        placeholderTextColor="gray"
                        underlineColorAndroid="transparent"
                        onChangeText={setBoardingName}
                        value={boardingName}
                    />
                </View>
                {errors.boardingName && <Text style={globalStyles.errorMsg}>{errors.boardingName}</Text>}

                <Text style={[globalStyles.textLabel, {marginTop: 20}]}>Street</Text>
                <View style={[globalStyles.textInputContainer, errors.street && {borderColor: "#FF7A7A"}]}>
                    <TextInput
                        style={globalStyles.textInputStyle}
                        placeholder="Enter Street"
                        placeholderTextColor="gray"
                        underlineColorAndroid="transparent"
                        onChangeText={setStreet}
                        value={street}
                    />
                </View>
                {errors.street && <Text style={globalStyles.errorMsg}>{errors.street}</Text>}

                <Text style={[globalStyles.textLabel, {marginTop: 20}]}>City/Town/Village</Text>
                <View style={[globalStyles.textInputContainer, errors.city && {borderColor: "#FF7A7A"}]}>
                    <TextInput
                        style={globalStyles.textInputStyle}
                        placeholder="Enter City/Town/Village"
                        placeholderTextColor="gray"
                        underlineColorAndroid="transparent"
                        onChangeText={setCity}
                        value={city}
                    />
                </View>
                {errors.city && <Text style={globalStyles.errorMsg}>{errors.city}</Text>}

                <Text style={[globalStyles.textLabel, {marginTop: 20}]}>District</Text>
                <View style={[globalStyles.textInputContainer, errors.district && {borderColor: "#FF7A7A"}]}>
                    <TextInput
                        style={globalStyles.textInputStyle}
                        placeholder="Enter District"
                        placeholderTextColor="gray"
                        underlineColorAndroid="transparent"
                        onChangeText={setDistrict}
                        value={district}
                    />
                </View>
                {errors.district && <Text style={globalStyles.errorMsg}>{errors.district}</Text>}

                <Text style={[globalStyles.textLabel, {marginTop: 20}]}>Province</Text>
                <View style={[styles.dropdownContainer, {width: SCREEN_WIDTH - 40}]}>
                    <Dropdown
                        data={provinces}
                        onChange={(item) => setProvince(item.value)}
                        onSelect={(item) => setProvince(item.value)}
                        placeholder="Select Province"
                        labelField="label"
                        valueField="value"
                        value={province}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        search
                        maxHeight={300}
                        iconStyle={styles.iconStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                    />
                </View>
                {errors.province && <Text style={globalStyles.errorMsg}>{errors.province}</Text>}

                <RadioButtonGroup
                    label="Boarding Type"
                    selectedValue={boardingType}
                    options={[
                        {value: 'entire', label: 'An Entire Home', subText: 'Students have whole place to themselves'},
                        {value: 'room', label: 'A Room', subText: 'Students have their own room themselves'},
                        {value: 'shared', label: 'A Shared Room', subText: 'Rooms can share more than one student'}
                    ]}
                    onSelect={setBoardingType}
                />
                {errors.boardingType && <Text style={globalStyles.errorMsg}>{errors.boardingType}</Text>}

                <RadioButtonGroup
                    label="Stay Preference"
                    selectedValue={stayPreference}
                    options={[
                        {value: 'male', label: 'Male Only', subText: 'Only Boys can stay'},
                        {value: 'female', label: 'Female Only', subText: 'Only Girls can stay'},
                        {value: 'no_restriction', label: 'No Gender Restriction', subText: 'Boys or Girls can stay'}
                    ]}
                    onSelect={setStayPreference}
                />
                {errors.stayPreference && <Text style={globalStyles.errorMsg}>{errors.stayPreference}</Text>}

                <Text style={[globalStyles.textLabel, {marginTop: 20}]}>Facilities Listing</Text>
                <View style={{width: '100%'}}>
                    <MultiSelect
                        style={[styles.multiSelect, errors.selectedFacilities && {borderColor: "#FF7A7A"}]} // Error handling
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        search
                        data={facilities}
                        labelField="label"
                        valueField="value"
                        placeholder={selectedFacilities.length === 0 ? 'Select Facilities' : ''}
                        searchPlaceholder="Search Facilities"
                        value={selectedFacilities}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setSelectedFacilities(item);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color="black"
                                name="Safety"
                                size={20}
                            />
                        )}
                        selectedStyle={styles.selectedStyle}
                    />

                    {errors.selectedFacilities && <Text style={globalStyles.errorMsg}>{errors.selectedFacilities}</Text>}

                </View>

                <Text style={[globalStyles.textLabel, {marginTop: 20}]}>Members Count</Text>
                <View style={[globalStyles.textInputContainer, errors.membersCount && {borderColor: "#FF7A7A"}]}>
                    <TextInput
                        style={globalStyles.textInputStyle}
                        placeholder="Enter Members Count"
                        placeholderTextColor="gray"
                        underlineColorAndroid="transparent"
                        onChangeText={setMembersCount}
                        value={membersCount}
                    />
                </View>
                {errors.membersCount && <Text style={globalStyles.errorMsg}>{errors.membersCount}</Text>}

                <View style={styles.horizontalLine}/>

                <Text style={[globalStyles.textLabel, {marginTop: 20}]}>No of Rooms</Text>
                <View style={[globalStyles.textInputContainer, errors.noOfRooms && {borderColor: "#FF7A7A"}]}>
                    <TextInput
                        style={globalStyles.textInputStyle}
                        placeholder="Enter No of Rooms"
                        placeholderTextColor="gray"
                        underlineColorAndroid="transparent"
                        onChangeText={setNoOfRooms}
                        value={noOfRooms}
                    />
                </View>
                {errors.noOfRooms && <Text style={globalStyles.errorMsg}>{errors.noOfRooms}</Text>}

                <Text style={[globalStyles.textLabel, {marginTop: 20}]}>Price Per Month</Text>
                <View style={[globalStyles.textInputContainer, errors.pricePerMonth && {borderColor: "#FF7A7A"}]}>
                    <TextInput
                        style={globalStyles.textInputStyle}
                        placeholder="Enter Price Per Month (Rs.)"
                        placeholderTextColor="gray"
                        underlineColorAndroid="transparent"
                        onChangeText={setPricePerMonth}
                        value={pricePerMonth}
                    />
                </View>
                {errors.pricePerMonth && <Text style={globalStyles.errorMsg}>{errors.pricePerMonth}</Text>}

                <Text style={[globalStyles.textLabel, {marginTop: 20}]}>Distance</Text>
                <View style={[globalStyles.textInputContainer, errors.distance && {borderColor: "#FF7A7A"}]}>
                    <TextInput
                        style={globalStyles.textInputStyle}
                        placeholder="Enter Distance (km)"
                        placeholderTextColor="gray"
                        underlineColorAndroid="transparent"
                        onChangeText={setDistance}
                        value={distance}
                    />
                </View>
                {errors.distance && <Text style={globalStyles.errorMsg}>{errors.distance}</Text>}

                <Text style={[globalStyles.textLabel, {marginTop: 20}]}>Nearest University Name</Text>
                <View
                    style={[globalStyles.textInputContainer, errors.nearestUniversityName && {borderColor: "#FF7A7A"}]}>
                    <TextInput
                        style={globalStyles.textInputStyle}
                        placeholder="Enter Nearest University Name"
                        placeholderTextColor="gray"
                        underlineColorAndroid="transparent"
                        onChangeText={setNearestUniversityName}
                        value={nearestUniversityName}
                    />
                </View>
                {errors.nearestUniversityName &&
                    <Text style={globalStyles.errorMsg}>{errors.nearestUniversityName}</Text>}

                <Text style={[globalStyles.textLabel, {marginTop: 20}]}>Advance Payment</Text>
                <View style={[globalStyles.textInputContainer, errors.advancePayment && {borderColor: "#FF7A7A"}]}>
                    <TextInput
                        style={globalStyles.textInputStyle}
                        placeholder="Enter Advance Payment (Rs.)"
                        placeholderTextColor="gray"
                        underlineColorAndroid="transparent"
                        onChangeText={setAdvancePayment}
                        value={advancePayment}
                    />
                </View>
                {errors.advancePayment && <Text style={globalStyles.errorMsg}>{errors.advancePayment}</Text>}

                <Text style={[globalStyles.textLabel, {marginTop: 20}]}>Upload Boarding</Text>
                <Text style={styles.descriptionText}>Add 360 degree view images of your boarding.</Text>
                <View style={styles.imageContainer}>
                    {selectedImages.map((image, index) => (
                        <Image
                            key={index}
                            source={{uri: image.uri}}
                            style={styles.image}
                        />
                    ))}
                </View>
                <TouchableOpacity style={styles.primaryButton} onPress={selectImages}>
                    <Text>Select Images</Text>
                </TouchableOpacity>
                {errors.selectedImages && <Text style={globalStyles.errorMsg}>{errors.selectedImages}</Text>}

                <TouchableOpacity style={globalStyles.primaryButton} onPress={handleSave}>
                    <Text style={{fontFamily: "Poppins-Regular"}}>Save Boarding Details</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

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
    addBoardingText: {
        fontSize: 30,
        fontWeight: "500",
        color: "#000000",
        textAlign: "left",
        width: '100%',
    },
    subDetailHeading: {
        fontSize: 20,
        fontWeight: "500",
        color: "#000000",
        marginVertical: 20,
        marginHorizontal: 20,
        textAlign: "left",
        width: '100%',
    },
    dropdownContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 12,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        width: SCREEN_WIDTH - 40
    },
    dropdownItem: {
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    dropdownItemText: {
        fontSize: 16,
        padding: 5,
        color: "#000000",
    },
    contentContainer: {
        paddingBottom: 20,
        alignItems: 'flex-start',
    },
    horizontalLine: {
        height: 1,
        width: '100%',
        backgroundColor: "#d5d5d5",
        marginBottom: 10,
        marginTop: 10,
    },
    multiSelect: {
        height: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 12,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        width: SCREEN_WIDTH - 40
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'gray',
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
        backgroundColor: '#EEEEEE',
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
    descriptionText: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
        marginBottom: 15,
        textAlign: 'left',
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
    },
    primaryButton: {
        backgroundColor: '#444444',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        width: "100%"
    },
});

export default OwnerBoardingDetailsScreen;
