import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { theme } from "../constants/theme";

export const Comment = ({isCurrentUser, text, createdAt, avatarURL, isShowKeyboard}) => {
    return (
        <View style={{
            ...styles.wrapper,
            flexDirection: isCurrentUser ? "row-reverse" : "row",
            marginTop : isShowKeyboard ? 0 : 24}}>
            <View style={styles.avatarThumb}>
                {avatarURL && <Image source={{ uri: avatarURL }}
                    style={styles.avatar}
                    alt='user photo' />}
            </View>

            <View style={{ ...styles.textWrapper,
                borderTopRightRadius: isCurrentUser ? 0 : 6,
                borderTopLeftRadius: isCurrentUser ? 6 : 0 }}>
                <Text style={styles.text}>{text}</Text>
                <Text style={{ ...styles.date,
                    textAlign: isCurrentUser ? "left" : "right"}}>{createdAt}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        gap: 16,
        width: "100%",
    },
    avatarThumb: {
        overflow: "hidden",
        width: 28,
        height: 28,
        borderRadius: "50%",
        backgroundColor: theme.colors.background,
    },
    avatar: {
        width: 28,
        height: 28,
        resizeMode: "cover",
    },
    textWrapper: {
        flex: 1,
        padding: 16,
        borderRadius: 6,
        backgroundColor: theme.colors.comment,
    },
    text: {
        marginBottom: 8,
        fontFamily: "Roboto-Regular",
        fontSize: 13,
        color: theme.colors.mainText,
    },  
    date: {
        fontFamily: "Roboto-Regular",
        fontSize: 10,
        color: theme.colors.placeholder,
    }
})