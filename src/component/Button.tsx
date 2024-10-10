import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import colors from "../../assets/colors/colors";
import { ThemedText } from './ThemedText';

type Props = {
    title: string,
    onPress: () => void,
    buttonStyle?: object,
    enabled?: boolean,
    textColor?: string,
    loading?: boolean,
    buttonColor?: string,
    fontSize?: number
};

const Button: React.FC<Props> = ({
    fontSize = 16,
    title,
    onPress,
    buttonStyle,
    enabled,
    textColor,
    loading,
    buttonColor = colors.primary
}) => {
    return (
        <View pointerEvents={(enabled && !loading) ? 'auto' : 'none'}
            style={[{ height: 50 }, buttonStyle, {
                opacity: (enabled && !loading) ? 1 : 0.5,
                backgroundColor: buttonColor,
                borderRadius: 8,
            }]}>
            <TouchableOpacity onPress={() => enabled && !loading ? onPress() : {}}
                style={{
                    flex: 1,
                }} >

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <ThemedText type='title' style={{
                        fontSize: fontSize,
                        textAlign: 'center',
                        color: textColor || colors.white,
                        display: loading ? 'none' : 'flex'
                    }}>{title}</ThemedText>

                    <ActivityIndicator size={'small'}
                        color={textColor || colors.white}
                        hidesWhenStopped={true}
                        animating={loading ? loading : false}
                        style={{
                            // position: 'absolute',
                            // paddingEnd: 10,
                            alignSelf: 'center',
                            // flex: 1,
                            display: loading ? 'flex' : 'none'
                        }}
                    />

                </View>

            </TouchableOpacity>
        </View>

    );
}

export default Button;