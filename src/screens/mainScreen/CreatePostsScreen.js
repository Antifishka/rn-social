import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../../constants/theme'; 

export default function CreateScreen({ navigation }) {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState('');

    const takePhoto = async () => {
        const photo = await camera.takePictureAsync();
        setPhoto(photo.uri);
        console.log("photo", photo.uri);
    };

    const sendData = () => {
        navigation.navigate("Posts", { photo });
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} ref={setCamera}>
                <TouchableOpacity onPress={takePhoto}
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

            <Text style={styles.text}>{photo ? 'Редагувати фото' : 'Завантажте фото'}</Text>
            
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={sendData} >
                <Text style={styles.btnTitle}>Опубліковати</Text>
            </TouchableOpacity>
        </View>
    )    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.white,
    },
    camera: {
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
        position: "absolute",
        flex: 1,
        borderRadius: 8,
        top: 0,
        left: 0,
    },
    previewImg: {
        overflow: 'hidden',
        height: 240, 
        resizeMode: 'cover',
    },
    text: {
        marginBottom: 32,
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        fontWeight: 400,

        color: theme.colors.placeholder,
    },
    btn: {
        justifyContent: "center",
        alignItems: "center",
        height: 51,
        borderRadius: 100,
        backgroundColor: theme.colors.accent,
    },
    btnTitle: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        fontWeight: 400,
        color: theme.colors.white,
    },
});