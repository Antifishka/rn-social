import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from "./src/router";

export default function App() {
  console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const routing = useRoute({});
  
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    setIsShowPassword(false);
    Keyboard.dismiss();
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    // <TouchableWithoutFeedback onPress={keyboardHide}>
    //   <View style={styles.container}>
    //     <ImageBackground
    //       style={styles.imageBg}
    //       source={require("./assets/images/bg.jpg")}>
    //       <KeyboardAvoidingView
    //         behavior={Platform.OS == "ios" ? "padding" : "height"}>
    <NavigationContainer>{routing}</NavigationContainer>
            // {/* <RegistrationScreen
            //   onHide={keyboardHide}
            //   isShowKeyboard={isShowKeyboard}
            //   isShowPassword={isShowPassword}
            //   setIsShowKeyboard={setIsShowKeyboard}
            //   setIsShowPassword={setIsShowPassword} /> */}

            // {/* <LoginScreen
            //   onHide={keyboardHide}
            //   isShowKeyboard={isShowKeyboard}
            //   isShowPassword={isShowPassword}
            //   setIsShowKeyboard={setIsShowKeyboard}
            //   setIsShowPassword={setIsShowPassword} /> */}
    //       </KeyboardAvoidingView>  
    //     </ImageBackground>
    //   </View>
    // </TouchableWithoutFeedback> 
  )
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
});

