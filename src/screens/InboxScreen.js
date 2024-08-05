import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MessageCard from '../components/MessageCard';

function InboxScreen({navigation}) {
    const [messages, setMessages] = useState([
        {
            id: '1',
            userName: 'Kaja',
            userImg: 'https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944',
            messageText: 'The room is available. Would you like to schedule a visit?',
            messageTime: '10:30 AM',
            unreadCount: 2,
        },
        {
            id: '2',
            userName: 'Nava',
            userImg: 'https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944',
            messageText: 'Yes, you can visit tomorrow at 10 AM.',
            messageTime: '9:15 AM',
            unreadCount: 1,
        },
        {
            id: '3',
            userName: 'Janu',
            userImg: 'https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944',
            messageText: 'The fee is fixed, but I can offer a discount for long-term stays.',
            messageTime: 'Yesterday',
            unreadCount: 3,
        },
        {
            id: '4',
            userName: 'Keka',
            userImg: 'https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944',
            messageText: 'I am interested in the room for next month.',
            messageTime: 'Monday',
            unreadCount: 0,
        },
        {
            id: '5',
            userName: 'Powsi',
            userImg: 'https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944',
            messageText: 'The boarding includes Wi-Fi, a shared kitchen, and a laundry area.',
            messageTime: 'Sunday',
            unreadCount: 4,
        },
        {
            id: '6',
            userName: 'Saalu',
            userImg: 'https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944',
            messageText: 'Please check-in at the front desk with your ID.',
            messageTime: 'Saturday',
            unreadCount: 0,
        },
        {
            id: '7',
            userName: 'Aasath',
            userImg: 'https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944',
            messageText: 'I have sent more pictures to your chat.',
            messageTime: 'Friday',
            unreadCount: 5,
        },
        {
            id: '8',
            userName: 'Pirasho',
            userImg: 'https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944',
            messageText: 'The earliest move-in date is next Monday.',
            messageTime: 'Thursday',
            unreadCount: 0,
        },
        {
            id: '9',
            userName: 'Nusna',
            userImg: 'https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944',
            messageText: 'There are no additional costs. Everything is included in the fee.',
            messageTime: 'Wednesday',
            unreadCount: 1,
        },
        {
            id: '10',
            userName: 'Pradi',
            userImg: 'https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944',
            messageText: 'Great job on the project!',
            messageTime: 'Tuesday',
            unreadCount: 0,
        },
    ]);

    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState('');

    const toggleSearch = () => {
        setShowSearch(!showSearch);
        setSearchText('');
    };

    const clearSearch = () => {
        setSearchText('');
    };

    const filteredMessages = messages.filter(message =>
        message.userName.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderItem = ({item}) => (
        <MessageCard
            item={item}
            onPress={() => navigation.navigate('Chat', {userName: item.userName})}
        />
    );

    const renderNoMessagesScreen = () => (
        <View style={styles.noMessagesContainer}>
            <Feather name="message-square" size={30} color="#000000"/>
            <Text style={styles.noMessagesText}>You don't have any messages</Text>
            <Text style={styles.noMessagesSubText}>When you receive a new message, it will appear here.</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {showSearch ? (
                    <>
                        <TouchableOpacity onPress={toggleSearch} style={styles.backButton}>
                            <Feather name="arrow-left" size={17} color="#000000"/>
                        </TouchableOpacity>
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search"
                                placeholderTextColor="#000000"
                                value={searchText}
                                onChangeText={setSearchText}
                            />
                            {searchText !== '' && (
                                <TouchableOpacity onPress={clearSearch}>
                                    <Feather name="x" size={17} color="#000000"/>
                                </TouchableOpacity>
                            )}
                        </View>
                    </>
                ) : (
                    <TouchableOpacity onPress={toggleSearch} style={styles.searchIconContainer}>
                        <Feather name="search" size={17} color="#000000"/>
                    </TouchableOpacity>
                )}
            </View>

            {messages.length === 0 ? (
                renderNoMessagesScreen()
            ) : (
                <FlatList
                    data={filteredMessages}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.contentContainer}
                    ListHeaderComponent={<Text style={styles.headerText}>Messages</Text>}
                />
            )}
        </View>
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
        paddingVertical: 10,
        backgroundColor: '#ffffff',
    },
    backButton: {
        padding: 12,
    },
    headerText: {
        fontSize: 26,
        fontWeight: '500',
        color: '#000000',
        marginTop: 10,
        marginBottom: 20,
    },
    searchIconContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 50,
        padding: 12,
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 50,
        paddingHorizontal: 12,
        marginLeft: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#000000',
    },
    noMessagesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noMessagesText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 5,
    },
    noMessagesSubText: {
        fontSize: 14,
        color: '#888888',
    },
});

export default InboxScreen;
