import React from "react";
import { View, StyleSheet, Text, Image, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';

const BookingScreen = () => {
    const navigation = useNavigation();

    const places = [
        {
            images: ["https://insureberry.com/wp-content/uploads/2021/06/taylor-heery-8DlbPCxfGHA-unsplash-1024x768.jpg"],
            boardingName: "Sample Boarding 1",
            location: "Sample Location 1",
            verified: true,
            university: "Sample University 1",
            rent: 3500,
        },
        {
            images: ["https://insureberry.com/wp-content/uploads/2021/06/taylor-heery-8DlbPCxfGHA-unsplash-1024x768.jpg"],
            boardingName: "Sample Boarding 2",
            location: "Sample Location 2",
            verified: false,
            university: "Sample University 2",
            rent: 4000,
        },
        {
            images: ["https://insureberry.com/wp-content/uploads/2021/06/taylor-heery-8DlbPCxfGHA-unsplash-1024x768.jpg"],
            boardingName: "Sample Boarding 3",
            location: "Sample Location 3",
            verified: true,
            university: "Sample University 3",
            rent: 4500,
        }
    ];

    const renderCard = ({ item }) => (
        <View style={styles.cardContainer}>
            <View style={styles.detailsContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item.images[0] }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.boardingHead}>
                        <Text style={styles.boardingHeadText}>{item.boardingName}</Text>
                    </View>
                    <View style={styles.location}>
                        <Text style={styles.locationText}>{item.location}</Text>
                        {item.verified && (
                            <Image
                                source={{ uri: "https://w7.pngwing.com/pngs/865/941/png-transparent-google-verified-hd-logo-thumbnail.png" }}
                                style={styles.verifiedIcon}
                            />
                        )}
                    </View>
                    <Text style={styles.university}>{item.university}</Text>
                    <View style={styles.total}>
                        <Text style={styles.totalText}>Rs. {item.rent}</Text>
                        <Text style={styles.totalCountText}>×1</Text>
                    </View>
                </View>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.headerContainer}>
                <View style={styles.totalAmount}>
                    <Text style={styles.totalAmountText}>Total: Rs. {item.rent}</Text>
                </View>
            </View>
            <View style={styles.horizontalBar} />
        </View>
    );

    return (
        <FlatList
            ListHeaderComponent={() => (
                <View style={styles.headerContainer}>
                    <View style={styles.header}>
                        <Text style={styles.bookingText}>Bookings</Text>
                    </View>
                </View>
            )}
            data={places}
            renderItem={renderCard}
            keyExtractor={(item) => item.boardingName}
            ListEmptyComponent={
                <View style={styles.messageContainer}>
                    <View style={styles.horizontalLine} />
                    <Text style={styles.noBookingText}>No boardings booked... yet!</Text>
                    <Text style={styles.subText}>
                        Start booking to secure your spot and manage your reservations easily.
                    </Text>
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingTop: 20,
    },
    headerContainer: {
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    bookingText: {
        fontSize: 30,
        fontWeight: "500",
        color: "#000000",
        marginBottom: 30,
    },
    cardContainer: {},
    horizontalLine: {
        height: 1,
        backgroundColor: "#d5d5d5",
        marginVertical: 20,
    },
    horizontalBar: {
        height: 5,
        backgroundColor: "rgba(213,213,213,0.5)",
        marginVertical: 20,
    },
    messageContainer: {
        alignItems: "flex-start",
        marginTop: 20,
        marginHorizontal: 20,
    },
    noBookingText: {
        fontSize: 22,
        fontWeight: "500",
        color: "#000000",
    },
    subText: {
        fontSize: 16,
        color: "#000000",
        textAlign: "left",
        marginTop: 10,
    },
    startSearchingButton: {
        marginTop: 20,
        alignSelf: "flex-start",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    startSearchingText: {
        color: "#000000",
        fontWeight: "500",
        fontSize: 16,
    },
    commonContainer: {
        flex: 1,
        paddingVertical: 20,
        backgroundColor: '#ffffff',
    },
    detailsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
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
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    locationText: {
        fontSize: 12,
        color: '#767676',
    },
    verifiedIcon: {
        width: 10,
        height: 10,
        marginLeft: 5,
    },
    university: {
        fontSize: 12,
        color: '#767676',
        marginBottom: 2,
    },
    total: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 4,
    },
    totalText: {
        fontSize: 12,
        color: '#000000',
        fontWeight: '500',
    },
    totalCountText: {
        fontSize: 12,
        color: '#000000',
        fontWeight: '500',
    },
    totalAmount: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    totalAmountText: {
        fontSize: 12,
        color: '#000000',
        fontWeight: '500',
    },
});

export default BookingScreen;
