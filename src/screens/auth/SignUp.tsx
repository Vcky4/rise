import React, { useState } from "react";
import { View, StyleSheet, Platform, TouchableOpacity, BackHandler, } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedText } from "../../component/ThemedText";
import colors from "../../../assets/colors/colors";
import InputField from "../../component/InputField";
import PasswordInput from "../../component/PasswordInput";
import Button from "../../component/Button";
import authRouts from "../../navigation/routs/authRouts";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import PhoneInput from "../../component/PhoneInput";
import Icon from "../../component/Icon";
import DatePicker from "react-native-date-picker";
import mainRouts from "../../navigation/routs/mainRouts";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import Toast from "react-native-toast-message";



interface IProps {
    navigation: NativeStackNavigationProp<any>;
}


const SignUp: React.FC<IProps> = ({ navigation }) => {
    const auth = useAuth()
    const [signUpData, setSignUpData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        date_of_birth: '',
        username: ''
    });
    const [countryCode, setCountryCode] = useState('');
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(0);
    const [date, setDate] = useState(new Date())
    //email regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    //regex for least one uppercase letter
    const uppercaseRegex = /(?=.*[A-Z])/;
    //regex for least one unique character
    const uniqueRegex = /(?=.*[!@#$%^&*?])/;
    //regex for minimum of 8 characters
    const lengthRegex = /^.{10,}$/;


    const canProceed = step === 0 ?
        emailRegex.test(signUpData.email) &&
        uppercaseRegex.test(signUpData.password) &&
        uniqueRegex.test(signUpData.password) &&
        lengthRegex.test(signUpData.password)
        : signUpData.firstName.length > 0 &&
        signUpData.lastName.length > 0 &&
        signUpData.date_of_birth.length > 4 &&
        signUpData.phone.length > 4

    const mutation = useMutation({
        mutationFn: async () => {
            return await fetch('https://manator-staging-qogza.ondigitalocean.app/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...signUpData,
                    phone: `${countryCode}${signUpData.phone}`
                })
            }).then(res => res.json())
        },
        onSuccess: (data) => {
            console.log(data)
            if (data.token) {
                navigation.navigate(mainRouts.success, {
                    title: 'You just created your Rise account',
                    desc: 'Welcome to Rise, let’s take you home',
                });
                // login(data.data.token, data.data as IUser)
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: data?.errors?.message
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

    BackHandler.addEventListener('hardwareBackPress', () => {
        if (step === 1) {
            setStep(0);
            return true
        }
        navigation.goBack()
        return false
    })
    return (
        <View style={styles.container}>
            <ThemedText type='subtitle'>{
                step === 0 ? 'Create an account' : 'Tell Us More About You'
            }</ThemedText>
            <ThemedText style={{
                color: colors.textGray,
                width: '95%',
                marginBottom: '10%'
            }}>
                {step === 0
                    ? 'Start building your dollar-denominated investment portfolio'
                    : 'Please use your name as it appears on your ID.'
                }
            </ThemedText>

            {step === 0 &&
                <>
                    <InputField
                        value={signUpData.email}
                        onChangeText={(text) => setSignUpData({ ...signUpData, email: text })}
                        label='Email address'
                        keyboardType='email-address'
                        autoCapitalize="none"
                    />
                    <PasswordInput
                        value={signUpData.password}
                        onChangeText={(text) => setSignUpData({ ...signUpData, password: text })}
                        label='Password'
                    />
                    {
                        [
                            'Minimum of 10 characters',
                            'One UPPERCASE character',
                            'One unique character (e.g: !@#$%^&*?)'
                        ].map((item, index) => <View key={index} style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <BouncyCheckbox
                                innerIconStyle={{
                                    borderRadius: 10,
                                    borderColor: colors.primary,
                                    borderWidth: 1,
                                    width: 20,
                                    height: 20,
                                }}
                                fillColor={colors.primary}
                                iconStyle={{
                                    borderRadius: 10,
                                    borderColor: colors.primary,
                                    borderWidth: 1,
                                    width: 20,
                                    height: 20,
                                }}
                                isChecked={
                                    index === 0 ? lengthRegex.test(signUpData.password) :
                                        index === 1 ? uppercaseRegex.test(signUpData.password) :
                                            uniqueRegex.test(signUpData.password)
                                }
                                text=""
                                disableBuiltInState
                                onPress={() => { }}
                            />
                            <ThemedText style={{
                                fontSize: 14,
                            }}>{item}
                            </ThemedText>
                        </View>
                        )
                    }
                </>
            }

            {step === 1 &&
                <>
                    <InputField
                        value={signUpData.firstName}
                        onChangeText={(text) => setSignUpData({ ...signUpData, firstName: text.trim() })}
                        label='Legal First Name'
                    />
                    <InputField
                        value={signUpData.lastName}
                        onChangeText={(text) => setSignUpData({ ...signUpData, lastName: text.trim() })}
                        label='Legal Last Name'
                    />
                    <InputField
                        value={signUpData.username}
                        onChangeText={(text) => setSignUpData({ ...signUpData, username: text.trim() })}
                        label='Nick name'
                    />
                    <PhoneInput
                        value={signUpData.phone}
                        onChangeText={(text) => setSignUpData({ ...signUpData, phone: text.trim() })}
                        onSelection={(item) => setCountryCode(item)}
                    />
                    <View style={[{
                        borderColor: colors.borderInactive,
                        borderRadius: 5,
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        height: 50,
                        justifyContent: 'center',
                    }]}>
                        <ThemedText style={{
                            position: 'absolute',
                            fontSize: 14,
                            display: signUpData.date_of_birth?.length ?? 0 > 0 ? 'flex' : 'none',
                            color: colors.primary,
                            left: 10,
                            backgroundColor: colors.white,
                            paddingHorizontal: 5,
                            transform: [{
                                translateY: Platform.OS === 'ios' ? -40 : -25,
                            }]
                        }}>Date of Birth</ThemedText>
                        <TouchableOpacity onPress={() => setOpen(true)}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                            }}>
                            <ThemedText style={{
                                fontSize: 16,
                                fontFamily: 'DMSans-SemiBold',
                                color: colors.textDark,
                            }}>{signUpData.date_of_birth || 'Choose date'}</ThemedText>
                            <Icon
                                source={require('../../../assets/images/calender.png')}
                                size={20}
                            />

                        </TouchableOpacity>
                        <DatePicker
                            modal
                            mode="date"
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                                setSignUpData({ ...signUpData, date_of_birth: date.toISOString().split('T')[0] });
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                    </View>
                </>
            }
            <Button
                enabled={canProceed}
                title='Sign In'
                loading={mutation.isPending}
                onPress={() => {
                    if (step === 0) {
                        setStep(1);
                    } else {
                        mutation.mutate()
                    }
                }}
            />

            {step === 1 && <ThemedText style={{
                color: colors.textGray,
                width: '95%',
                marginTop: '10%',
                alignSelf: 'center',
                textAlign: 'center'
            }}>
                By clicking Continue, you agree to our <ThemedText style={{
                    color: colors.primary
                }}>Terms of Service</ThemedText> and <ThemedText style={{
                    color: colors.primary
                }}>Privacy Policy</ThemedText>
            </ThemedText>
            }


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

export default SignUp;