import React from "react";
import { View, Text, StyleSheet,  } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";



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

    },
});

export default Home;