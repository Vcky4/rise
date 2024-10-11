import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Image,
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

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

const FundWallet: React.FC<IProps> = ({navigation}) => {
  const [step, setStep] = React.useState(0);
  const bottomRef= useRef();
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

      <TouchableOpacity
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
            source={require('../../../assets/images/nairabank.png')}
          />
          <View style={{marginStart: 12}}>
            <ThemedText
              type="default"
              style={{
                fontSize: 15,
                // fontFamily:'DMSans-Bold'
              }}>
              Naira Bank Transfer
            </ThemedText>
            <ThemedText
              type="default"
              style={{
                fontSize: 13,
                color: colors.textGray,
                // fontFamily:'DMSans-Bold'
              }}>
              Timeline - 15 mins
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
            Rate - $1 = ₦490
          </ThemedText>
          <ThemedText
            type="default"
            style={{
              fontSize: 13,
              color: colors.textGray,
              textAlign: 'right',
              // fontFamily:'DMSans-Bold'
            }}>
            Fee - 1.5%
          </ThemedText>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: colors.borderCOlor,
          paddingBottom: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            size={30}
            source={require('../../../assets/images/nairaDebit.png')}
          />
          <View style={{marginStart: 12}}>
            <ThemedText
              type="default"
              style={{
                fontSize: 15,
                // fontFamily:'DMSans-Bold'
              }}>
              Naira Debit card
            </ThemedText>
            <ThemedText
              type="default"
              style={{
                fontSize: 13,
                color: colors.textGray,
                // fontFamily:'DMSans-Bold'
              }}>
              Timeline - 15 mins
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
            Rate - $1 = ₦490
          </ThemedText>
          <ThemedText
            type="default"
            style={{
              fontSize: 13,
              color: colors.textGray,
              textAlign: 'right',
              // fontFamily:'DMSans-Bold'
            }}>
            Fee - 1.5%
          </ThemedText>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: colors.borderCOlor,
          paddingBottom: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            size={30}
            source={require('../../../assets/images/nairaDirect.png')}
          />
          <View style={{marginStart: 12}}>
            <ThemedText
              type="default"
              style={{
                fontSize: 15,
                // fontFamily:'DMSans-Bold'
              }}>
              Naira Direct Debit
            </ThemedText>
            <ThemedText
              type="default"
              style={{
                fontSize: 13,
                color: colors.textGray,
                // fontFamily:'DMSans-Bold'
              }}>
              Timeline - 15 mins
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
            Rate - $1 = ₦490
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
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: colors.borderCOlor,
          paddingBottom: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            size={30}
            source={require('../../../assets/images/usdDebit.png')}
          />
          <View style={{marginStart: 12}}>
            <ThemedText
              type="default"
              style={{
                fontSize: 15,
                // fontFamily:'DMSans-Bold'
              }}>
              USD Debit/Credit Card
            </ThemedText>
            <ThemedText
              type="default"
              style={{
                fontSize: 13,
                color: colors.textGray,
                // fontFamily:'DMSans-Bold'
              }}>
              Timeline - 1 business day
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
            }}></ThemedText>
          <ThemedText
            type="default"
            style={{
              fontSize: 13,
              color: colors.textGray,
              textAlign: 'right',
              // fontFamily:'DMSans-Bold'
            }}>
            Fee - 0.5%
          </ThemedText>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: colors.borderCOlor,
          paddingBottom: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            size={30}
            source={require('../../../assets/images/crypto.png')}
          />
          <View style={{marginStart: 12}}>
            <ThemedText
              type="default"
              style={{
                fontSize: 15,
                // fontFamily:'DMSans-Bold'
              }}>
              Crypto
            </ThemedText>
            <ThemedText
              type="default"
              style={{
                fontSize: 13,
                color: colors.textGray,
                // fontFamily:'DMSans-Bold'
              }}>
              Timeline - 15 mins
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
            }}></ThemedText>
          <ThemedText
            type="default"
            style={{
              fontSize: 13,
              color: colors.textGray,
              textAlign: 'right',
              // fontFamily:'DMSans-Bold'
            }}>
            Fee - 0.5%
          </ThemedText>
        </View>
      </TouchableOpacity>

      <RBSheet
        ref={bottomRef}
        useNativeDriver={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
   
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
