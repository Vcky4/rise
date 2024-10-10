import React, { useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedText } from "../../component/ThemedText";
import colors from "../../../assets/colors/colors";
import InputField from "../../component/InputField";
import PasswordInput from "../../component/PasswordInput";
import Button from "../../component/Button";
import authRouts from "../../navigation/routs/authRouts";
import Icon from "../../component/Icon";
import OtpFields from "../../component/OtpFields";
import { AuthContext } from "../../../context/AuthContext";
import mainRouts from "../../navigation/routs/mainRouts";



interface IProps {
    navigation: NativeStackNavigationProp<any>;
}


const SetPin: React.FC<IProps> = ({ navigation }) => {
    const { pin, setPin, confirmPin } = useContext(AuthContext);
    const [data, setData] = React.useState({
        pin: '',
        confirmPin: ''
    });
    const [step, setStep] = React.useState(0);
    const [error, setError] = React.useState(false);

    const text = [
        {
            title: 'Create a 6-digit PIN',
            desc: 'You’ll use this PIN to sign in and confirm transactions'
        },
        {
            title: 'Confirm 6-digit PIN',
            desc: 'You’ll use this PIN to sign in and confirm transactions'
        },
        {
            title: 'Enter your 6-digit PIN',
            desc: 'Please enter your 6-digit PIN to sign in'
        }
    ]

    const handlePress = (key: string) => {
        if (step === 0) {
            setData({ ...data, pin: data.pin + key });
        } else {
            setData({ ...data, confirmPin: data.confirmPin + key });
        }
    };

    const handleDelete = () => {
        if (step === 0) {
            setData({ ...data, pin: data.pin.slice(0, -1) });
        } else {
            setData({ ...data, confirmPin: data.confirmPin.slice(0, -1) });
        }
    };

    const canProceed = data.pin === data.confirmPin

    useEffect(() => {
        if (data.pin.length === 6 && step === 0) {
            setStep(1);
        } else if (data.confirmPin.length === 6 && step === 1) {
            // setStep(2);
            if (canProceed) {
                setPin(data.pin);
                navigation.navigate(mainRouts.success,{
                    title: 'You’ve created your PIN',
                    desc: 'Keep your account safe with your secret PIN. Do not share this PIN with anyone.'
                })
            } else setError(true)
        } else if (step === 2 && data.confirmPin.length === 6) {
            if (confirmPin(data.confirmPin)) {
                navigation.navigate(mainRouts.success,{
                    title: 'Welcome back',
                    desc: 'Let’s get you logged in to get back to building your dollar-denominated investment portfolio.'
                });
            } else {
                setData({ pin: '', confirmPin: '' });
                setError(true)
            }
        }
    }, [data]);

    useEffect(() => {
        if (pin) {
            setStep(2);
        }
    }, [pin]);

    const renderButton = (key: any, isDelete = false) => (
        <TouchableOpacity
            key={key}
            onPress={() => (isDelete ? handleDelete() : handlePress(key))}
            style={{
                width: 72,
                height: 72,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 40,
                backgroundColor: colors.inactive,
            }}
        >
            {!isDelete ? (
                <ThemedText type="title" style={{
                    fontSize: 30,
                    color: colors.primary,
                }}>
                    {key}
                </ThemedText>
            ) : (
                <Icon source={require('../../../assets/images/delete.png')} size={23} />
            )}
        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => step === 1 && setStep(0)}
                style={{
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    backgroundColor: colors.inactive,
                    marginBottom: '5%'
                }}
            >
                <Icon source={require('../../../assets/images/arrow-b.png')}
                    size={18}
                />
            </TouchableOpacity>
            <ThemedText type='subtitle'>{text[step].title}</ThemedText>
            <ThemedText style={{
                color: colors.textGray,
                width: '95%',
                marginBottom: '5%'
            }}>{text[step].desc}</ThemedText>

            <OtpFields
                nuberOfFields={6}
                value={
                    step === 0 ? data.pin : data.confirmPin
                }
                // onChangeText={(text) => setData({ ...data, pin: text })}
                isSecured={true}
            />

            <ThemedText style={{
                color: colors.error,
                marginBottom: '5%',
                alignSelf: 'center',
                display: error ? 'flex' : 'none'
            }}>Pin mismatch</ThemedText>

            <View style={styles.pad}>
                {[1, 2, 3].map((val) => (
                    <View key={val} style={styles.row}>
                        {[1, 2, 3].map((key) => renderButton(val * key))}
                    </View>
                ))}

                <View style={styles.row}>
                    {['.', '0', '3'].map((key) => renderButton(key, key === '3'))}
                </View>
            </View>
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: '6%',
        backgroundColor: colors.white,
        gap: 16
    },
    pad: {
        width: '100%',
        marginTop: '5%',
        gap: 16,
        position: 'absolute',
        bottom: '10%',
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
    }
});

export default SetPin;