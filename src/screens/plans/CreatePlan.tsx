import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, BackHandler, Image, Dimensions, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "../../component/Icon";
import colors from "../../../assets/colors/colors";
import { ThemedText } from "../../component/ThemedText";
import Button from "../../component/Button";
import InputField from "../../component/InputField";
import DatePicker from "react-native-date-picker";
import { LineChart } from "react-native-gifted-charts";
import mainRouts from "../../navigation/routs/mainRouts";

const { width } = Dimensions.get('window');

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
    const data = [{ value: 25000, date: '2034' }, { value: 28000, date: '2035' }, { value: 35000, date: '2036' }, { value: 45000, date: '2037' }, { value: 55000, date: '2038' }, { value: 70000, date: '2039' }]
    const data2 = [{ value: 25000, date: '2034' }, { value: 26000, date: '2035' }, { value: 28000, date: '2036' }, { value: 35000, date: '2037' }, { value: 45000, date: '2038' }, { value: 55000, date: '2039' }]

    const canProceed = step === 0
        ? true
        : step === 1 ? planData.plan_name.length > 0
            : step === 2 ? planData.target_amount.length > 0
                : planData.maturity_date.length > 0

    return (
        <View style={styles.container}>
            <View style={{
                // marginBottom: 10,
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
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
                        left: 20,
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
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 24,
                    width: '100%',
                    paddingVertical: 10,
                    paddingHorizontal: step <= 3 ? 20: 0,
                   flexGrow: 1
                }}>

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
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 16
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 5
                            }}>
                                <Icon source={require('../../../assets/images/dot.png')}
                                    size={18}
                                    color={colors.borderInactive}
                                />
                                <ThemedText style={{
                                    alignSelf: 'center',
                                    fontSize: 12,
                                }}>Investments • $50,400
                                </ThemedText>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 5
                            }}>
                                <Icon source={require('../../../assets/images/dot.png')}
                                    size={18}
                                    color={colors.primary}
                                />
                                <ThemedText style={{
                                    alignSelf: 'center',
                                    fontSize: 12,
                                }}>Returns • $20,803
                                </ThemedText>
                            </View>
                        </View>
                        <View style={{
                            marginTop: 24,
                            marginLeft: 20,
                        }}>
                            <LineChart
                                areaChart
                                curved
                                data={data}
                                data2={data2}
                                height={218}
                                spacing={68}
                                initialSpacing={0}
                                isAnimated
                                animateOnDataChange
                                animationDuration={1000}
                                onDataChangeAnimationDuration={300}
                                color1={colors.primary}
                                color2={colors.textGray}
                                hideDataPoints
                                startFillColor1={colors.primaryTransparent}
                                startFillColor2={colors.textGray}
                                startOpacity={0.6}
                                endOpacity={0.3}
                                noOfSections={3}
                                yAxisColor={colors.borderInactive}
                                yAxisThickness={0}
                                rulesType="solid"
                                rulesColor={colors.borderInactive}
                                yAxisTextStyle={{ color: '#94A1AD' }}
                                yAxisLabelPrefix="$"
                                xAxisColor={colors.borderInactive}
                                pointerConfig={{
                                    pointerStripUptoDataPoint: true,
                                    pointerStripColor: 'lightgray',
                                    pointerStripWidth: 2,
                                    strokeDashArray: [2, 5],
                                    pointerColor: 'lightgray',
                                    radius: 4,
                                    pointerLabelWidth: 100,
                                    pointerLabelHeight: 120,
                                    //@ts-ignore
                                    pointerLabelComponent: items => {
                                        return (
                                            <View
                                                style={{
                                                    height: 120,
                                                    width: 100,
                                                    // backgroundColor: '#282C3E',
                                                    borderRadius: 4,
                                                    justifyContent: 'center',
                                                    paddingLeft: 16,
                                                }}>
                                                <ThemedText style={{ color: colors.primary, fontSize: 12 }}>{items[0].date}</ThemedText>
                                                <ThemedText type='defaultSemiBold' style={{ color: 'white' }}>${items[0].value}</ThemedText>
                                                <ThemedText style={{ color: colors.textGray, fontSize: 12, marginTop: 12 }}>{items[1].date}</ThemedText>
                                                <ThemedText type='defaultSemiBold' style={{ color: 'white' }}>${items[1].value}</ThemedText>
                                            </View>
                                        );
                                    },
                                }}
                            />
                        </View>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 24,
                            paddingHorizontal: 20,
                        }}>
                            <ThemedText style={{
                                color: colors.textGray,
                                fontSize: 15,
                            }}>Estimated monthly investment
                            </ThemedText>

                            <ThemedText style={{
                                fontSize: 15,
                            }}>$120
                            </ThemedText>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            marginTop: 24,
                            borderTopColor: colors.borderInactive,
                            borderTopWidth: 1,
                            paddingTop: '10%',
                            gap: 12,
                            paddingHorizontal: 10,
                            marginHorizontal: 20,

                        }}>
                            <Icon source={require('../../../assets/images/info.png')}
                                size={24}
                                color={colors.primary}
                            />

                            <ThemedText style={{
                                color: colors.textGray,
                                fontSize: 15,
                                width: '78%',
                            }}>
                                Returns not guaranteed. Investing involves risk. Read our Disclosures.
                            </ThemedText>
                        </View>

                        <ThemedText style={{
                            color: colors.textGray,
                            fontSize: 12,
                            textAlign: 'center',
                            alignSelf: 'center',
                            width: '78%',
                            marginTop: '10%'
                        }}>These are your starting settings, they can always be updated.
                        </ThemedText>
                    </View>
                }

                <View style={{
                    flex: 1,
                    justifyContent: step === 0 ? 'flex-end' : undefined,
                    marginBottom: '15%',
                    gap: 10,
                    paddingHorizontal: step > 3 ? 20: 0,
                }}>
                    <Button
                        title={step <= 3 ? "Continue" : 'Agree & Continue'}
                        onPress={() => {
                            if (step <= 3) {
                                setStep(step + 1)
                            } else {
                                navigation.replace(mainRouts.success, {
                                    title: 'You just created your plan.',
                                    desc: 'Well done, Deborah',
                                    buttonTitle: 'View Plan',
                                    to: mainRouts.planDetails
                                })
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
                        buttonStyle={{
                            display: step < 4 ? 'none' : 'flex'
                        }}
                    />
                </View>
            </ScrollView>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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