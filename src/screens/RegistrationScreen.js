import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
// import PlusIcon from "../../assets/svg/plus.svg";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({
  onHide,
  isShowKeyboard,
  isShowPassword,
  setIsShowKeyboard,
  setIsShowPassword }) {
  const [state, setState] = useState(initialState);
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

  const onSubmit = () => {
    onHide();

    console.log(state);
    setState(initialState);
  };

  return (
    <View
      style={{
      ...styles.form,
      paddingBottom: isShowKeyboard ? 32 : 45,
      }}>
      <View style={{ ...styles.avatarThumb, left: (dimensions - 120) / 2 }}>
        <View style={styles.avatarBtn}>
          {/* <PlusIcon/> */}
        </View>
      </View>
              
      <Text style={styles.formTitle}>Регистрация</Text>

      <TextInput
        style={styles.input}
        placeholder="Логин"
        value={state.name}
        onFocus={()=> setIsShowKeyboard(true)}
        onChangeText={(value) =>
          setState((prevState) => ({ ...prevState, name: value }))} />
              
      <TextInput
        style={styles.input}
        placeholder="Адрес электронной почты"
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
          value={state.password}
          secureTextEntry={!isShowPassword}
          onFocus={()=> setIsShowKeyboard(true)}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, password: value }))} />
          <Text style={styles.inputBtn}
            onPress={() => setIsShowPassword(!isShowPassword)}>Показать
          </Text>
      </View>  

      {!isShowKeyboard && 
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
            onPress={onSubmit}>
            <Text style={styles.btnTitle}>Зарегистрироваться</Text>
          </TouchableOpacity>
                  
          <Text style={styles.text}>Уже есть аккаунт? Войти</Text>
        </>}
    </View> 
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
    fontWeight: 400,
    color: "#FFFFFF",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: 400,
    textAlign: "center",
    color: "#1B4371",
  },
});