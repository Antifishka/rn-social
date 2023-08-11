import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from '../redux/auth/auth-selector';
import { Image, View, Text, StyleSheet } from "react-native";
import { theme } from "../constants/theme";

export const UserCard = () => {
    const { nickname, email, avatarUrl } = useSelector(selectUser);

    return (
        <View style={styles.container}>
            <View style={styles.avatarThumb}>
                <Image style={styles.avatar}
                    source={require("../../assets/images/avatar.png")}
                    alt="avatar" />
            </View>
           
            <View>
                <Text style={styles.name}>{nickname}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 32,
    },
    avatarThumb: {
        overflow: "hidden",
        width: 60,
        height: 60,
        borderRadius: 16,
    },
    avatar: {
        width: 60,
        resizeMode: "cover",
    },
    name: {
        fontFamily: "Roboto-Bold",
        fontSize: 13,
        fontWeight: 700,
        color: theme.colors.mainText,
    },
    email: {
        fontFamily: "Roboto-Regular",
        fontSize: 11,
        fontWeight: 400,
        color: theme.colors.secondaryText,
    }
})