import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from "expo-location";
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../constants/theme'; 

export default function CreateScreen({ navigation }) {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            console.log("status", status);

            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
        })();
    }, []);

    const takePhoto = async () => {
        const photo = await camera.takePictureAsync();
        setPhoto(photo.uri);
        console.log("photo", photo.uri);

        const location = await Location.getCurrentPositionAsync();
        console.log("latitude", location.coords.latitude);
        console.log("longitude", location.coords.longitude);
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

            <TextInput
                style={styles.input}
                placeholder="Назва..."
                placeholderTextColor={theme.colors.placeholder}
                // value={title}
                // onFocus={()=> setIsShowKeyboard(true)}
                // onChangeText={(value) =>
                //     setState((prevState) => ({ ...prevState, name: value }))}
            />

            <TextInput
                style={{
                    ...styles.input,
                    marginBottom:32, paddingLeft: 28 }}
                placeholder="Місцевість..."
                placeholderTextColor={theme.colors.placeholder}
                // value={state.name}
                // onFocus={()=> setIsShowKeyboard(true)}
                // onChangeText={(value) =>
                //     setState((prevState) => ({ ...prevState, name: value }))}
            />
            
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.sendBtn}
                onPress={sendData} >
                <Text style={styles.sendBtnTitle}>Опубліковати</Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.deleteBtn}
                onPress={()=>{}} >
                <Feather name="trash-2" size={24} color={theme.colors.placeholder} />
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
    text: {
        marginBottom: 32,
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        fontWeight: 400,

        color: theme.colors.placeholder,
    },
    input: {
        marginBottom: 16,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: "#E8E8E8",
        height: 50,
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        color: theme.colors.mainText,
    },
    sendBtn: {
        justifyContent: "center",
        alignItems: "center",
        height: 51,
        borderRadius: 100,
        backgroundColor: theme.colors.background,
    },
    sendBtnTitle: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        fontWeight: 400,
        color: theme.colors.placeholder,
    },
    deleteBtn: {
        marginTop: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 22,
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.background,
    }
});