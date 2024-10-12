import React from "react";
import { View, StyleSheet, Image, Platform, TouchableOpacity, ScrollView, } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import colors from "../../../assets/colors/colors";
import Icon from "../../component/Icon";
import { ThemedText } from "../../component/ThemedText";
import Button from "../../component/Button";
import { LineChart } from "react-native-gifted-charts";
import mainRouts from "../../navigation/routs/mainRouts";
import { RouteProp } from "@react-navigation/native";
import { usePlan } from "../../hooks/usePlan";
import formatNumber from "../../utils/formatNumber";



interface IProps {
    navigation: NativeStackNavigationProp<any>;
    route: RouteProp<any, any>;
}

const summary = [
    {
        title: 'Total earnings',
        value: '$10,930.75',
    },
    {
        title: 'Current earnings',
        value: '$10,930.75',
    },
    {
        title: 'Deposit value',
        value: '$10,930.75',
    },
    {
        title: 'Balance in Naira (*₦505)',
        value: '₦31,918,837.5',
    },
    {
        title: 'Plan created on',
        value: '12th May, 2021',
    },
    {
        title: 'Maturity date',
        value: '12th May, 2022',
    }
]

const transactions = [
    {
        type: 'Credit',
        desc: 'Received from Bank Account (BOSUN TONY ADEMOSU)',
        date: '12th May, 2021',
        amount: '$10,930.75',
    },
    {
        type: 'Debit',
        desc: 'Sent to Bank Account (BOSUN TONY ADEMOSU)',
        date: '12th May, 2021',
        amount: '$10,930.75',
    },
    {
        type: 'Credit',
        desc: 'Received from Bank Account (BOSUN TONY ADEMOSU)',
        date: '12th May, 2021',
        amount: '$10,930.75',
    },
    {
        type: 'Debit',
        desc: 'Sent to Bank Account (BOSUN TONY ADEMOSU)',
        date: '12th May, 2021',
        amount: '$10,930.75',
    },
    {
        type: 'Credit',
        desc: 'Received from Bank Account (BOSUN TONY ADEMOSU)',
        date: '12th May, 2021',
        amount: '$10,930.75',
    },
    {
        type: 'Debit',
        desc: 'Sent to Bank Account (BOSUN TONY ADEMOSU)',
        date: '12th May, 2021',
        amount: '$10,930.75',
    },
    {
        type: 'Credit',
        desc: 'Received from Bank Account (BOSUN TONY ADEMOSU)',
        date: '12th May, 2021',
        amount: '$10,930.75',
    },
    {
        type: 'Debit',
        desc: 'Sent to Bank Account (BOSUN TONY ADEMOSU)',
        date: '12th May, 2021',
        amount: '$10,930.75',
    },
]


const PlansDetails: React.FC<IProps> = ({ navigation, route }) => {
    const { getPlan } = usePlan()
    const props = route.params
    const [selected, setSelected] = React.useState('1M');
    const data = [{ value: 25000, date: '2034' }, { value: 28000, date: '2035' }, { value: 75000, date: '2036' }, { value: 45000, date: '2037' }, { value: 55000, date: '2038' }, { value: 40000, date: '2039' }]
    const data1 = [{ value: 22000, date: '2034' }, { value: 26000, date: '2035' }, { value: 70000, date: '2036' }, { value: 35000, date: '2037' }, { value: 45000, date: '2038' }, { value: 30000, date: '2039' }]
    const data2 = [{ value: 26000, date: '2034' }, { value: 59000, date: '2035' }, { value: 42000, date: '2036' }, { value: 55000, date: '2037' }, { value: 25000, date: '2038' }, { value: 50000, date: '2039' }]
    const data3 = [{ value: 24000, date: '2034' }, { value: 30000, date: '2035' }, { value: 65000, date: '2036' }, { value: 35000, date: '2037' }, { value: 45000, date: '2038' }, { value: 60000, date: '2039' }]
    const plan = getPlan(props?.id)
    const chart = {
        '1M': data,
        '3M': data1,
        '6M': data2,
        'ALL': data3,
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.overlay}
                source={require('../../../assets/images/header.png')}
            />
            <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? 60 : 10 }]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={{
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                        backgroundColor: colors.inactiveTab,

                    }}
                >
                    <Icon
                        source={require('../../../assets/images/arrow-b.png')}
                        size={18}
                        color={colors.white}
                    />
                </TouchableOpacity>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2
                }}>
                    <ThemedText type='title' style={{
                        color: colors.white,
                        fontSize: 24,
                    }}>Start a business</ThemedText>
                    <ThemedText style={{ color: colors.white }}>{plan?.goal_name}</ThemedText>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={{
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                        backgroundColor: colors.inactiveTab,

                    }}
                >
                    <Icon
                        source={require('../../../assets/images/menu.png')}
                        size={18}
                        color={colors.white}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView
                style={{ flex: 1, marginTop: '9%', paddingTop: 20 }}
                contentContainerStyle={{ paddingBottom: 100 }}>
                <View style={{ paddingHorizontal: 20, height: '100%', alignItems: 'center' }}>
                    <ThemedText style={{
                        color: colors.textGray,
                    }}>Plan Balance</ThemedText>
                    <ThemedText type='title' style={{
                        alignSelf: 'center',
                    }}>${formatNumber(plan?.balance ?? 0)}
                    </ThemedText>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 5,
                    }}>
                        <ThemedText style={{
                            color: colors.textGray,
                        }}>~ ₦0.00</ThemedText>
                        <Icon source={require('../../../assets/images/qs.png')} size={14} />
                    </View>

                    <ThemedText style={{
                        marginTop: 20,
                        marginBottom: 5
                    }}>Gains</ThemedText>
                    <ThemedText style={{
                        color: colors.green,
                    }}>+$5,000.43 • +12.4% </ThemedText>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginTop: 23,
                    }}>
                        <ThemedText style={{
                            color: colors.textGray,
                        }}>0.01 achieved</ThemedText>
                        <ThemedText style={{
                            color: colors.textGray,
                        }}>Target: $20,053.90</ThemedText>
                    </View>
                    <View style={{
                        width: '100%',
                        height: 6,
                        backgroundColor: colors.borderInactive,
                        borderRadius: 5,
                        marginBottom: '10%',
                        marginTop: 16
                    }}>
                        <View style={{
                            backgroundColor: colors.primary,
                            width: `${(1) * 33.33}%`,
                            height: '100%',
                            borderRadius: 5
                        }} />
                    </View>

                    <View style={{
                        backgroundColor: colors.borderInactive,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 20,
                    }}>
                        <ThemedText style={{
                            color: colors.textGray,
                            fontSize: 13,
                        }}>Results are updated monthly</ThemedText>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(mainRouts.selectBank, {
                                id: plan?.id
                            })
                        }}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: colors.white,
                            justifyContent: 'center',
                            marginTop: 24,
                            paddingVertical: 15,
                            borderWidth: 1,
                            borderRadius: 5,
                            width: '100%',
                            alignSelf: 'center',
                            borderColor: colors.borderInactive,
                            marginVertical: 10,
                        }}>
                        <Icon
                            style={{ height: 21, width: 21 }}
                            source={require('../../../assets/images/add.png')}
                        />

                        <ThemedText
                            style={{
                                color: colors.primary,
                                textAlign: 'center',
                                fontSize: 15,
                                fontFamily: 'DMSans-Bold',
                            }}>
                            {' '}
                            Fund plan
                        </ThemedText>
                    </TouchableOpacity>

                    <View style={{
                        height: 400,
                        backgroundColor: colors.primary,
                        width: '100%',
                        marginTop: 20,
                        borderRadius: 12,
                        marginBottom: 20,
                        alignItems: 'center',
                        padding: 20,
                        overflow: 'hidden',
                    }}>
                        <ThemedText style={{
                            color: colors.white,
                        }}>Performance</ThemedText>
                        <ThemedText type='title' style={{
                            alignSelf: 'center',
                            color: colors.white,
                        }}>$10,930.75
                        </ThemedText>
                        <ThemedText style={{
                            color: colors.white,
                        }}>July 26th, 2021</ThemedText>

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
                                    color: colors.white,
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
                                    color={'#41BCC4'}
                                />
                                <ThemedText style={{
                                    alignSelf: 'center',
                                    fontSize: 12,
                                    color: colors.white,
                                }}>Returns • $20,803
                                </ThemedText>
                            </View>
                        </View>
                        <LineChart
                            areaChart
                            curved
                            //@ts-ignore
                            data={chart[selected]}
                            height={190}
                            spacing={50}
                            initialSpacing={0}
                            isAnimated
                            animateOnDataChange
                            animationDuration={1000}
                            onDataChangeAnimationDuration={300}
                            color1={'#41BCC4'}
                            hideDataPoints
                            startFillColor1={colors.primaryTransparent}
                            startOpacity={0.6}
                            endOpacity={0.3}
                            noOfSections={3}
                            yAxisColor={'#41BCC4'}
                            yAxisThickness={0}
                            rulesColor={'#41BCC4'}
                            yAxisTextStyle={{ color: '#fff' }}
                            yAxisLabelPrefix="$"
                            xAxisColor={'#41BCC4'}
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
                                        </View>
                                    );
                                },
                            }}
                        />
                        <View style={{
                            backgroundColor: '#41BCC4',
                            height: 28,
                            width: '100%',
                            borderRadius: 4,
                            flexDirection: 'row',
                        }}>
                            {['1M', '3M', '6M', 'ALL'].map((e, i) => <TouchableOpacity
                                onPress={() => setSelected(e)}
                                key={i}
                                style={{
                                    height: '100%',
                                    width: '25%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: selected === e ? colors.white : 'transparent',
                                    borderRadius: 4,
                                }}>
                                <ThemedText style={{
                                    color: selected === e ? '#41BCC4' : colors.white,
                                }}>{e}</ThemedText>
                            </TouchableOpacity>)
                            }
                        </View>
                    </View>
                    {
                        summary.map((e, i) => (
                            <View key={i} style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                paddingVertical: 16,
                                borderBottomColor: colors.borderInactive,
                                borderBottomWidth: 1,
                            }}>
                                <ThemedText type='defaultSemiBold' style={{
                                    color: colors.textGray,
                                }}>{e.title}</ThemedText>
                                <ThemedText>{e.value}</ThemedText>
                            </View>
                        ))
                    }
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 20,
                        marginBottom: 5,
                        width: '100%',
                    }}>
                        <ThemedText type='defaultSemiBold' >Recent transactions</ThemedText>
                        <ThemedText type='defaultSemiBold' style={{
                            color: colors.primary,
                        }}>View all</ThemedText>
                    </View>

                    {
                        transactions.map((e, i) => (
                            <View key={i} style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                paddingVertical: 16,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    gap: 10,
                                    width: '70%',
                                }}>
                                    <Icon source={
                                        e.type === 'Credit'
                                            ? require('../../../assets/images/credit.png')
                                            : require('../../../assets/images/debit.png')
                                    } size={36} />
                                    <View>
                                        <ThemedText type='defaultSemiBold'>{e.desc}</ThemedText>
                                        <ThemedText style={{
                                            color: colors.textGray,
                                        }}>{e.date}</ThemedText>
                                    </View>
                                </View>
                                <ThemedText>{e.amount}</ThemedText>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '16%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        marginTop: '8%',
        paddingBottom: 10,
    }
});

export default PlansDetails;