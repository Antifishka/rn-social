import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity, 
    Dimensions,
    Keyboard,
    Platform,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ImageBackground,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { theme } from "../../constants/theme";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
    const [state, setState] = useState(initialState);
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
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

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        setIsShowPassword(false);
        Keyboard.dismiss();
    };

    const onSubmit = () => {
        keyboardHide();

        console.log(state);
        setState(initialState);
    };

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.container}>
                <ImageBackground style={styles.imageBg}
                    source={require("../../../assets/images/bg.jpg")}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}> 
                        <View
                        style={{
                            ...styles.form,
                            paddingBottom: isShowKeyboard ? 32 : 45,
                        }}>
                        <View style={{ ...styles.avatarThumb, left: (dimensions - 120) / 2 }}>
                            <TouchableOpacity style={styles.avatarBtn}>
                                <Ionicons name="add-outline"
                                    size={21}
                                    color={theme.colors.accent} />
                                </TouchableOpacity>
                        </View>
                                
                        <Text style={styles.formTitle}>Реєстрація</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Логін"
                            placeholderTextColor={theme.colors.placeholder}
                            value={state.name}
                            onFocus={()=> setIsShowKeyboard(true)}
                            onChangeText={(value) =>
                            setState((prevState) => ({ ...prevState, name: value }))} />
                                
                        <TextInput
                            style={styles.input}
                            placeholder="Адреса електронної пошти"
                            placeholderTextColor={theme.colors.placeholder}
                            onFocus={()=> setIsShowKeyboard(true)}
                            value={state.email}
                            onChangeText={(value) =>
                            setState((prevState) => ({ ...prevState, email: value }))} />
                                
                        <View>
                            <TextInput
                            style={{
                                ...styles.input,
                                marginBottom: isShowKeyboard ? 0 : 43,
                                position: "relative"
                            }}
                            placeholder="Пароль"
                            placeholderTextColor={theme.colors.placeholder}
                            value={state.password}
                            secureTextEntry={!isShowPassword}
                            onFocus={()=> setIsShowKeyboard(true)}
                            onChangeText={(value) =>
                                setState((prevState) => ({ ...prevState, password: value }))} />
                            <Text style={styles.inputBtn}
                                onPress={() => setIsShowPassword(!isShowPassword)}>Показати
                            </Text>
                        </View>  

                        {!isShowKeyboard && 
                            <>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.btn}
                                onPress={onSubmit}>
                                <Text style={styles.btnTitle}>Зареєстуватися</Text>
                            </TouchableOpacity>
                                    
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={styles.text}>
                                        Вже є акаунт? Увійти
                                    </Text>
                                </TouchableOpacity>
                            </>}
                        </View> 
                    </KeyboardAvoidingView>  
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>                 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    imageBg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
    },
    form: {
        position: "relative",
        paddingTop: 92,
        paddingHorizontal: 16,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: "#FFFFFF",
    },
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
        borderColor: "#FF6C00",
    },
    formTitle: {
        marginBottom: 33,
        fontFamily: "Roboto-Medium",
        fontSize: 30,
        textAlign: "center",
        color: theme.colors.mainText,
    },
    input: {
        marginBottom: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        height: 50,
        borderRadius: 8,
        fontFamily: "Roboto-Regular",
        color: theme.colors.mainText,
        backgroundColor: "#F6F6F6",
    },
    inputBtn: {
        position: "absolute",
        right: 16,
        top: 16,
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        color: "#1B4371",
    },
    btn: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
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
    text: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        fontWeight: 400,
        textAlign: "center",
        color: theme.colors.secondaryAccent,
    },
});