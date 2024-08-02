import React, {useState, useRef} from "react";
import {View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, StatusBar} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import BoardingOwner from "../../assets/BoardingDetails/OwnerProfile.jpg";
import {useNavigation} from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width;

const reviewData = [
    {
        rating: 4.5,
        time: "2 months ago",
        reviewText: "Great place, very clean and well-maintained. The host was very friendly and helpful. I enjoyed my stay a lot and would recommend it to anyone looking for a comfortable stay.",
        reviewerName: "John Doe",
        reviewerExperience: "2 years on Bodimate",
        reviewerProfile: BoardingOwner,
    },
    {
        rating: 3.8,
        time: "1 week ago",
        reviewText: "The location is convenient and the rooms are spacious. However, the Wi-Fi was a bit slow during my stay.",
        reviewerName: "Jane Smith",
        reviewerExperience: "1 year on Bodimate",
        reviewerProfile: BoardingOwner,
    },
    {
        rating: 4.0,
        time: "3 days ago",
        reviewText: "Good value for money. The facilities were adequate and the staff was responsive to our needs.",
        reviewerName: "Alice Johnson",
        reviewerExperience: "3 years on Bodimate",
        reviewerProfile: BoardingOwner,
    },
    {
        rating: 5.0,
        time: "5 hours ago",
        reviewText: "Amazing experience! Everything was perfect and exceeded my expectations. Highly recommended!",
        reviewerName: "Michael Brown",
        reviewerExperience: "4 years on Bodimate",
        reviewerProfile: BoardingOwner,
    },
    {
        rating: 4.2,
        time: "30 mins ago",
        reviewText: "Nice and quiet place, ideal for a short stay. The host was very accommodating and helpful.",
        reviewerName: "Emily Davis",
        reviewerExperience: "6 months on Bodimate",
        reviewerProfile: BoardingOwner,
    },
];

const BoardingDetailsScreen = ({route, navigation}) => {
    const {place} = route.params;

    const [imgActive, setImgActive] = useState(0);
    const scrollViewRef = useRef(null);

    const onChange = (event) => {
        const slide = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
        if (slide !== imgActive) {
            setImgActive(slide);
        }
    };

    const ReviewCard = ({review}) => {
        const navigation = useNavigation();

        const [showMore, setShowMore] = useState(false);
        const [showMoreButtonVisible, setShowMoreButtonVisible] = useState(false);

        const handleTextLayout = (event) => {
            const {lines} = event.nativeEvent;
            if (lines.length > 4) {
                setShowMoreButtonVisible(true);
            } else {
                setShowMoreButtonVisible(false);
            }
        };

        const navigateToReviews = () => {
            navigation.navigate('BoardingReviews');
        };

        return (
            <View style={styles.reviewCard}>
                <View style={styles.reviewCardHeader}>
                    <View style={styles.reviewStars}>
                        {Array.from({length: 5}, (_, i) => (
                            <Feather
                                key={i}
                                name="star"
                                size={12}
                                color={i < Math.round(review.rating) ? "#FFD700" : "#d5d5d5"}
                            />
                        ))}
                    </View>
                    <Text style={styles.reviewTime}>{review.time}</Text>
                </View>
                <View style={styles.reviewTextContainer}>
                    <Text
                        style={styles.reviewText}
                        numberOfLines={showMore ? undefined : 4}
                        onTextLayout={handleTextLayout}
                    >
                        {review.reviewText}
                    </Text>
                    {showMoreButtonVisible && (
                        <TouchableOpacity onPress={navigateToReviews}>
                            <Text style={styles.showMoreButton}>
                                Show more
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.reviewerInfo}>
                    <Image
                        source={review.reviewerProfile}
                        style={styles.reviewerProfileImage}
                    />
                    <View style={styles.reviewerDetails}>
                        <Text style={styles.reviewerName}>{review.reviewerName}</Text>
                        <Text style={styles.reviewerExperience}>
                            {review.reviewerExperience}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content"/>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <ScrollView
                        ref={scrollViewRef}
                        onScroll={onChange}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        horizontal
                        style={styles.imageSlider}
                    >
                        {place.images.map((image, index) => (
                            <Image
                                key={index}
                                resizeMode="cover"
                                style={styles.image}
                                source={{uri: image}}
                            />
                        ))}
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Feather name="arrow-left" size={24} color="black"/>
                    </TouchableOpacity>
                    <View style={styles.rightButtons}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Feather name="share" size={20} color="black"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Feather name="heart" size={20} color="black"/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageCount}>
                        <Text style={styles.imageCountText}>{imgActive + 1}/{place.images.length}</Text>
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.boardingHead}>
                        <Text style={styles.boardingHeadText}>{place.boardingName}</Text>
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
                    <View style={styles.details}>
                        <Text style={styles.detailText}>{place.guests} guests · {place.bedrooms} bedrooms
                            · {place.beds} beds · {place.bathrooms} private bathroom</Text>
                    </View>
                    <View style={styles.rating}>
                        <Feather name="star" size={16} color="#000"/>
                        <Text style={[styles.ratingText, styles.ratingValue]}>
                            {place.rating.toFixed(1)} (
                        </Text>
                        <TouchableOpacity onPress={() => {
                        }} style={styles.reviewButtonContainer}>
                            <Text style={styles.reviewButton}>{place.reviews} reviews</Text>
                        </TouchableOpacity>
                        <Text style={styles.ratingText}>
                            )
                        </Text>
                    </View>
                    <View style={styles.horizontalLine}/>
                    <View style={styles.ownerContainer}>
                        <View style={styles.profileContainer}>
                            <Image source={BoardingOwner} style={styles.ownerProfile}/>
                        </View>
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailHeadText}>Hosted by {place.ownerName}</Text>
                            <Text style={styles.detailSubText}>{place.ownerExperience} years hosting</Text>
                        </View>
                    </View>
                    <View style={styles.horizontalLine}/>
                    <View style={styles.detailContainer}>
                        <View style={styles.iconContainer}>
                            <Feather name="map-pin" size={25} color="#000"/>
                        </View>
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailHeadText}>{place.location}</Text>
                            <Text style={styles.detailSubText}>{place.locationDetails}</Text>
                        </View>
                    </View>
                    <View style={styles.detailContainer}>
                        <View style={styles.iconContainer}>
                            <Feather name="map" size={25} color="#000"/>
                        </View>
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailHeadText}>Distance to University</Text>
                            <Text style={styles.detailSubText}>{place.distanceDetails}</Text>
                        </View>
                    </View>
                    <View style={styles.detailContainer}>
                        <View style={styles.iconContainer}>
                            <Feather name="home" size={25} color="#000"/>
                        </View>
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailHeadText}>Room Types</Text>
                            <Text style={styles.detailSubText}>{place.roomDetails}</Text>
                        </View>
                    </View>
                    <View style={styles.detailContainer}>
                        <View style={styles.iconContainer}>
                            <Feather name="wifi" size={25} color="#000"/>
                        </View>
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailHeadText}>Amenities</Text>
                            <Text style={styles.detailSubText}>{place.amenitiesDetails}</Text>
                        </View>
                    </View>
                    <View style={styles.detailContainer}>
                        <View style={styles.iconContainer}>
                            <Feather name="dollar-sign" size={25} color="#000"/>
                        </View>
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailHeadText}>Price</Text>
                            <Text style={styles.detailSubText}>{place.priceDetails}</Text>
                        </View>
                    </View>
                    <View style={styles.detailContainer}>
                        <View style={styles.iconContainer}>
                            <Feather name="truck" size={25} color="#000"/>
                        </View>
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailHeadText}>Transportation Options</Text>
                            <Text style={styles.detailSubText}>{place.transportationDetails}</Text>
                        </View>
                    </View>
                    <View style={styles.detailContainer}>
                        <View style={styles.iconContainer}>
                            <Feather name="shield" size={25} color="#000"/>
                        </View>
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailHeadText}>Security</Text>
                            <Text style={styles.detailSubText}>{place.securityDetails}</Text>
                        </View>
                    </View>
                    <View style={styles.horizontalLine}/>
                    <View style={styles.reviewsContainer}>
                        <Text style={styles.reviewsHeading}>Reviews</Text>
                        {place.reviewDetails.map((review, index) => (
                            <View key={index} style={styles.reviewRow}>
                                <Text style={styles.reviewType}>{review.type}</Text>
                                <View style={styles.reviewBarContainer}>
                                    <View style={styles.reviewBarBackground}>
                                        <View style={[styles.reviewBarSelected, {width: `${review.rating * 20}%`}]}/>
                                    </View>
                                </View>
                                <Text style={styles.reviewRating}>{review.rating.toFixed(1)}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.horizontalLine}/>
                <View style={styles.reviewContainer}>
                    <Text style={styles.sectionHeader}>{place.reviews} Reviews</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {reviewData.map((review, index) => (
                            <ReviewCard key={index} review={review}/>
                        ))}
                    </ScrollView>
                    <TouchableOpacity onPress={() => navigation.navigate('BoardingReviews')}>
                        <Text style={styles.showAllReviewsButton}>Show all {place.reviews} reviews</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.horizontalLine}/>
                    <View style={styles.locationContainer}>
                        <Text style={styles.reviewsHeading}>Where you'll be</Text>
                        <View style={styles.mapContainer}>

                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomSection}>
                <View style={styles.bottomLeft}>
                    <Text style={styles.bottomRentText}>
                        Rs. {place.rent}
                    </Text>
                    <Text style={styles.bottomText}>
                        per guest
                    </Text>
                </View>
                <View style={styles.bottomRight}>
                    <TouchableOpacity
                        style={styles.reserveButton}
                        onPress={() => navigation.navigate('ConfirmAndPay', { place })}
                    >
                        <Text style={styles.reserveButtonText}>
                            Reserve
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
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
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
    },
    rightButtons: {
        position: 'absolute',
        top: 20,
        right: 20,
        flexDirection: 'row',
    },
    iconButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
        marginLeft: 10,
    },
    imageCount: {
        position: 'absolute',
        bottom: 10,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 5,
    },
    imageCountText: {
        color: 'white',
        fontSize: 14,
    },
    detailsContainer: {
        padding: 20,
    },
    boardingHead: {
        paddingBottom: 10,
    },
    boardingHeadText: {
        fontSize: 24,
        color: "#000000",
        fontWeight: "500",
    },
    location: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    locationText: {
        fontSize: 16,
        color: "#000",
        fontWeight: "bold",
    },
    verifiedIcon: {
        width: 14,
        height: 14,
        marginLeft: 5,
    },
    university: {
        fontSize: 16,
        color: "#808080",
        marginBottom: 5,
    },
    details: {
        marginBottom: 5,
    },
    detailText: {
        fontSize: 14,
        color: "#000000",
        fontWeight: "400",
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    ratingValue: {
        marginLeft: 5,
    },
    ratingText: {
        fontSize: 14,
        color: "#000",
        fontWeight: "600",
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
    },
    horizontalLine: {
        height: 1,
        backgroundColor: "#d5d5d5",
        marginBottom: 25,
        marginTop: 25,
    },
    ownerContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    ownerProfile: {
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: "flex-start",
    },
    detailHeadText: {
        fontSize: 16,
        color: "#000000",
        fontWeight: "500",
        paddingHorizontal: 6,
        paddingBottom: 5,
    },
    detailSubText: {
        fontSize: 14,
        color: "#767676",
        fontWeight: "350",
        paddingHorizontal: 6,
    },
    detailContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingBottom: 10,
        marginVertical: 5,
    },
    profileContainer: {
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    iconContainer: {
        justifyContent: 'center',
        marginHorizontal: 12,
    },
    detailTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    reviewsContainer: {
        paddingVertical: 10,
    },
    reviewsHeading: {
        fontSize: 20,
        color: "#000000",
        fontWeight: '500',
        marginBottom: 15,
    },
    reviewRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    reviewType: {
        flex: 2,
        fontSize: 12,
        color: "#767676",
        fontWeight: "350",
    },
    reviewBarContainer: {
        flex: 4,
        marginHorizontal: 10,
    },
    reviewBarBackground: {
        height: 10,
        backgroundColor: '#d5d5d5',
        borderRadius: 5,
    },
    reviewBarSelected: {
        height: 10,
        backgroundColor: '#024950',
        borderRadius: 5,
    },
    reviewRating: {
        flex: 1,
        fontSize: 12,
        color: "#767676",
        fontWeight: "350",
        textAlign: 'right',
    },
    reviewContainer: {},
    sectionHeader: {
        fontSize: 20,
        fontWeight: '500',
        color: "#000000",
        marginLeft: 20,
        marginBottom: 10,
    },
    reviewCard: {
        width: 300,
        marginRight: 20,
        borderWidth: 1,
        borderColor: "#d5d5d5",
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
    },
    reviewCardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    reviewStars: {
        flexDirection: "row",
        marginRight: 10,
    },
    reviewTime: {
        fontSize: 12,
        color: "#808080",
        fontWeight: "350",
    },
    reviewTextContainer: {
        marginBottom: 10,
        height: 110,
    },
    reviewText: {
        fontSize: 14,
        marginBottom: 10,
        color: "#000000",
        fontWeight: "350",
    },
    showMoreButton: {
        textDecorationLine: 'underline',
        color: "#000000",
        fontWeight: "500",
    },
    reviewerInfo: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 8,
    },
    reviewerProfileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    reviewerDetails: {
        flex: 1,
    },
    reviewerName: {
        fontSize: 14,
        fontWeight: "500",
        color: "#000000",
    },
    reviewerExperience: {
        fontSize: 12,
        color: "#808080",
    },
    showAllReviewsButton: {
        textAlign: 'center',
        color: '#000000',
        fontWeight: '500',
        fontSize: 16,
        marginHorizontal: 20,
        marginTop: 20,
        padding: 13,
        borderRadius: 10,
        borderWidth: 1,
    },
    bottomSection: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'rgba(213,213,213,0.87)',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    bottomLeft: {
        flex: 1,
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomRight: {
        marginRight: 20,
    },
    bottomRentText: {
        fontSize: 16,
        color: "#000000",
        fontWeight: "500",
        marginRight: 5,
    },
    bottomText: {
        fontSize: 16,
        color: "#000000",
        fontWeight: "400",
    },
    reserveButton: {
        backgroundColor: '#024950',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    reserveButtonText: {
        color: '#fff',
        fontWeight: '450',
        fontSize: 16,
        textAlign: 'center',
        padding: 4,
    },
});

export default BoardingDetailsScreen;
