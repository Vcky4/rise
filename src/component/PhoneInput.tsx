import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TextInput, TextInputProps, Platform, TouchableOpacity, Image, BackHandler } from "react-native";
import colors from "../../assets/colors/colors";
import { ThemedText } from "./ThemedText";
import { CountryPicker } from "react-native-country-codes-picker";

type Props = {
    containerStyle?: object,
    onPress?: () => void,
    onSelection?: (item: string) => void,
} & TextInputProps;


const PhoneInput: React.FC<Props> = ({ containerStyle, onPress, onSelection, ...rest }: Props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [openCountry, setCountryOpen] = useState(false);
    const [country, setCountry] = useState({ "flag": "🇭🇹", "dial_code": "+509" });

    BackHandler.addEventListener('hardwareBackPress', () => {
        if (openCountry) {
            setCountryOpen(false);
            return true;
        }
        return false;
    });

    useEffect(() => {
        onSelection && onSelection(country.dial_code);
    }, [country]);
    return (
        <>
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
                }}>Phone Number</ThemedText>
                <View style={{
                    flexDirection: "row",
                    // justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                }}>
                    <TouchableOpacity
                        style={{
                            borderEndColor: colors.borderInactive,
                            borderEndWidth: 1,
                            paddingEnd: 5,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5
                        }}
                        onPress={() => { setCountryOpen(!openCountry) }}
                    >
                        <ThemedText type='subtitle' style={{
                            fontSize: 16,
                            color: colors.textDark,
                        }}>{country.flag}</ThemedText>
                        <ThemedText type='subtitle' style={{
                            fontSize: 16,
                            color: colors.textDark,
                        }}>{country.dial_code}</ThemedText>
                        <Image
                            source={require('../../assets/images/arrow-d.png')}
                            style={{
                                width: 12,
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <TextInput
                        style={{
                            fontSize: 16,
                            fontFamily: 'DMSans-SemiBold',
                            color: colors.textDark,
                            flexGrow: 1,
                            paddingLeft: 8,
                        }}
                        placeholderTextColor={colors.textDark}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        {...rest}
                        inputMode="numeric"
                    />

                </View>
            </View>
            <CountryPicker
                lang="en"
                show={openCountry}
                // when picker button press you will get the country object with dial code
                pickerButtonOnPress={(item) => {
                    setCountry(item);
                    setCountryOpen(false);
                }}
                searchMessage={'Search country'}
                onBackdropPress={() => { setCountryOpen(false); }}
                style={{
                    textInput: {
                        height: 50,
                        borderRadius: 8,
                        backgroundColor: colors.white,
                        paddingHorizontal: 10,
                        fontFamily: 'DMSans-SemiBold',
                        color: colors.textDark,
                        // elevation: 1,
                        fontSize: 16,
                    },
                    // Dial code styles [Text]
                    dialCode: {
                        color: colors.textDark,
                        fontSize: 14,
                        fontFamily: 'DMSans-Medium',
                    },
                    // Country name styles [Text]
                    countryName: {
                        color: colors.textDark,
                        fontSize: 14,
                        fontFamily: 'DMSans-Medium',
                    },
                    backdrop: {
                        backgroundColor: 'rgba(0,0,0,0.1)',
                    },
                    countryButtonStyles: {
                        backgroundColor: colors.white,
                        elevation: 1,
                        borderRadius: 8,
                    },
                    modal: {
                        height: 500,
                        backgroundColor: colors.white,
                    },
                }}
            />
        </>
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