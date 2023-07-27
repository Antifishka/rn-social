import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false); 
  
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
        <ImageBackground
          style={styles.imageBg}
          source={require("../../../assets/images/bg.jpg")}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}> 
            <View
              style={{
              ...styles.form,
              paddingBottom: isShowKeyboard ? 32 : 111,
              }}>
              <Text style={styles.formTitle}>Увійти</Text>
                
              <TextInput
                style={styles.input}
                placeholder="Адреса електронної пошти"
                onFocus={() => setIsShowKeyboard(true)}
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }/>
                
              <View>
                  <TextInput
                    style={{
                      ...styles.input,
                      marginBottom: isShowKeyboard ? 0 : 43,
                      position: "relative"
                    }}
                    placeholder="Пароль"
                    value={state.password}
                    secureTextEntry={!isShowPassword}
                    onFocus={()=> setIsShowKeyboard(true)}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, password: value }))
                    }
                  />
                  
                  <Text style={styles.inputBtn}
                    onPress={() => setIsShowPassword(!isShowPassword)}>Показати</Text>
              </View>
                
              {!isShowKeyboard && 
                  <>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.btn}
                      onPress={onSubmit}>
                      <Text style={styles.btnTitle}>Увійти</Text>
                    </TouchableOpacity>
                    
                  <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                    <Text style={styles.text}>
                      Немає акаунту? Зареєструватися
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
    paddingTop: 32,
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