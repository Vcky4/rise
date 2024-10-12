import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Dimensions
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from '../../component/Icon';
import colors from '../../../assets/colors/colors';
import { ThemedText } from '../../component/ThemedText';
import mainRouts from '../../navigation/routs/mainRouts';
import PlanItem from './PlanItem';
import { usePlan } from '../../hooks/usePlan';




const { width } = Dimensions.get('window');

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

const ChoosePlan: React.FC<IProps> = ({ navigation }) => {
  const {plans} = usePlan()

console.log(plans)
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
          Choose from plans
        </ThemedText>
      </View>

      <ThemedText
        type="subtitle"
        style={{
          fontSize: 15,
          textAlign: 'center',
          color: colors.textGray,
          // fontFamily:'DMSans-Bold'
        }}>
        Tap on any of the plans to select
      </ThemedText>

      <FlatList
      style={{
        width: '100%'
      }}
      contentContainerStyle={{
        gap:10,
      }}
      columnWrapperStyle={{
        justifyContent: 'space-between', 
        gap: 10,
      }}
        data={plans}
        numColumns={2}
        renderItem={({ item }) => (
          <PlanItem item={item} onPress={() => {
            navigation.navigate(mainRouts.selectBank);
          }} />
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

export default ChoosePlan;
