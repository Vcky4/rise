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

const FundWallet: React.FC<IProps> = ({navigation}) => {
  const [step, setStep] = React.useState(0);
  const bottomRef = useRef();


const data = [
    {
        icon: require('../../../assets/images/nairabank.png'),
        title: ' Naira Bank Transfer',
        rate: 'Rate - $1 = ₦490',
        fee:'Fee - 1.5%',
        time:'Timeline - 15 mins'
    },
    {
        icon: require('../../../assets/images/nairaDebit.png'),
        title: ' Naira Debit card',
        rate: 'Rate - $1 = ₦490',
        fee:'Fee - 1.5%',
        time:'Timeline - 15 mins'
    },
    {
        icon: require('../../../assets/images/nairaDirect.png'),
        title: 'Naira Direct Debit',
        rate: 'Rate - $1 = ₦490',
        fee:'',
        time:'Timeline - 15 mins'
    },

    {
        icon: require('../../../assets/images/usdDebit.png'),
        title: 'USD Debit/Credit Card',
        rate: '',
        fee:'Fee - 0.5%',
        time:'Timeline - 15 mins'
    },

    {
        icon: require('../../../assets/images/crypto.png'),
        title: 'Crypto',
        rate: '',
        fee:'Fee - 0.5%',
        time:'Timeline - 15 mins'
    },
]
  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: '4%',
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
        <TouchableOpacity
          onPress={() => {
            step === 0 ? navigation.goBack() : setStep(step - 1);
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
            source={require('../../../assets/images/cancel.png')}
            size={18}
          />
        </TouchableOpacity>

        <ThemedText
          type="title"
          style={{
            fontSize: 24,
            // fontFamily:'DMSans-Bold'
          }}>
          Fund Wallet
        </ThemedText>
      </View>

<FlatList
data={data}
renderItem={({item})=>(
    <TouchableOpacity
    onPress={() => {
      bottomRef.current.open();
    }}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: colors.borderCOlor,
      paddingVertical: 15,
    }}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Icon
        size={30}
        source={item.icon}
      />
      <View style={{marginStart: 12}}>
        <ThemedText
          type="default"
          style={{
            fontSize: 15,
            // fontFamily:'DMSans-Bold'
          }}>
          {item.title}
        </ThemedText>
        <ThemedText
          type="default"
          style={{
            fontSize: 13,
            color: colors.textGray,
            // fontFamily:'DMSans-Bold'
          }}>
          {item.time}
        </ThemedText>
      </View>
    </View>
    <View>
      <ThemedText
        type="default"
        style={{
          fontSize: 13,
          color: colors.textGray,
          // fontFamily:'DMSans-Bold'
        }}>
       {item.rate}
      </ThemedText>
      <ThemedText
        type="default"
        style={{
          fontSize: 13,
          color: colors.textGray,
          textAlign: 'right',
          // fontFamily:'DMSans-Bold'
        }}>
       {item.fee}
      </ThemedText>
    </View>
  </TouchableOpacity>
)}
/>
    

    

      <RBSheet
        ref={bottomRef}
        height={400}
        customStyles={{
          wrapper: {
            backgroundColor: 'background: rgba(0, 0, 0, 0.60);',
            borderTopEndRadius: 15,
            borderTopRightRadius: 15,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'fade',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
            <ScrollView>
        <View style={{paddingHorizontal: 16}}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'start',

              paddingTop: 15,
            }}>
            <TouchableOpacity
              onPress={() => {
               bottomRef.current.close()
              }}
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                backgroundColor: colors.inactive,
              }}>
              <Icon
                source={require('../../../assets/images/cancel.png')}
                size={18}
              />
            </TouchableOpacity>

            <ThemedText
              type="title"
              style={{
                fontSize: 20,
                // fontFamily:'DMSans-Bold'
                textAlign: 'center',
                marginStart: 50,
              }}>
              About Exchange Rates
            </ThemedText>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: colors.borderCOlor,
              paddingBottom: 15,
              paddingTop: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{marginStart: 12}}>
                <ThemedText
                  type="default"
                  style={{
                    fontSize: 15,
                    // fontFamily:'DMSans-Bold'
                    color: colors.black,
                  }}>
                  USD Buy Rate
                </ThemedText>
                <ThemedText
                  type="default"
                  style={{
                    fontSize: 13,
                    color: colors.textGray,
                    // fontFamily:'DMSans-Bold'
                  }}>
                  We buy US dollars at this rate
                </ThemedText>
              </View>
            </View>
            <View>
              <ThemedText
                type="default"
                style={{
                  fontSize: 13,
                  color: colors.black,
                  // fontFamily:'DMSans-Bold'
                }}>
                ₦490
              </ThemedText>
              <ThemedText
                type="default"
                style={{
                  fontSize: 13,
                  color: colors.textGray,
                  textAlign: 'right',
                  // fontFamily:'DMSans-Bold'
                }}></ThemedText>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: colors.borderCOlor,
              paddingBottom: 15,
              paddingTop: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{marginStart: 12}}>
                <ThemedText
                  type="default"
                  style={{
                    fontSize: 15,
                    // fontFamily:'DMSans-Bold'
                    color: colors.black,
                  }}>
                  USD Sell Rate
                </ThemedText>
                <ThemedText
                  type="default"
                  style={{
                    fontSize: 13,
                    color: colors.textGray,
                    // fontFamily:'DMSans-Bold'
                  }}>
                  The current value of your investments in Naira
                </ThemedText>
              </View>
            </View>
            <View>
              <ThemedText
                type="default"
                style={{
                  fontSize: 13,
                  color: colors.black,
                  // fontFamily:'DMSans-Bold'
                }}>
                ₦490
              </ThemedText>
              <ThemedText
                type="default"
                style={{
                  fontSize: 13,
                  color: colors.textGray,
                  textAlign: 'right',
                  // fontFamily:'DMSans-Bold'
                }}></ThemedText>
            </View>
          </View>

          <ThemedText
            type="default"
            style={{
              fontSize: 13,
              color: colors.textGray,
              textAlign: 'center',
              marginTop:20
              // fontFamily:'DMSans-Bold'
            }}>
            These exhange rates are provided by independent third parties who
            handle fund conversions at the prevailing parallel rates and are not
            set, or controlled or by Rise. They are subject to change based on
            market trends.
          </ThemedText>

          <Button  title='Accept & Continue' enabled={true} onPress={()=>{
            bottomRef.current.close()
            navigation.navigate(mainRouts.chooseplan)
            
            }}buttonStyle={{marginTop:30}}  />
        </View>
            </ScrollView>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: '6%',
    backgroundColor: colors.white,
    gap: 24,
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

export default FundWallet;
