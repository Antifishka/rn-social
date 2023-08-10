import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity, 
    Dimensions,
    Keyboard,
} from "react-native";
import { authSingUpUser } from "../../redux/auth/auth-operations";
import { Container } from "../../components/Container";
import { Ionicons } from '@expo/vector-icons';
import { theme } from "../../constants/theme";

const initialState = {
  nickname: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
    const [state, setState] = useState(initialState);
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);

    const dispatch = useDispatch();

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

    const handleSubmit = () => {
        keyboardHide();

        console.log(state);
        dispatch(authSingUpUser(state));

        setState(initialState);
    };

    return (
        <Container onClick={keyboardHide}>
            <View style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 32 : 45,
            }}>
                <View style={{ ...styles.avatarThumb, left: (dimensions - 120) / 2 }}>
                    <TouchableOpacity style={styles.avatarBtn}>
                        <Ionicons name="add"
                            size={20}    
                            color={theme.colors.accent} />
                    </TouchableOpacity>
                </View>
                                
                <Text style={styles.formTitle}>Реєстрація</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Логін"
                    placeholderTextColor={theme.colors.placeholder}
                    value={state.nickname}
                    onFocus={()=> setIsShowKeyboard(true)}
                    onChangeText={(value) =>
                        setState((prevState) => ({ ...prevState, nickname: value }))} />
                                
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
                                onPress={handleSubmit}>
                                <Text style={styles.btnTitle}>Зареєстуватися</Text>
                            </TouchableOpacity>
                                    
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.text}>
                                    Вже є акаунт? Увійти
                                </Text>
                            </TouchableOpacity>
                        </>}
            </View> 
        </Container>                       
    );
}

const styles = StyleSheet.create({
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
        borderColor: theme.colors.accent,
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
        borderColor: theme.colors.border,
        height: 50,
        borderRadius: 8,
        fontFamily: "Roboto-Regular",
        color: theme.colors.mainText,
        backgroundColor: theme.colors.background,
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