import React from "react";
import { View, Text, StyleSheet,  } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import colors from "../../../assets/colors/colors";



interface IProps {
  navigation: NativeStackNavigationProp<any>;
}


const Home: React.FC<IProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
});

export default Home;