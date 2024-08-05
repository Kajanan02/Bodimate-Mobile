import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { GiftedChat, Bubble, Send, Composer } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import CustomInputToolbar from '../components/CustomInputToolbar';

const ChatScreen = ({ route }) => {
    const { userName } = route.params;
    const navigation = useNavigation();

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello there!',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: userName,
                    src: 'https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944',
                },
            },
            {
                _id: 2,
                text: 'Hi, how are you?',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'You',
                    src: 'https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944',
                },
            },
        ]);
    }, [userName]);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages),
        );
    }, []);

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View style={styles.sendingContainer}>
                    <MaterialCommunityIcons
                        name="send-circle"
                        style={styles.sendIcon}
                        size={40}
                        color="#024950"
                    />
                </View>
            </Send>
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#024950',
                    },
                }}
                textStyle={{
                    right: {
                        color: '#ffffff',
                    },
                }}
            />
        );
    };

    const renderComposer = (props) => {
        return (
            <Composer
                {...props}
                textInputStyle={{
                    color: '#000000',
                }}
            />
        );
    };

    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name='angle-double-down' size={22} color='#333' />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={20} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{userName}</Text>
                <View style={styles.emptySpace} />
            </View>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1,
                    name: 'You',
                    src: 'https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944',
                }}
                renderBubble={renderBubble}
                renderSend={renderSend}
                renderComposer={renderComposer}
                renderInputToolbar={(props) => <CustomInputToolbar {...props} />}
                alwaysShowSend
                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        overflow: 'visible',
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
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000000',
    },
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendIcon: {
        marginBottom: 5,
        marginRight: 5,
    },
    emptySpace: {
        width: 40,
    },
});

export default ChatScreen;
