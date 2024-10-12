import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from '../../component/Icon';
import colors from '../../../assets/colors/colors';
import {ThemedText} from '../../component/ThemedText';
import Button from '../../component/Button';
import InputField from '../../component/InputField';
import DatePicker from 'react-native-date-picker';
import {createEntityAdapter} from '@reduxjs/toolkit';
import RBSheet from 'react-native-raw-bottom-sheet';
import mainRouts from '../../navigation/routs/mainRouts';

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

const ChoosePlan: React.FC<IProps> = ({navigation}) => {
  const [step, setStep] = React.useState(0);
  const bottomRef = useRef();

  const data = [
    {
      icon: require('../../../assets/images/plancard1.png'),
      title: ' Plan a wedding',
      ammount: '$1,983.09',
    },
    {
      icon: require('../../../assets/images/plancard2.png'),
      title: 'Start a Business',
      ammount: '$1,983.09',
    },
    {
      icon: require('../../../assets/images/plancard3.png'),
      title: ' Build Wealth',
      ammount: '$1,983.09',
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
        data={data}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(mainRouts.selectBank);
            }}
            style={{width: '50%'}}>
            <ImageBackground
              style={{
                // position: 'absolute',
                width: '100%',
                height: 270,
                borderRadius: 15,
              }}
              source={item.icon}>
              <View style={{height: '80%', justifyContent: 'flex-end'}}>
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
                        textAlign: 'start',
                        color: colors.white,
                        // fontFamily:'DMSans-Bold'
                      }}>
                      {item.title}
                    </ThemedText>

                    <ThemedText
                      type="subtitle"
                      style={{
                        fontSize: 15,
                        textAlign: 'start',
                        color: colors.white,
                        // fontFamily:'DMSans-Bold'
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
