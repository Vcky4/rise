import React, { useState } from "react";
import { View, TextInput, Text, TextInputProps, Platform } from "react-native";

import colors from "../../assets/colors/colors";

type Props = {
    // leftComponet?: React.ReactNode,
    containerStyle?: object,
    label?: string,
} & TextInputProps;


export default function InputField({ label, containerStyle, ...rest }: Props) {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View style={[{
            borderColor: colors.primary,
            borderRadius: 50,
            borderWidth: 1,
            paddingHorizontal: 10,
            height: 50,
            justifyContent: 'center',
        }, containerStyle]}>
            <Text style={{
                position: 'absolute',
                fontSize: 14,
                fontFamily: 'Inter-Medium',
                display: label ? 'flex' : 'none',
                color: colors.textGray,
                transform: [{
                    translateY: Platform.OS === 'ios' ? -40 : -38,
                }]
            }}>{label}</Text>
            <TextInput
                style={{
                    fontSize: 16,
                    fontFamily: 'Inter-Medium',
                    color: colors.textDark,
                }}
                placeholderTextColor={colors.textGray}
                cursorColor={colors.primary}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...rest}
            />

        </View>
    );
}