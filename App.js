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
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import RegistrationScreen from "./src/screens/auth/RegistrationScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import PostsScreen from "./src/screens/mainScreen/PostsScreen";
import CreateScreen from "./src/screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./src/screens/mainScreen/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTab = createMaterialBottomTabNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return <AuthStack.Navigator>
      <AuthStack.Screen
        options={{
          headerShown: false
        }}
        name='Registration'
        component={RegistrationScreen} />
      <AuthStack.Screen
        options={{
          headerShown: false
        }}
        name='Login'
        component={LoginScreen} />
    </AuthStack.Navigator>
  };
  return <MainTab.Navigator>
    <MainTab.Screen name='Posts' component={PostsScreen} />
    <MainTab.Screen name='Create' component={CreateScreen} />
    <MainTab.Screen name='Profile' component={ProfileScreen} />
  </MainTab.Navigator>
};

export default function App() {
  console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const routing = useRoute(null);
  
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

