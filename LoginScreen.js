import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [state, setState] = useState(initialState);

  console.log(Platform.OS);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    setIsShowPassword(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBg}
          source={require("./assets/images/bg.jpg")}>
          <View
            style={{
              ...styles.form,
              paddingBottom: isShowKeyboard && Platform.OS === "ios" ? 200 : 66,
            }}>
            <Text style={styles.formTitle}>Войти</Text>
            <TextInput
              style={styles.input}
              placeholder="Адрес электронной почты"
              onFocus={()=> setIsShowKeyboard(true)}
              value={state.email}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
            />
            
            <View>
              <TextInput
                style={{ ...styles.input, marginBottom: 43 , position: "relative" }}
                placeholder="Пароль"
                value={state.password}
                secureTextEntry={!isShowPassword}
                onFocus={()=> setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
              <Text style={styles.inputBtn}
                onPress={() => setIsShowPassword(!isShowPassword)}>Показать</Text>
            </View>
            
            {!isShowKeyboard && 
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btn}
                  onPress={keyboardHide}>
                  <Text style={styles.btnTitle}>Зарегистрироваться</Text>
                </TouchableOpacity>
                
                <Text style={styles.text}>Уже есть аккаунт? Войти</Text>
                </>}
            
          </View>
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
    paddingTop: 92,
    paddingBottom: 111,
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  formTitle: {
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    textAlign: "center",
    color: "#212121",
  },
  input: {
    marginBottom: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
    color: "#212121",
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
    backgroundColor: "#FF6C00",
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#FFFFFF",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
  },
});