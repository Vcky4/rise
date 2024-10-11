import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, BackHandler, Image, } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "../../component/Icon";
import colors from "../../../assets/colors/colors";
import { ThemedText } from "../../component/ThemedText";
import Button from "../../component/Button";
import InputField from "../../component/InputField";
import DatePicker from "react-native-date-picker";



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
    const [planData, setPlanData] = React.useState({
        "plan_name": '',
        "target_amount": '',
        "maturity_date": ''
    })
    const [date, setDate] = React.useState(new Date())
    const [open, setOpen] = React.useState(false)
    BackHandler.addEventListener('hardwareBackPress', () => {
        step === 0 ? navigation.goBack() : setStep(step - 1);
        return true
    })

    const titles = [
        {
            tl: 'Create a plan',
            qs: ''
        },
        {
            tl: 'Goal name',
            qs: 'What are you saving for?'
        },
        {
            tl: 'Target amount',
            qs: 'How much do need?'
        },
        {
            tl: 'Set a target',
            qs: 'When do you want to withdraw?'
        }, {
            tl: 'Review',
        }
    ]

    const canProceed = step === 0
        ? true
        : step === 1 ? planData.plan_name.length > 0
            : step === 2 ? planData.target_amount.length > 0
                : planData.maturity_date.length > 0

    return (
        <View style={styles.container}>
            <View style={{
                marginBottom: '4%',
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
                    {titles[step].tl}
                </ThemedText>
            </View>

            {step <= 3 &&
                <>
                    <ThemedText style={{
                        color: colors.textGray,
                        alignSelf: step === 0 ? 'center' : 'flex-start',
                    }}>
                        {step === 0 ? 'Reach your goals faster' : `Question ${step} of 3`}
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
                </>
            }

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

            {step <= 3 &&
                <ThemedText type='title' style={{
                    fontSize: 16,
                    display: step === 0 ? 'none' : 'flex',
                }}>{titles[step].qs}</ThemedText>
            }

            {step === 1 &&
                <>
                    <InputField
                        value={planData.plan_name}
                        onChangeText={(text) => setPlanData({ ...planData, plan_name: text })}
                    />
                </>
            }

            {step === 2 &&
                <>
                    <InputField
                        value={planData.target_amount}
                        onChangeText={(text) => setPlanData({ ...planData, target_amount: text })}
                        isAmount
                        keyboardType="number-pad"
                    />
                </>
            }

            {step === 3 &&
                <>
                    <View style={[{
                        borderColor: colors.borderInactive,
                        borderRadius: 5,
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        height: 50,
                        justifyContent: 'center',
                    }]}>
                        <TouchableOpacity onPress={() => setOpen(true)}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                            }}>
                            <ThemedText style={{
                                fontSize: 16,
                                fontFamily: 'DMSans-SemiBold',
                                color: colors.textDark,
                            }}>{planData.maturity_date || 'Choose date'}</ThemedText>
                            <Icon
                                source={require('../../../assets/images/calender.png')}
                                size={20}
                            />

                        </TouchableOpacity>
                        <DatePicker
                            modal
                            mode="date"
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                                setPlanData({ ...planData, maturity_date: date.toISOString().split('T')[0] });
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                    </View>
                </>
            }

            {step === 4 &&
                <View>
                    <ThemedText style={{
                        color: colors.textGray,
                        alignSelf: 'center',
                        fontSize: 12,
                    }}>Kate Ventures
                    </ThemedText>
                    <ThemedText type='title' style={{
                        alignSelf: 'center',
                    }}>$10,930.75
                    </ThemedText>
                    <ThemedText style={{
                        alignSelf: 'center',
                        fontSize: 15,
                    }}>by 20 June 2021
                    </ThemedText>

                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        gap: 24,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10
                        }}>
                            <Icon source={require('../../../assets/images/dot.png')}
                                size={15}
                                color={colors.borderInactive}
                            />
                            <ThemedText style={{
                                alignSelf: 'center',
                                fontSize: 15,
                            }}>Investments • $50,400
                            </ThemedText>
                        </View>
                    </View>
                </View>
            }

            <View style={{
                flex: 1,
                justifyContent: step === 0 ? 'flex-end' : undefined,
                marginBottom: '15%',
                gap: 10
            }}>
                <Button
                    title={step <= 3 ? "Continue" : 'Agree & Continue'}
                    onPress={() => {
                        if (step <= 3) {
                            setStep(step + 1)
                        } else {

                        }
                    }}
                    enabled={canProceed}
                />
                <Button
                    title={'Start Over'}
                    onPress={() => {
                        setStep(1)
                    }}
                    buttonColor={colors.inactive}
                    textColor={colors.primary}
                    enabled={canProceed}
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