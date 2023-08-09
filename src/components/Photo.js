import React from "react";
import { View, Image, StyleSheet } from "react-native";

export const Photo = ({photo}) => {
    return (
        <View style={styles.imgThumb}>
            <Image source={{ uri: photo }}
                style={{ height: 240, borderRadius: 8 }}
                alt='travel photo' />
        </View> 
    )   
}

const styles = StyleSheet.create({
    imgThumb: {
        overflow: "hidden",
        flex: 1,
        marginBottom: 8,
        borderRadius: 8
    },
})    