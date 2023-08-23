import React from "react";
import { Text, StyleSheet } from 'react-native';
import { theme } from "../constants/theme";

export const Title = ({ children }) => {
    return (
        <Text style={styles.title}>{children}</Text>
    )
};

const styles = StyleSheet.create({
    title: {
        marginBottom: 33,
        fontFamily: "Roboto-Medium",
        fontSize: 30,
        textAlign: "center",
        color: theme.colors.mainText,
    },
})    