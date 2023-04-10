import React from "react";
import { useFonts } from "expo-font";
import RegistrationScreen from "./ RegistrationScreen";
import LoginScreen from "./LoginScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    // <RegistrationScreen />
    <LoginScreen/>
  )
}