import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from '../../component/Icon';
import colors from '../../../assets/colors/colors';
import { ThemedText } from '../../component/ThemedText';
import mainRouts from '../../navigation/routs/mainRouts';

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

const SelectBank: React.FC<IProps> = ({ navigation }) => {

  const data = [
    {
      AccountNumber: '0123456789  •  ',
      bank: 'GTBank PLC',
      name: 'Bosun Olanrewaju',
    },
    {
      AccountNumber: '0123456789  •  ',
      bank: 'Fedelity Bank',
      name: 'Bosun Olanrewaju',
    },
  ];
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
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
          }}>
          <Icon
            source={require('../../../assets/images/arrow-b.png')}
            size={18}
          />
        </TouchableOpacity>

        <ThemedText
          type="title"
          style={{
            fontSize: 24,
            // fontFamily:'DMSans-Bold'
          }}>
          Select bank
        </ThemedText>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.replace(mainRouts.success, {
                title: 'Plan funded',
                desc: 'Your plan has been successfully funded',
            });
             }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderBottomColor: colors.borderCOlor
            }}>
            <View>
              <ThemedText
                type="subtitle"
                style={{
                  fontSize: 15,
                  // fontFamily:'DMSans-Bold'
                }}>
                0123456789 •
                <ThemedText
                  type="subtitle"
                  style={{
                    fontSize: 15,
                    // fontFamily:'DMSans-Bold'
                    color: colors.textGray
                  }}>  GTBank PLC
                </ThemedText>
              </ThemedText>

              <ThemedText
                type="subtitle"
                style={{
                  fontSize: 15,
                  // fontFamily:'DMSans-Bold'
                  color: colors.black
                }}>Bosun Olanrewaju
              </ThemedText>

            </View>

            <Icon
              source={require('../../../assets/images/more.png')}
              size={14}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: '6%',
    alignItems: 'center',
    backgroundColor: colors.white,
    gap: 20,
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
  },
});

export default SelectBank;
