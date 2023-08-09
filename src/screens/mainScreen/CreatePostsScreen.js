import React, { useState, useEffect } from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Text,
    StyleSheet,
    Keyboard,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';
import * as Location from "expo-location";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase/config';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../constants/theme'; 
import { MyCamera } from '../../components/MyCamera';

const initialState = {
    photo: '',
    title: '',
    locationName: '',
    latitude: '',
    longitude: '',
};

export default function CreateScreen({ navigation }) {
    const [camera, setCamera] = useState(null);
    const [state, setState] = useState(initialState);
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);

    const { photo, title, locationName } = state;
    const disabled = photo && title && locationName;

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            console.log("status location", status);

            if (status !== 'granted') {
                console.log("Permission to access location was denied");
                return;
            }
        })();
    }, []);

    // useEffect(() => {
    //     (async () => {
    //         const { status } = await Camera.requestCameraPermissionsAsync();
    //         console.log("status camera", status);

    //         if (status !== 'granted') {
    //             console.log('Permission to access camera was denied');
    //             return;
    //         }
    //     })();
    // }, []);

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
    };

    const takePhoto = async () => {
        const photo = await camera.takePictureAsync();
        setState((prevState) => ({ ...prevState, photo: photo.uri }));
        console.log("photo", photo.uri);

        const location = await Location.getCurrentPositionAsync();
        setState((prevState) => ({
            ...prevState,
            latitude: location.coords.latitude, longitude: location.coords.longitude
        }));
        console.log("latitude", location.coords.latitude);
        console.log("longitude", location.coords.longitude);
    };

    const uploadPhotoToServer = async () => {
        const response = await fetch(photo);
        const file = await response.blob(); // change format to Blob

        const imageId = Date.now().toString();

        const imageRef = ref(storage, `postImages/${imageId}`);

        await uploadBytes(imageRef, file); // upload image
        
        const imageURL = await getDownloadURL(imageRef); // get image URL
        console.log('imageURL', imageURL);
    }

    const sendData = () => {
        if (!disabled) {
            return Alert.alert('Waiting for missing fields');
        }
        uploadPhotoToServer();

        navigation.navigate("Posts", { postData: state });

        setState(initialState);
    }

    const deleteData = () => {
        setState(initialState);
    }

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.container}>
                <MyCamera
                    setCamera={setCamera}
                    onClickSnap={takePhoto}
                    photo={photo} />

                <Text style={{ ...styles.text, marginBottom: isShowKeyboard ? 2 : 48 }}>
                    {photo ? 'Редагувати фото' : 'Завантажте фото'}
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Назва..."
                    placeholderTextColor={theme.colors.placeholder}
                    value={state.title}
                    onFocus={()=> setIsShowKeyboard(true)}
                    onChangeText={(v) => setState((pS) => ({ ...pS, title: v }))}
                />

                <View style={styles.inputWrapper}>
                    <TextInput
                        style={{
                            ...styles.input,
                            marginBottom:32, paddingLeft: 28 }}
                        placeholder="Місцевість..."
                        placeholderTextColor={theme.colors.placeholder}
                        value={state.locationName}
                        onFocus={()=> setIsShowKeyboard(true)}
                        onChangeText={(v) => setState((pS) => ({ ...pS, locationName: v }))} />
                    <Feather name="map-pin"
                        size={22}
                        color={theme.colors.placeholder}
                        style={styles.locationIcon} />
                </View>
                
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        ...styles.sendBtn,
                        backgroundColor: disabled ? theme.colors.accent : theme.colors.background }}
                    onPress={sendData} >
                    <Text style={{
                        ...styles.sendBtnTitle,
                        color: disabled ? theme.colors.white : theme.colors.placeholder }}>
                        Опубліковати
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.deleteBtn}
                    onPress={deleteData} >
                    <Feather name="trash-2" size={24} color={theme.colors.placeholder} />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>    
    )    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.white,
    },
    text: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        fontWeight: 400,

        color: theme.colors.placeholder,
    },
    inputWrapper: {
        position: "relative",
    },
    input: {
        marginBottom: 16,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: theme.colors.border,
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
    },
    sendBtnTitle: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        fontWeight: 400,
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
    },
    locationIcon: {
        position: "absolute",
        top: 12,
        left: 0,
    },
});