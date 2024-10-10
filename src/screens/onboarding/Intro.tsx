import React, { useState, useRef, useContext, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    FlatList,
    TouchableOpacity,
    ViewToken,
} from 'react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import colors from "../../../assets/colors/colors";
import authRouts from "../../navigation/routs/authRouts";
import { AuthContext } from "../../../context/AuthContext";
import { ThemedText } from '../../component/ThemedText';
import Icon from '../../component/Icon';
import Button from '../../component/Button';


interface IntroProps {
    navigation: NativeStackNavigationProp<any>;
}

// Get window dimensions
const { width, height } = Dimensions.get("window");

const Intro: React.FC<IntroProps> = ({ navigation }) => {
    const { onboard, isOnboarded } = useContext(AuthContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const pages = [
        {
            image: require('../../../assets/images/onboarding1.png'),
            heading: 'Quality assets',
            info: 'Rise invests your money into the best dollar investments around the world.',
            bg: '#FEFAF7',
            color: '#FE7122'
        },
        {
            image: require('../../../assets/images/onboarding2.png'),
            heading: 'Superior Selection',
            info: 'Our expert team and intelligent algorithms select assets that beat the markets.',
            bg: '#FDF4F9',
            color: '#B80074'
        },
        {
            image: require('../../../assets/images/onboarding3.png'),
            heading: 'Better Performance',
            info: 'You earn more returns, achieve more of your financial goals and protect your money from devaluation.',
            bg: '#F6FFFE',
            color: colors.primary
        }
    ];

    // Callback for when a new page is in view
    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index || 0);
        }
    };

    // Config for viewability checking
    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };

    // Scroll to the next page when "Next" button is clicked
    const scrollToNext = () => {
        if (currentIndex < pages.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
        }
    };

    const scrollToPrevious = () => {
        if (currentIndex > 0) {
            flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
        }
    };

    useEffect(() => {
        if (isOnboarded && flatListRef.current) {
            flatListRef.current?.scrollToIndex({ index: 2 });
        }
    }, [isOnboarded])

    return (
        <>
            <View style={[styles.container, { backgroundColor: pages[currentIndex].bg }]}>
                <FlatList
                    ref={flatListRef}
                    data={pages}
                    keyExtractor={(item) => item.heading}
                    renderItem={({ item }) => (
                        <View style={{ width: width - 40 }}>
                            <Image
                                source={item.image}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                            <ThemedText
                                type="subtitle"
                                style={{ fontSize: 20, marginBottom: 5, color: item.color, marginTop: 20 }}
                            >
                                {item.heading}
                            </ThemedText>
                            <ThemedText style={{ fontSize: 15, width: '95%' }}>
                                {item.info}
                            </ThemedText>
                        </View>
                    )}
                    pagingEnabled
                    horizontal
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    showsHorizontalScrollIndicator={false}
                    getItemLayout={(data, index) => (
                        { length: width - 40, offset: (width - 40) * index, index }
                    )}
                />

                <View style={[styles.paginationContainer, {
                    marginBottom: currentIndex <= 1 ? '35%' : '15%',
                }]}>
                    <TouchableOpacity
                        disabled={currentIndex === 0}
                        onPress={scrollToPrevious}
                        style={{
                            justifyContent: 'flex-end',
                            backgroundColor: colors.inactive,
                            paddingHorizontal: 16,
                            paddingVertical: 18,
                            gap: 10,
                            borderRadius: 5,
                            transform: [{ rotate: '180deg' }],
                            display: currentIndex > 1 ? 'none' : 'flex'
                        }}>
                        <Icon
                            source={require('../../../assets/images/arrow-f.png')}
                            size={16}
                            color={currentIndex === 0 ? colors.inactive : pages[currentIndex].color}
                        />
                    </TouchableOpacity>

                    <View style={[styles.paginationDots, {
                        bottom: currentIndex <= 1 ? height / 3.3 : height / 2.6,
                    }]}>
                        {pages.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    {
                                        backgroundColor: index === currentIndex ? pages[currentIndex].color : colors.inactive,
                                        width: 6
                                    },
                                ]}
                            />
                        ))}
                    </View>

                    <TouchableOpacity
                        style={[styles.nextButton, {
                            // width: 65,
                            justifyContent: 'flex-end',
                            backgroundColor: colors.inactive,
                            paddingHorizontal: 16,
                            paddingVertical: 18,
                            gap: 10,
                            borderRadius: 5,
                            display: currentIndex > 1 ? 'none' : 'flex'
                        }]}
                        onPress={scrollToNext}
                    >
                        <ThemedText style={{ fontSize: 16, color: pages[currentIndex].color }}>
                            {currentIndex === pages.length - 1 ? 'Finish' : 'Next'}
                        </ThemedText>
                        <Icon
                            source={require('../../../assets/images/arrow-f.png')}
                            size={16}
                            color={pages[currentIndex].color}
                        />
                    </TouchableOpacity>
                    <View style={{
                        display: currentIndex <= 1 ? 'none' : 'flex',
                        width: '100%',
                        gap: 10,
                    }}>
                        <Button
                            title="Sign Up"
                            onPress={() => {
                                onboard()
                                navigation.navigate(authRouts.signUp)
                            }}
                            buttonStyle={{
                                borderRadius: 8,
                            }}
                            enabled={true}
                        />
                        <Button
                            title="Sign In"
                            onPress={() => {
                                onboard()
                                navigation.navigate(authRouts.login)
                            }}
                            textColor={colors.primary}
                            buttonColor={colors.inactive}
                            buttonStyle={{
                                borderRadius: 8,
                            }}
                            enabled={true}
                        />
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 50,
        flex: 1,
    },
    logo: {
        height: '55%',
        alignSelf: 'center',
        marginTop: '10%',
        marginBottom: '12%',
    },
    paginationContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    paginationDots: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'center',
    },
    dot: {
        height: 6,
        width: 6,
        borderRadius: 4,
    },
    nextButton: {
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
});

export default Intro;
