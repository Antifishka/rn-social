import React, {useState, useEffect} from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { theme } from "../constants/theme";

export const Avatar = () => {
    const [dimensions, setDimensions] = useState(
        Dimensions.get("window").width);

    useEffect(() => {
        const onChange = () => {
        const width = Dimensions.get("window").width;

        setDimensions(width);
        };

        const dimensionsHandler = Dimensions.addEventListener("change", onChange);
        return () => dimensionsHandler.remove();
    }, []);

    return (
        <View style={{ ...styles.avatarThumb, left: (dimensions - 120) / 2 }}>
            <TouchableOpacity style={styles.avatarBtn}>
                <Ionicons name="add"
                    size={20}    
                    color={theme.colors.accent} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    avatarThumb: {
        position: "absolute",
        top: -60,
        width: 120,
        height: 120,
        borderRadius: 16,
        backgroundColor: "#F6F6F6",
    },
    avatarBtn: {
        position: "absolute",
        right: -25 / 2,
        bottom: 14,
        justifyContent: "center",
        alignItems: "center",
        width: 25,
        height: 25,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: theme.colors.accent,
    },
})