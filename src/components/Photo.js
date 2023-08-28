import React from "react";
import { View, Image, StyleSheet } from "react-native";

export const Photo = ({photo}) => {
    return (
        <View style={styles.imgThumb}>
            <Image source={{ uri: photo }}
                style={{ width: "100%", height: 240 }}
                alt='travel photo' />
        </View> 
    )   
}

const styles = StyleSheet.create({
    imgThumb: {
        overflow: "hidden",
        height: 240,
        marginBottom: 8,
        borderRadius: 8
    },
})    