import React from "react";
import { View, Dimensions, StyleSheet, Image } from "react-native";

const { width, height } = Dimensions.get("window");

const Splash = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
            source={require("../../../assets/images/splash.png")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#0898A0'
    },
    image: {
        resizeMode: "contain",
        width: width,
        height: height,
        marginBottom: 80,
    
    }
});

export default Splash;