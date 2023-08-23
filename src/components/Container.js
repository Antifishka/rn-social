import React from "react";
import { 
    View,
    Platform,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ImageBackground,
    StyleSheet,
} from 'react-native';

export const Container = ({ onClick, children }) => {
    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <ImageBackground style={styles.imageBg}
                    source={require("../../assets/images/bg.jpg")}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}> 
                        {children}
                    </KeyboardAvoidingView>  
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>                
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
        paddingTop: 140,
    },
})    