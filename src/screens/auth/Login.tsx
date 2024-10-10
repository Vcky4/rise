import React from "react";
import { View, StyleSheet, } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedText } from "../../component/ThemedText";
import colors from "../../../assets/colors/colors";
import InputField from "../../component/InputField";
import PasswordInput from "../../component/PasswordInput";
import Button from "../../component/Button";
import authRouts from "../../navigation/routs/authRouts";



interface IProps {
    navigation: NativeStackNavigationProp<any>;
}


const Login: React.FC<IProps> = ({ navigation }) => {
    const [loginData, setLoginData] = React.useState({
        email: '',
        password: ''
    });

    //email regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const canProceed = emailRegex.test(loginData.email) && loginData.password.length > 0;
    return (
        <View style={styles.container}>
            <ThemedText type='subtitle' style={{

            }}>Welcome back</ThemedText>
            <ThemedText style={{
                color: colors.textGray,
                width: '95%',
                marginBottom: '15%'
            }}>
                Let’s get you logged in to get back to building your dollar-denominated investment portfolio.
            </ThemedText>

            <InputField
                value={loginData.email}
                onChangeText={(text) => setLoginData({ ...loginData, email: text })}
                label='Email address'
                keyboardType='email-address'
            />
            <PasswordInput
                value={loginData.password}
                onChangeText={(text) => setLoginData({ ...loginData, password: text })}
                label='Password'
            />

            <Button
                enabled={canProceed}
                title='Sign In'
                onPress={() => navigation.navigate('Home')}
            />

            <ThemedText type='link' style={{
                textAlign: 'center',
                marginTop: '6%'
            }}>
                I forgot my password
            </ThemedText>

            <ThemedText style={{
                textAlign: 'center',
                marginTop: '6%',
                position: 'absolute',
                color: colors.textGray,
                bottom: 30,
                alignSelf: 'center',
            }}>
                Don't have an account?
                <ThemedText style={{
                    color: colors.primary,
                }}
                    onPress={() => navigation.navigate(authRouts.signUp)}
                > Sign up</ThemedText>
            </ThemedText>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: '15%',
        backgroundColor: colors.white,
        gap: 16
    },
});

export default Login;