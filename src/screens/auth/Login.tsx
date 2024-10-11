import React, { useContext } from "react";
import { View, StyleSheet, } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedText } from "../../component/ThemedText";
import colors from "../../../assets/colors/colors";
import InputField from "../../component/InputField";
import PasswordInput from "../../component/PasswordInput";
import Button from "../../component/Button";
import authRouts from "../../navigation/routs/authRouts";
import { AuthContext } from "../../../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import Toast from "react-native-toast-message";
import IUser from "../../network/models/IUser";



interface IProps {
    navigation: NativeStackNavigationProp<any>;
}


const Login: React.FC<IProps> = ({ navigation }) => {
    const { login } = useContext(AuthContext);
    const [loginData, setLoginData] = React.useState({
        email_address: '',
        password: ''
    });
    const auth = useAuth()

    //email regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const canProceed = emailRegex.test(loginData.email_address) && loginData.password.length > 0;

    const mutation = useMutation({
        mutationFn: async () => {
            return await auth.login(loginData)
        },
        onSuccess: (data) => {
            if (data?.res.ok && data.data) {
                login(data.data.token, data.data as IUser)
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: data?.err?.message
                })
            }
        },
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: err?.message
            })
        }

    })
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
                value={loginData.email_address}
                onChangeText={(text) => setLoginData({ ...loginData, email_address: text })}
                label='Email address'
                keyboardType='email-address'
                autoCapitalize="none"
            />
            <PasswordInput
                value={loginData.password}
                onChangeText={(text) => setLoginData({ ...loginData, password: text })}
                label='Password'
            />

            <Button
                enabled={canProceed}
                title='Sign In'
                loading={mutation.isPending}
                onPress={() => mutation.mutate()}
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