import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import colors from "../../../assets/colors/colors";
import authRouts from "../../navigation/routs/authRouts";
import { AuthContext } from "../../../context/AuthContext";


interface IntroProps {
  navigation: NativeStackNavigationProp<any>;
}

// Get window dimensions
const { width, height } = Dimensions.get("window");

const Intro: React.FC<IntroProps> = ({ navigation }) => {
  const { onboard, isOnboarded } = useContext(AuthContext);
  const [page, setPage] = useState<number>(isOnboarded ? 2 : 0); // Use proper type

  return (
    <View style={styles.container}>
      {/* Render your components here */}
    </View>
  );
};

// Define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Intro;
