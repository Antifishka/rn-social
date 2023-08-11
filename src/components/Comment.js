import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../constants/theme";

export const Comment = ({text, time}) => {
    console.log("time", time);

    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        // flexDirection: "row",
        padding: 16,
        marginTop: 24,
        borderRadius: 6,
        backgroundColor: theme.colors.comment,
    },
    text: {
        fontFamily: "Roboto-Regular",
        fontSize: 13,
        color: theme.colors.mainText,
    }
})