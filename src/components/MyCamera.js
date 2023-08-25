import React, {useState} from "react";
import { Image, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from "../constants/theme";

export const MyCamera = ({ photo, setState }) => {
    const [camera, setCamera] = useState(null);

    const takePhoto = async () => {
        const { uri } = await camera.takePictureAsync();

        setState((prevState) => ({ ...prevState, photo: uri }));
        console.log("photo", uri);
    }; 
    return (
        <Camera style={styles.camera} ref={setCamera}>
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
        </Camera>  
    )
}

const styles = StyleSheet.create({
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
        borderRadius: 50,
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
})