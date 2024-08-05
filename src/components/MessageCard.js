import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

const MessageCard = ({item, onPress}) => {
    const {userName, userImg, messageText, messageTime, unreadCount} = item;

    return (
        <TouchableOpacity
            style={[styles.card, unreadCount > 0 && styles.unreadCard]}
            onPress={onPress}
        >
            <View style={styles.userInfo}>
                <View style={styles.userImgWrapper}>
                    <Image source={{uri: userImg}} style={styles.userImg}/>
                </View>
                <View style={styles.textSection}>
                    <View style={styles.userInfoText}>
                        <Text style={styles.userName}>{userName}</Text>
                        <Text style={styles.postTime}>{messageTime}</Text>
                    </View>
                    <View style={styles.messageRow}>
                        <Text
                            style={styles.messageText}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {messageText}
                        </Text>
                        {unreadCount > 0 && (
                            <View style={styles.unreadBadge}>
                                <Text style={styles.unreadCount}>{unreadCount}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 15,
        marginBottom: 5,
    },
    unreadCard: {
        backgroundColor: '#02495026',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    userImgWrapper: {
        marginHorizontal: 10,
    },
    userImg: {
        width: 45,
        height: 45,
        borderRadius: 50,
        backgroundColor: '#dddddd',
        borderColor: '#d9e2ec',
        borderWidth: 0.5,
    },
    textSection: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
    },
    userInfoText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userName: {
        fontWeight: '600',
        color: '#000000',
        fontSize: 16,
    },
    postTime: {
        color: '#888888',
        fontSize: 14,
    },
    messageText: {
        color: '#024950bf',
        fontSize: 15,
        fontWeight: '450',
        flex: 1,
    },
    unreadBadge: {
        backgroundColor: '#024950',
        borderRadius: 50,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    unreadCount: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '500',
    },
});

export default MessageCard;
