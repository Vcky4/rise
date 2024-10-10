import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ImageBackground, useColorScheme, Platform } from "react-native";

import colors from "../../../assets/colors/colors";
import authRouts from "../../navigation/routs/authRouts";
import { AuthContext } from "../../../context/AuthContext";


const { width, height } = Dimensions.get("window");
export default Intro = ({ navigation }) => {
    const { onboard, isOnboarded } = useContext(AuthContext)
    const appearance = 'light'
    const [page, setPage] = useState(isOnboarded ? 2 : 0);
    return (
        <View style={styles.container}></View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: height * 0.093,
        height: height,
        resizeMode: 'contain',
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'column',
    },
});