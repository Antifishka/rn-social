import React from "react";
import { Platform } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from "./src/router";

export default function App() {
  console.log(Platform.OS);
  const routing = useRoute({});
  
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

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
    //       </KeyboardAvoidingView>  
    //     </ImageBackground>
    //   </View>
    // </TouchableWithoutFeedback> 
  )
}

