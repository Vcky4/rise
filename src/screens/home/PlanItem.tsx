import React from "react";
import { View, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, DimensionValue, Image } from "react-native";
import colors from "../../../assets/colors/colors";
import Icon from "../../component/Icon";
import { ThemedText } from "../../component/ThemedText";
import IPlans from "../../network/models/IPlans";


const { width } = Dimensions.get('window');


interface IProps {
    item: IPlans,
    onPress: () => void;
    width?: DimensionValue | undefined;
    height?: DimensionValue | undefined;
}

const images = [
    require('../../../assets/images/plancard1.png'),
    require('../../../assets/images/plancard2.png'),
    require('../../../assets/images/plancard3.png'),
];
const PlanItem: React.FC<IProps> = ({ item, onPress, width: wd, height }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: wd || '48%',
                height: height,
                borderRadius: 15,
                overflow: 'hidden',
            }}>
            <View
                style={{
                    width: wd || '100%',
                    height: height ? '100%' : width * 0.6,
                    position: 'relative',
                }}
            >

                <Image
                    source={images[item.randomId % 3]}
                    style={{
                        width: '120%',
                        height: '120%',
                        position: 'absolute',
                        left: '-11%',
                        top: '-5%',
                    }}
                    resizeMode="cover"
                />
                <View style={{
                    height: '100%',
                    justifyContent: 'flex-end',
                    paddingBottom: 10,
                }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                        }}>
                        <View>
                            <ThemedText
                                type="subtitle"
                                style={{
                                    fontSize: 15,
                                    color: colors.white,
                                }}>
                                {item.goal_name}
                            </ThemedText>

                            <ThemedText
                                type="subtitle"
                                style={{
                                    fontSize: 15,
                                    color: colors.white,
                                }}>
                                ${item.target_amount.toLocaleString()}
                            </ThemedText>
                        </View>

                        <Icon
                            color={colors.white}
                            source={require('../../../assets/images/arrow-f.png')}
                            size={14}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});

export default PlanItem;