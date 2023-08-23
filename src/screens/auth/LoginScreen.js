import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { authSingInUser } from "../../redux/auth/auth-operations";
import { Container } from "../../components/Container";
import { Title } from "../../components/Title";
import { theme } from "../../constants/theme";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false); 
  const dispatch = useDispatch();
  
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    setIsShowPassword(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    keyboardHide();

    dispatch(authSingInUser(state));
    console.log('submit', state);
    
    setState(initialState);
  };

  return (
    <Container onClick={keyboardHide}>
      <View
        style={{
          ...styles.form,
          paddingBottom: isShowKeyboard ? 32 : 111,
        }}>
        <Title>Увійти</Title>
                  
        <TextInput
          style={styles.input}
          placeholder="Адреса електронної пошти"
          placeholderTextColor={theme.colors.placeholder}
          onFocus={() => setIsShowKeyboard(true)}
          value={state.email}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, email: value }))} />
          
        <View>
          <TextInput
            style={{
              ...styles.input,
              marginBottom: isShowKeyboard ? 0 : 43, position: "relative"
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
              <Text style={styles.btnTitle}>Увійти</Text>
            </TouchableOpacity>
                    
            <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
              <Text style={styles.text}>
                Немає акаунту? Зареєструватися
              </Text>
            </TouchableOpacity>
          </>}
      </View>
    </Container>       
  );
}

const styles = StyleSheet.create({
  form: {
    paddingTop: 32,
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: theme.colors.white,
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
    backgroundColor: "#FF6C00",
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: theme.colors.white,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
  },
});