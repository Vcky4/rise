import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TextInputProps, Image, Platform } from "react-native";
import colors from "../../assets/colors/colors";
import { ThemedText } from "./ThemedText";

type Props = {
    // leftComponet?: React.ReactNode,
    containerStyle?: object,
    label: string,
} & TextInputProps;


const PasswordInput: React.FC<Props> = ({ containerStyle, label, ...rest }: Props) => {
    const [visible, setVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View style={[{
            borderColor: isFocused ? colors.primary : colors.borderInactive,
            borderRadius: 5,
            borderWidth: 1,
            paddingHorizontal: 10,
            height: 50,
            justifyContent: 'center',
        }, containerStyle]}>
            <ThemedText style={{
                position: 'absolute',
                fontSize: 14,
                display: rest.value?.length ?? 0 > 0 ? 'flex' : 'none',
                color: colors.primary,
                left: 10,
                backgroundColor: colors.white,
                paddingHorizontal: 5,
                transform: [{
                    translateY: Platform.OS === 'ios' ? -40 : -25,
                }]
            }}>{label}</ThemedText>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <TextInput
                    style={{
                        fontSize: 16,
                        fontFamily: 'DMSans-SemiBold',
                        color: colors.textDark,
                        width: "90%"
                    }}
                    placeholder={label}
                    placeholderTextColor={colors.textDark}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...rest}
                    secureTextEntry={!visible}
                />
                <TouchableOpacity onPress={() => { setVisible(!visible) }}>
                    {
                        !visible ?
                            <Image
                                source={require('../../assets/images/eye_closed.png')}
                                style={{
                                    width: 20,
                                    height: 20,
                                }}
                                resizeMode="contain"
                            />
                            :
                            <Image
                                source={require('../../assets/images/eye_opened.png')}
                                style={{
                                    width: 20,
                                    height: 20,
                                }}
                                resizeMode="contain"
                            />
                    }
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    passwordWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
        borderRadius: 8,
        height: 44,
        // borderColor: colors.inactive,
        // borderWidth: 1,
        // elevation: 1
    },
});

export default PasswordInput;