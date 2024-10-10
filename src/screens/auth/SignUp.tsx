import React from "react";
import { View, StyleSheet, } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedText } from "../../component/ThemedText";
import colors from "../../../assets/colors/colors";
import InputField from "../../component/InputField";
import PasswordInput from "../../component/PasswordInput";
import Button from "../../component/Button";
import authRouts from "../../navigation/routs/authRouts";
import BouncyCheckbox from "react-native-bouncy-checkbox";



interface IProps {
    navigation: NativeStackNavigationProp<any>;
}


const SignUp: React.FC<IProps> = ({ navigation }) => {
    const [signUpData, setSignUpData] = React.useState({
        email: '',
        password: ''
    });
    const [step, setStep] = React.useState(0);

    //email regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    //regex for least one uppercase letter
    const uppercaseRegex = /(?=.*[A-Z])/;
    //regex for least one unique character
    const uniqueRegex = /(?=.*[!@#$%^&*?])/;
    //regex for minimum of 8 characters
    const lengthRegex = /^.{8,}$/;

    const canProceed = step === 0 ?
        emailRegex.test(signUpData.email) &&
        uppercaseRegex.test(signUpData.password) &&
        uniqueRegex.test(signUpData.password) &&
        lengthRegex.test(signUpData.password)
        : true

    return (
        <View style={styles.container}>
            <ThemedText type='subtitle'>{
                step === 0 ? 'Create an account' : 'Tell Us More About You'
            }</ThemedText>
            <ThemedText style={{
                color: colors.textGray,
                width: '95%',
                marginBottom: '15%'
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
                    />
                    <PasswordInput
                        value={signUpData.password}
                        onChangeText={(text) => setSignUpData({ ...signUpData, password: text })}
                        label='Password'
                    />
                    {
                        [
                            'Minimum of 8 characters',
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

            <Button
                enabled={canProceed}
                title='Sign In'
                onPress={() => {
                    if (step === 0) {
                        setStep(1);
                    }
                }}
            />


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