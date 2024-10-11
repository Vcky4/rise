import React, { useState } from "react";
import { View, TextInput, Text, TextInputProps, Platform } from "react-native";

import colors from "../../assets/colors/colors";
import { ThemedText } from "./ThemedText";

type Props = {
    // leftComponet?: React.ReactNode,
    containerStyle?: object,
    label?: string,
    isAmount?: boolean,
} & TextInputProps;


export default function InputField({ label, isAmount, containerStyle, ...rest }: Props) {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View style={[{
            borderColor: isFocused ? colors.primary : colors.borderInactive,
            borderRadius: 5,
            borderWidth: 1,
            paddingHorizontal: 10,
            height: 50,
            alignItems: 'center',
            flexDirection: 'row',
        }, containerStyle]}>
            <ThemedText style={{
                position: 'absolute',
                fontSize: 14,
                display: !!label && (rest.value?.length ?? 0 > 0) ? 'flex' : 'none',
                color: colors.primary,
                left: 10,
                backgroundColor: colors.white,
                paddingHorizontal: 5,
                transform: [{
                    translateY: Platform.OS === 'ios' ? -40 : -25,
                }]
            }}>{label}</ThemedText>
            <ThemedText style={{
                fontSize: 16,
                display: isAmount ? 'flex' : 'none',
                color: colors.primary,
                marginEnd: 6,
                paddingHorizontal: 5,
            }}>₦</ThemedText>
            <TextInput
                style={{
                    fontSize: 16,
                    fontFamily: 'DMSans-SemiBold',
                    color: colors.textDark,
                    flex: 1,
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