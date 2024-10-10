import React, { useState, useRef } from "react";
import { View, StyleSheet, TextInput, TextInputProps } from "react-native";
import colors from "../../assets/colors/colors";

type Props = {
    containerStyle?: object,
    theme?: 'dark' | 'light'
    onPress?: () => void,
} & TextInputProps;


const PhoneInput: React.FC<Props> = ({ containerStyle, onPress, ...rest }: Props) => {
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

            <View style={{
                flexDirection: "row",
                // justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
            }}>
                <TextInput
                    style={{
                        fontSize: 14,
                        fontFamily: 'Inter-Medium',
                        color: colors.textDark,
                        flexGrow: 1,
                        paddingLeft: 8,
                    }}
                    placeholderTextColor={colors.textGray}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...rest}
                    inputMode="numeric"
                />

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

export default PhoneInput;