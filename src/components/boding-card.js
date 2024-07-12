import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { SCREEN_WIDTH } from "../utils/Enum";

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

function BodingCard({ place,navigation,path }) {
  return (
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
  );
}

export default BodingCard;

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
    width: SCREEN_WIDTH,
    height: 300,
  },
  image: {
    width: SCREEN_WIDTH,
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
