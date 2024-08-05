import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {InputToolbar, Composer, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomInputToolbar = (props) => {
    return (
        <InputToolbar {...props} containerStyle={styles.inputToolbarContainer}>
            <View style={styles.inputContainer}>
                <Composer {...props} textInputStyle={styles.textInputStyle}/>
                <TouchableOpacity style={styles.attachmentButton}>
                    <MaterialCommunityIcons name="attachment" size={20} color="#024950"/>
                </TouchableOpacity>
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
            </View>
        </InputToolbar>
    );
};

const styles = StyleSheet.create({
    inputToolbarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    textInputStyle: {
        color: '#000000',
        lineHeight: 18,
        paddingTop: 8.5,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 8.5,
        marginLeft: 0,
        marginRight: 0,
        flex: 1,
        maxHeight: 80,
    },
    attachmentButton: {
        padding: 10,
    },
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendIcon: {
        marginBottom: 5,
        marginRight: 5,
    },
});

export default CustomInputToolbar;
