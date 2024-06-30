import React, {useState} from "react";
import {Text, View, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, StatusBar} from "react-native";
import Feather from "react-native-vector-icons/Feather";

const WIDTH = Dimensions.get('window').width;

const boardingPlaces = [];

const universities = [
    {name: "University of Colombo", area: "Colombo", district: "Colombo"},
    {name: "University of Peradeniya", area: "Peradeniya", district: "Kandy"},
    {name: "University of Sri Jayewardenepura", area: "Gangodawila", district: "Colombo"},
    {name: "University of Kelaniya", area: "Kelaniya", district: "Gampaha"},
    {name: "University of Moratuwa", area: "Moratuwa", district: "Colombo"},
    {name: "University of Jaffna", area: "Thirunelveli", district: "Jaffna"},
    {name: "The Open University of Sri Lanka", area: "Nawala", district: "Colombo"},
    {name: "University of Ruhuna", area: "Wellamadama", district: "Matara"},
    {name: "Eastern University, Sri Lanka", area: "Vantharumoolai", district: "Batticaloa"},
    {name: "Rajarata University of Sri Lanka", area: "Mihintale", district: "Anuradhapura"},
    {name: "Sabaragamuwa University of Sri Lanka", area: "Belihuloya", district: "Ratnapura"},
    {name: "South Eastern University of Sri Lanka", area: "Oluvil", district: "Ampara"},
    {name: "Wayamba University of Sri Lanka", area: "Kuliyapitiya", district: "Kurunegala"},
    {name: "Uva Wellassa University of Sri Lanka", area: "Badulla", district: "Badulla"},
];

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

for (let i = 1; i <= 15; i++) {
    const randomUniversity = universities[getRandomInt(0, universities.length - 1)];

    boardingPlaces.push({
        id: i,
        images: [
            "https://insureberry.com/wp-content/uploads/2021/06/taylor-heery-8DlbPCxfGHA-unsplash-1024x768.jpg",
            "https://oportfolio.co.uk/wp-content/uploads/2022/09/airbnb-mortgage-810x540.jpg",
            "https://ssl.cdn-redfin.com/photo/rent/ebfbf124-6089-4654-8f10-4a21ac3a8bcd/islphoto/genIsl.0_2.jpg",
            "https://is1-2.housingcdn.com/01c16c28/3e9c8e02fee24a61569d985c9afa2b47/v0/fs/2_bhk_independent_house-for-rent-beltola-Guwahati-hall.jpg",
            "https://imagecdn.99acres.com/media1/19328/5/386565962M-1717168240158.jpg",
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/432774515.jpg?k=d16379d853607ffc6b79e227bc7f5375eca73703ea6cb73e41c2126785def66c&o=&hp=1",
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/425736754.jpg?k=6a6a150d7d105e309f789f83a0c108c1329fb8d9941293eddad997a3377d8cb3&o=&hp=1",
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/162263208.jpg?k=6e1e29de50ea1449f22eb0b57cb7289505a774484080648e1b205c28371d1b50&o=&hp=1",
        ],
        boardingName: "KPR Boarding",
        rating: getRandomInt(30, 50) / 10,
        reviews: getRandomInt(100, 500),
        location: `${randomUniversity.area}, ${randomUniversity.district}`,
        verified: Math.random() < 0.5,
        university: randomUniversity.name,
        rent: getRandomInt(6, 16) * 500,
        guests: 6,
        bedrooms: 6,
        beds: 3,
        bathrooms: 1,
        ownerName: "Deva",
        locationDetails: "No. 123, XYZ Lane, Nugegoda, Colombo, Sri Lanka.",
        ownerExperience: 6,
        distanceDetails: "Deva is conveniently located within walking distance of the University of Colombo, making it an ideal choice for students seeking proximity to campus.",
        roomDetails: "Deva offers a variety of room types to suit your needs, including spacious single rooms and cozy shared rooms. Each room is furnished with a comfortable bed, study desk, chair, and ample storage space.",
        amenitiesDetails: "• High-speed Wi-Fi internet access throughout the building\n" +
            "• Shared kitchen facilities equipped with stoves, refrigerators, and microwaves\n" +
            "• On-site laundry facilities for added convenience\n" +
            "• Secure parking available for residents with vehicles",
        priceDetails: "Advance: Rs. 5,000 & Rent: Rs. 4,000 per month for a person.",
        transportationDetails: "Public transportation options, including buses and trains, are easily accessible from Deva. Additionally, bicycle rental services are available nearby for students who prefer eco-friendly commuting options.",
        securityDetails: "Our boarding features 24-hour security surveillance and controlled access entry to ensure the safety and well-being of our residents.",
        reviewDetails: [
            {type: "Cleanliness", rating: 4.5},
            {type: "Accuracy", rating: 4.0},
            {type: "Check-in", rating: 3.5},
            {type: "Communication", rating: 4.5},
            {type: "Location", rating: 4.0},
            {type: "Value", rating: 3.8}
        ],
    });
}

const HomeScreen = ({navigation}) => {
    const renderBoardingCards = () => {
        return boardingPlaces.map((place) => (
            <View key={place.id} style={styles.card}>
                <ImageSlider images={place.images} navigation={navigation}/>
                <TouchableOpacity
                    style={styles.cardTouchable}
                    onPress={() => navigation.navigate("BoardingDetails", {place})}
                    activeOpacity={1}
                >
                    <View style={styles.description}>
                        <View style={styles.rating}>
                            <Feather name="star" size={14} color="#000000"/>
                            <Text style={styles.ratingText}>{place.rating.toFixed(1)} ({place.reviews} reviews)</Text>
                        </View>
                        <View style={styles.location}>
                            <Text style={styles.locationText}>{place.location}</Text>
                            {place.verified && (
                                <Image
                                    source={{uri: "https://w7.pngwing.com/pngs/865/941/png-transparent-google-verified-hd-logo-thumbnail.png"}}
                                    style={styles.verifiedIcon}
                                />
                            )}
                        </View>
                        <Text style={styles.university}>{place.university}</Text>
                        <Text style={styles.rent}>Rs. {place.rent} (Monthly)</Text>
                    </View>
                </TouchableOpacity>
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
            <View style={styles.header}>
                <View style={styles.searchBox}>
                    <Feather name="search" size={20} color="#000" style={styles.searchIcon}/>
                    <View style={styles.searchText}>
                        <Text style={styles.searchTextRow1}>Where to?</Text>
                        <Text style={styles.searchTextRow2}>Nearby Universities, Add members</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.filterBtn}>
                    <Feather name="filter" size={20} color="#000"/>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {renderBoardingCards()}
            </ScrollView>
        </View>
    );
}

const ImageSlider = ({images, navigation}) => {
    const [imgActive, setImgActive] = useState(0);

    const onChange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide !== imgActive) {
                setImgActive(slide);
            }
        }
    };

    const renderDots = () => {
        const maxDots = 5;
        const totalImages = images.length;
        let dots = [];

        let start = imgActive < Math.floor(maxDots / 2) ? 0 : imgActive - Math.floor(maxDots / 2);
        if (start > totalImages - maxDots) {
            start = totalImages - maxDots;
        }
        start = Math.max(0, start);

        for (let i = start; i < start + maxDots && i < totalImages; i++) {
            dots.push(
                <Text
                    key={i}
                    style={imgActive === i ? styles.dotActive : styles.dot}
                >
                    ●
                </Text>
            );
        }

        return dots;
    };

    return (
        <View style={styles.imageContainer}>
            <ScrollView
                onScroll={({nativeEvent}) => onChange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={styles.imageSlider}
            >
                {images.map((image, index) => (
                    <Image
                        key={index}
                        resizeMode="cover"
                        style={styles.image}
                        source={{uri: image}}
                    />
                ))}
            </ScrollView>
            <TouchableOpacity
                style={styles.favoriteIcon}
                onPress={() => navigation.navigate("Login")}
            >
                <Feather name="heart" size={20} color="#ffffff"/>
            </TouchableOpacity>
            <View style={styles.wrapDot}>
                {renderDots()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#ffffff",
        zIndex: 10,
        elevation: 4,
        shadowColor: "#000000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#ffffff",
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 5,
        overflow: "hidden",
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginRight: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchText: {
        flex: 1,
    },
    searchTextRow1: {
        color: "#000000",
    },
    searchTextRow2: {
        color: "#808080",
    },
    filterBtn: {
        padding: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#808080",
        justifyContent: "center",
        alignItems: "center",
    },
    cardsContainer: {
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    card: {
        marginBottom: 20,
        backgroundColor: "#ffffff",
        borderRadius: 15,
        overflow: "hidden",
        shadowColor: "#000000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 10,
    },
    cardTouchable: {
        flex: 1,
    },
    imageContainer: {
        position: "relative",
        height: 300,
    },
    imageSlider: {
        width: WIDTH,
        height: 300,
    },
    image: {
        width: WIDTH,
        height: 300,
        resizeMode: "cover",
    },
    favoriteIcon: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
    },
    wrapDot: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: "center",
    },
    dotActive: {
        margin: 1,
        color: '#ffffff',
        fontSize: 14,
    },
    dot: {
        margin: 1,
        color: '#d5d5d5',
        fontSize: 12,
    },
    description: {
        padding: 10,
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    ratingText: {
        marginLeft: 5,
        color: "#000000",
    },
    location: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    locationText: {
        flex: 1,
        color: "#000000",
        fontWeight: "bold",
    },
    verifiedIcon: {
        width: 14,
        height: 14,
        marginLeft: 5,
    },
    university: {
        marginBottom: 5,
        color: "#808080",
    },
    rent: {
        color: "#000000",
    },
});

export default HomeScreen;