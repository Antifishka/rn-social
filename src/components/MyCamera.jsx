import React from "react";
import { Image, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from "../constants/theme";

export const MyCamera = ({ setCamera, onClickSnap, photo }) => {
    return (
        <>
            <Camera style={styles.camera} ref={setCamera}>
                <TouchableOpacity onPress={onClickSnap}
                    style={{...styles.cameraBtn,
                        backgroundColor: photo ? 'rgba(255, 255, 255, 0.3)' :  theme.colors.white }}>
                    <FontAwesome name="camera" size={24}
                        color={photo ? theme.colors.white : theme.colors.placeholder} />
                </TouchableOpacity>
            </Camera>

            {photo && <View style={styles.previewContainer}>
                <Image source={{ uri: photo }}
                    alt='preview'
                    style={styles.previewImg} />
            </View>}
        </>    
    )
}

const styles = StyleSheet.create({
    camera: {
        overflow: "hidden",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        height: 240,
        marginTop: 32,
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: "#F6F6F6",
    },
    cameraBtn: {
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    previewContainer: {
        overflow: "hidden",
        position: "absolute",
        flex: 1,
        borderRadius: 8,
        top: 0,
        left: 0,
    },
    previewImg: {
        height: 240,
        resizeMode: 'cover',
    },
})