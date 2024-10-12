import React from "react";
import { View, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import colors from "../../../assets/colors/colors";
import Icon from "../../component/Icon";
import { ThemedText } from "../../component/ThemedText";


const { width } = Dimensions.get('window');


interface IProps {
    item: {
        icon: any;
        title: string;
        ammount: string;
    },
    onPress: () => void;
}


const PlanItem: React.FC<IProps> = ({ item, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ width: '50%' }}>
            <ImageBackground
              style={{
                width: '100%',
                height: width * 0.6,
                borderRadius: 15,
              }}
              source={item.icon}>
              <View style={{
                height: '100%',
                justifyContent: 'flex-end',
                paddingHorizontal: '10%',
                paddingBottom: '19%',
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
                      {item.title}
                    </ThemedText>

                    <ThemedText
                      type="subtitle"
                      style={{
                        fontSize: 15,
                        color: colors.white,
                      }}>
                      {item.ammount}
                    </ThemedText>
                  </View>

                  <Icon
                    color={colors.white}
                    source={require('../../../assets/images/arrow-f.png')}
                    size={14}
                  />
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});

export default PlanItem;