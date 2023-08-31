import React, { useState } from "react";
import { Text, Image, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import { FontAwesome, Feather } from '@expo/vector-icons';
import { theme } from "../constants/theme";

export const MyCamera = ({ photo, setState }) => {
    const [camera, setCamera] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    if (!permission) {
        return <View />
    }

    if (!permission.granted) {
        return (
        <View style={styles.permissionBox}>
            <Text style={styles.permissionText}>Дозволити використання камери</Text>
                <TouchableOpacity style={styles.permissionBtn}
                    activeOpacity={0.8}
                    onPress={()=> requestPermission(permission.granted === true)}>
                <Text style={styles.permissionBtnTitle}>Так</Text>
            </TouchableOpacity>
        </View>
        )
    }

    function toggleCameraType() {
        setType(current =>
            (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePhoto = async () => {
        const { uri } = await camera.takePictureAsync();
        await MediaLibrary.createAssetAsync(uri);

        setState((prevState) => ({ ...prevState, photo: uri }));
        console.log("photo", uri);
    }; 
    return (
        <Camera style={styles.camera} ref={setCamera} type={type}>
            <TouchableOpacity onPress={takePhoto}
                style={{
                    ...styles.cameraBtn,
                    backgroundColor: photo ? 'rgba(255, 255, 255, 0.3)' : theme.colors.white
                }} >
                <FontAwesome name="camera" size={24}
                    color={photo ? theme.colors.white : theme.colors.placeholder} />
            </TouchableOpacity>

            {photo && <View style={styles.previewContainer}>
                <Image source={{ uri: photo }}
                    alt='preview'
                    style={styles.previewImg} />
            </View>}

            <TouchableOpacity style={styles.toggleBtn}
                onPress={toggleCameraType}>
                <Feather name="refresh-cw" size={24} color={theme.colors.white} />
            </TouchableOpacity>
        </Camera>  
    )
}

const styles = StyleSheet.create({
    permissionBox: {
        height: 240,
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        marginTop: 32,
        marginBottom: 8,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.background,
    },
    permissionText: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        color: theme.colors.mainText,
    },
    permissionBtn: {
        justifyContent: "center",
        alignItems: "center",
        height: 51,
        borderRadius: "50%",
        paddingHorizontal: 32,
        backgroundColor: theme.colors.accent,
    },
    permissionBtnTitle: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        color: theme.colors.white,
    },
    camera: {
        overflow: "hidden",
        position: "relative",
        height: 240,
        marginTop: 32,
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.background,
    },
    cameraBtn: {
        position: "absolute",
        zIndex: 20,
        left: "50%",
        top: "50%",
        transform: [{translateX: -30}, {translateY: -30}],
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
        borderRadius: "50%",
    },
    previewContainer: {
        overflow: "hidden",
        position: "absolute",
        zIndex: 10,
        flex: 1,
        borderRadius: 8,
        top: 0,
        left: 0,
        width: "100%",
        height: 240,
    },
    previewImg: {
        width: "100%",
        height: 240,
        resizeMode: 'cover',
    },
    toggleBtn: {
        position: "absolute",
        zIndex: 20,
        bottom: 14,
        right: 14,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    }
})