import React, { useState } from "react";
import { View, TextInput, Text, TextInputProps, Platform } from "react-native";

import colors from "../../assets/colors/colors";
import { ThemedText } from "./ThemedText";

type Props = {
    // leftComponet?: React.ReactNode,
    containerStyle?: object,
    label?: string,
} & TextInputProps;


export default function InputField({ label, containerStyle, ...rest }: Props) {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View style={[{
            borderColor: isFocused? colors.primary: colors.borderInactive,
            borderRadius: 5,
            borderWidth: 1,
            paddingHorizontal: 10,
            height: 50,
            justifyContent: 'center',
        }, containerStyle]}>
            <ThemedText style={{
                position: 'absolute',
                fontSize: 14,
                display: rest.value?.length  ?? 0 > 0 ? 'flex' : 'none',
                color: colors.primary,
                left: 10,
                backgroundColor: colors.white,
                paddingHorizontal: 5,
                transform: [{
                    translateY: Platform.OS === 'ios' ? -40 : -25,
                }]
            }}>{label}</ThemedText>
            <TextInput
                style={{
                    fontSize: 16,
                    fontFamily: 'DMSans-SemiBold',
                    color: colors.textDark,
                }}
                placeholder={label}
                placeholderTextColor={colors.textDark}
                cursorColor={colors.primary}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...rest}
            />

        </View>
    );
}