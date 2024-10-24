import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import AddGuestBottomSheet from '../components/AddGuestBottomSheet';

function ConfirmAndPayScreen({navigation, route}) {
    const {place} = route.params;
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [startPickerVisible, setStartPickerVisible] = useState(false);
    const [endPickerVisible, setEndPickerVisible] = useState(false);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [membersCount, setMembersCount] = useState(1);

    const currentDate = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(currentDate.getFullYear() + 1);

    const handleSaveMembersCount = (count) => {
        setMembersCount(count);
        setBottomSheetVisible(false);
    };

    const imageUrl = place?.images?.[0] || 'defaultImageUri';
    const boardingName = place?.boardingName || 'No boarding name';
    const city = place?.city ? `${place.city.lat}, ${place.city.lng}` : 'Location not available';
    const nearestUniversity = place?.nearestUniversity || 'University not available';
    const pricePerMonth = place?.pricePerMonth || 0;
    const total = parseFloat(pricePerMonth) + (parseFloat(pricePerMonth) / 10);
    // const rating = place?.rating?.toFixed(1) || '0.0';
    // const reviews = place?.reviews || 0;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={20} color="#000000"/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Confirm and pay</Text>
            </View>

            <View style={styles.commonContainer}>
                <View style={styles.detailsContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={{uri: imageUrl}} style={styles.image}/>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.boardingHead}>
                            <Text style={styles.boardingHeadText}>{boardingName}</Text>
                        </View>
                        <View style={styles.location}>
                            <Text style={styles.locationText}>{city}</Text>
                            {place?.verified && (
                                <Image
                                    source={{uri: "https://w7.pngwing.com/pngs/865/941/png-transparent-google-verified-hd-logo-thumbnail.png"}}
                                    style={styles.verifiedIcon}
                                />
                            )}
                        </View>
                        <Text style={styles.university}>{nearestUniversity}</Text>
                        {/*<View style={styles.rating}>*/}
                        {/*    <Feather name="star" size={16} color="#000"/>*/}
                        {/*    <Text style={[styles.ratingText, styles.ratingValue]}>{rating} (</Text>*/}
                        {/*    <TouchableOpacity onPress={() => {*/}
                        {/*    }} style={styles.reviewButtonContainer}>*/}
                        {/*        <Text style={styles.reviewButton}>{reviews} reviews</Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*    <Text style={styles.ratingText}>)</Text>*/}
                        {/*</View>*/}
                    </View>
                </View>
            </View>
            <View style={styles.sectionDivider}/>
            <View style={styles.commonContainer}>
                <Text style={styles.sectionHeading}>Your boarding</Text>
                <View style={styles.row}>
                    <Text style={styles.subHeading}>Dates</Text>
                </View>
                <View style={styles.row}>
                    <View style={[styles.dateContainer, styles.marginRight]}>
                        <View style={styles.dateButtonContainer}>
                            <TouchableOpacity onPress={() => setStartPickerVisible(true)} style={styles.dateButton}>
                                <Text style={styles.dateButtonText}>Check-in Date</Text>
                            </TouchableOpacity>
                            <Text style={styles.selectedDate}>{checkInDate.toDateString()}</Text>
                        </View>
                        <DatePicker
                            modal
                            mode="date"
                            open={startPickerVisible}
                            date={checkInDate}
                            minimumDate={currentDate}
                            maximumDate={oneYearFromNow}
                            theme="light"
                            buttonColor="#000000"
                            dividerColor="#000000"
                            onConfirm={(date) => {
                                setStartPickerVisible(false);
                                setCheckInDate(date);
                            }}
                            onCancel={() => {
                                setStartPickerVisible(false);
                            }}
                        />
                    </View>
                    <View style={styles.dateContainer}>
                        <View style={styles.dateButtonContainer}>
                            <TouchableOpacity onPress={() => setEndPickerVisible(true)} style={styles.dateButton}>
                                <Text style={styles.dateButtonText}>Check-out Date</Text>
                            </TouchableOpacity>
                            <Text style={styles.selectedDate}>{checkOutDate.toDateString()}</Text>
                        </View>
                        <DatePicker
                            modal
                            mode="date"
                            open={endPickerVisible}
                            date={checkOutDate}
                            minimumDate={checkInDate}
                            maximumDate={oneYearFromNow}
                            theme="light"
                            buttonColor="#000000"
                            dividerColor="#000000"
                            onConfirm={(date) => {
                                setEndPickerVisible(false);
                                setCheckOutDate(date);
                            }}
                            onCancel={() => {
                                setEndPickerVisible(false);
                            }}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={styles.subHeading}>Guests</Text>
                    <TouchableOpacity style={styles.button} onPress={() => setBottomSheetVisible(true)}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.secondLine}>
                    {membersCount} guest{membersCount > 1 ? 's' : ''}
                </Text>
            </View>
            <View style={styles.sectionDivider}/>
            <View style={styles.commonContainer}>
                <Text style={styles.sectionHeading}>Price Details</Text>
                <View style={styles.row}>
                    <Text style={styles.subText}>Monthly charge</Text>
                    <Text style={styles.price}>Rs. {pricePerMonth}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.subText}>Bodimate service fee</Text>
                    <Text style={styles.price}>Rs. {pricePerMonth / 10}</Text>
                </View>
                <View style={styles.horizontalLine}/>
                <View style={styles.row}>
                    <Text style={styles.subTotalText}>Total</Text>
                    <Text style={styles.price}>Rs. {total.toFixed(2)}</Text>
                </View>
                <View style={styles.horizontalLine}/>
                <View style={styles.row}>
                    <Text style={styles.subTotalText}>Total For {membersCount} Guests</Text>
                    <Text style={styles.price}>Rs. {(Number(total.toFixed(2)) * membersCount).toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => navigation.navigate('PayHere', { totalAmount: (Number(total.toFixed(2)) * membersCount).toFixed(2) })}>
                    <Text style={styles.confirmButtonText}>Confirm and pay</Text>
                </TouchableOpacity>

            </View>
            <AddGuestBottomSheet
                visible={bottomSheetVisible}
                onClose={() => setBottomSheetVisible(false)}
                onSave={handleSaveMembersCount}
            />
        </ScrollView>
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
    },
    headerText: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 30,
        color: "#000000",
    },
    commonContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: '#ffffff',
    },
    detailsContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    imageContainer: {
        marginRight: 16,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    infoContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    boardingHead: {
        marginBottom: 2,
    },
    boardingHeadText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    locationText: {
        fontSize: 14,
        color: '#767676',
    },
    verifiedIcon: {
        width: 15,
        height: 15,
        marginLeft: 5,
    },
    university: {
        fontSize: 14,
        color: '#767676',
        marginBottom: 2,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    ratingText: {
        fontSize: 14,
        color: '#000000',
    },
    ratingValue: {
        marginHorizontal: 4,
    },
    reviewButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    reviewButton: {
        textDecorationLine: 'underline',
        color: "#000000",
        fontWeight: "600",
        textAlign: 'center',
        fontSize: 12,
    },
    sectionDivider: {
        height: 8,
        backgroundColor: '#d3d3d3',
        marginVertical: 10,
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#000000',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    subHeading: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
        marginTop: 10,
    },
    dateContainer: {
        flex: 1,
    },
    marginRight: {
        marginRight: 10,
    },
    dateButtonContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 2,
    },
    dateButton: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#024950',
        marginBottom: 5,
    },
    dateButtonText: {
        fontSize: 14,
        color: '#ffffff',
    },
    selectedDate: {
        fontSize: 14,
        color: '#000000',
    },
    button: {},
    buttonText: {
        fontSize: 16,
        color: '#000000',
        textDecorationLine: 'underline',
        fontWeight: '500',
    },
    secondLine: {
        fontSize: 16,
        color: '#808080',
        fontWeight: '350',
    },
    price: {
        fontSize: 16,
        color: '#808080',
        fontWeight: '400',
    },
    subText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000000',
        marginTop: 10,
    },
    horizontalLine: {
        height: 1,
        backgroundColor: "#d5d5d5",
        marginVertical: 10,
    },
    subTotalText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
        marginTop: 10,
    },
    confirmButton: {
        backgroundColor: "#024950",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 10,
    },
    confirmButtonText: {
        color: "#ffffff",
        fontSize: 16,
    },
});

export default ConfirmAndPayScreen;
