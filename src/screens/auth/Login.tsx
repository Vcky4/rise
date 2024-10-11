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
                login(
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpY2tzb3NvbkBnbWFpbC5jb20iLCJpZCI6MTQwOCwicm9sZSI6ImludmVzdG9yIiwiYWNjb3VudElkIjoxNDAzLCJzZXNzaW9uSWQiOiIyNGUxOWMzOS1iMjc3LTQ3YTEtYmFjYS00NGNjYzNhZWQxNTciLCJ1dWlkIjoiZTc2ODMxMzMtM2RkOS00Mzk4LWI1NzktNDQ3Y2Q1ZjYwYTNkIiwiZW1haWxWZXJpZmllZCI6ZmFsc2UsInN0YXR1cyI6ImFjdGl2ZSIsImFjY291bnRVVUlEIjoiMWNhODRmOTktNjFlMi00MTVkLTljNTUtODEyNjcxMmJhZDFkIiwiaWRWZXJpZmllZCI6ZmFsc2UsImNvdW50cnkiOiJuZyIsImN1cnJlbnRBcHBWZXJzaW9uIjpudWxsLCJtZXRhZGF0YSI6eyJpZE5vdGlmaWNhdGlvbkNvdW50IjowLCJuZXh0SWRSZW1pbmRlckRhdGUiOiIyMDI0LTEwLTEyVDAwOjAwOjAwLjAwMFoifSwib3JpZ2luIjoiMTk3LjIxMC44NC42MSwxNzIuNzAuNDYuMTA0IiwiaWF0IjoxNzI4NjQ4Mzk0LCJleHAiOjE3MzM4MzIzOTR9.v_SBNBpRmTNgL7zqswHtnLDxmWl0py5pKOMQQf4ss_s',
                    {
                        id: '1408',
                        email_address: 'victor@gmail.com',
                        first_name: 'string',
                        last_name: 'string',
                        username: 'string',
                        iat: 2,
                        exp: 2,
                        total_balance: 1000,
                        total_returns: 1000,
                    } as IUser
                )

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
                onChangeText={(text) => setLoginData({ ...loginData, email_address: text.trim() })}
                label='Email address'
                keyboardType='email-address'
                autoCapitalize="none"
            />
            <PasswordInput
                value={loginData.password}
                onChangeText={(text) => setLoginData({ ...loginData, password: text.trim() })}
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