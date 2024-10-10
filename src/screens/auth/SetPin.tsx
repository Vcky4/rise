import React from "react";
import { View, Text, StyleSheet,  } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";



interface IProps {
  navigation: NativeStackNavigationProp<any>;
}


const SetPin: React.FC<IProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Set Pin</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});

export default SetPin;