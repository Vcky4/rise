import React from "react";
import { View, Text, StyleSheet, Image, } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import colors from "../../../assets/colors/colors";
import Button from "../../component/Button";
import mainRouts from "../../navigation/routs/mainRouts";
import { ThemedText } from "../../component/ThemedText";
import { RouteProp } from "@react-navigation/native";



interface IProps {
    navigation: NativeStackNavigationProp<any>;
    route: RouteProp<any, any>;
}


const Success: React.FC<IProps> = ({ navigation, route }) => {
    const props = route.params;
    return (
        <View style={styles.container}>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '70%',
                gap: 5
            }}>
                <Image
                    source={require("../../../assets/images/success.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <ThemedText type='subtitle' style={{

                }}>{props?.title}</ThemedText>
                <ThemedText style={{
                    color: colors.textGray,
                    width: '80%',
                    marginBottom: '15%',
                    textAlign: 'center'
                }}>{props?.desc}
                </ThemedText>
            </View>
            <Button
                enabled={true}
                title="Okay"
                onPress={() => navigation.navigate(mainRouts.home)}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: '6%',
        backgroundColor: colors.white,
        justifyContent: 'space-between',
        paddingBottom: '16%'
    },
    logo: {
        alignSelf: 'center',
        marginTop: '10%',
        marginBottom: '12%',
        height: 100,
    },
});

export default Success;