import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, BackHandler, Image, } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "../../component/Icon";
import colors from "../../../assets/colors/colors";
import { ThemedText } from "../../component/ThemedText";
import Button from "../../component/Button";
import InputField from "../../component/InputField";



interface IProps {
    navigation: NativeStackNavigationProp<any>;
}

const tips = [
    {
        icon: require('../../../assets/images/ask.png'),
        title: 'Give us a few details',
        desc: 'Tell us what you want to achieve and we will help you get there'
    },
    {
        icon: require('../../../assets/images/calender.png'),
        title: 'Turn on auto-invest',
        desc: 'The easiest way to get your investment working for you is to fund to periodically.'
    },
    {
        icon: require('../../../assets/images/settings.png'),
        title: 'Modify as you progress',
        desc: 'You are in charge. Make changes to your plan, from adding funds, funding source, adding money to your wallet and more.'
    }
]

const CreatePlans: React.FC<IProps> = ({ navigation }) => {
    const [step, setStep] = React.useState(0);

    BackHandler.addEventListener('hardwareBackPress', () => {
        step === 0 ? navigation.goBack() : setStep(step - 1);
        return true
    })

    const titles = [
        'Create a plan',
        'Goal name',
        'Target amount',
        'Target date'
    ]

    return (
        <View style={styles.container}>
            <View style={{
                // marginBottom: '5%',
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
            }}>
                <TouchableOpacity
                    onPress={() => {
                        step === 0 ? navigation.goBack() : setStep(step - 1)
                    }}
                    style={{
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                        backgroundColor: colors.inactive,
                        position: 'absolute',
                        left: 0,
                    }}
                >
                    <Icon
                        source={
                            step === 0
                                ? require('../../../assets/images/cancel.png')
                                : require('../../../assets/images/arrow-b.png')
                        }
                        size={18}
                    />
                </TouchableOpacity>

                <ThemedText
                    type='title'
                    style={{
                        fontSize: 24,
                    }}>
                    {titles[step]}
                </ThemedText>
            </View>

            <ThemedText style={{
                color: colors.textGray,
                alignSelf: step === 0 ? 'center' : 'flex-start',
            }}>
                {step === 0 ? 'Reach your goals faster' : `Question ${step + 1} of 3`}
            </ThemedText>

            <View style={{
                width: '100%',
                height: 10,
                backgroundColor: colors.borderInactive,
                borderRadius: 5,
                display: step === 0 ? 'none' : 'flex',
                marginBottom: '10%'
            }}>
                <View style={{
                    backgroundColor: colors.primary,
                    width: `${(step) * 33.33}%`,
                    height: '100%',
                    borderRadius: 5
                }} />
            </View>

            {step === 0 &&
                <>
                    <Image
                        source={require("../../../assets/images/plan.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    {
                        tips.map((item, index) =>
                            <View key={index} style={{
                                flexDirection: 'row',
                                width: '100%',
                            }}>
                                <View style={styles.circle} >
                                    <Icon
                                        source={item.icon}
                                        size={18}
                                    />
                                </View>
                                <View style={{
                                    marginLeft: 20,
                                    width: '80%',
                                    gap: 6
                                }}>
                                    <ThemedText type='subtitle' style={{
                                        fontSize: 16,
                                    }}>{item.title}</ThemedText>
                                    <ThemedText style={{
                                        fontSize: 14,
                                        color: colors.textGray
                                    }}>{item.desc}</ThemedText>
                                </View>
                            </View>
                        )
                    }
                </>
            }

            {step === 1 &&
                <>
                    <ThemedText type='subtitle' style={{
                        fontSize: 16,
                    }}>Whate are you saving for?</ThemedText>

                    <InputField
                        // placeholder="Enter goal name"
                        
                    />
                </>
            }

            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                marginBottom: '15%'
            }}>
                <Button
                    title="Continue"
                    onPress={() => {
                        setStep(step + 1)
                    }}
                    enabled={true}
                />
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
        gap: 24
    },
    logo: {
        alignSelf: 'center',
        marginTop: '10%',
        marginBottom: '12%',
        height: 100,
    },
    circle: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: colors.inactive,
    }
});

export default CreatePlans;