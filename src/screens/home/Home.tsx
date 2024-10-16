import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  FlatList,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import colors from '../../../assets/colors/colors';
import { ThemedText } from '../../component/ThemedText';
import Icon from '../../component/Icon';
import LinearGradient from 'react-native-linear-gradient';
import mainRouts from '../../navigation/routs/mainRouts';
import PlanItem from './PlanItem';
import getGreeting from '../../utils/getGreeting';
import { useHome } from '../../hooks/useHome';
import IPlans from '../../network/models/IPlans';


interface IProps {
  navigation: NativeStackNavigationProp<any>;
}


const Home: React.FC<IProps> = ({ navigation }) => {
  const [isVisible, setisVible] = React.useState(false);
  const { user, balance, gain, plans } = useHome()
  return (
    <View style={styles.container}>
      <Image
        style={styles.overlay}
        source={require('../../../assets/images/overlay.png')}
      />

      <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? 60 : 10 }]}>
        <ThemedText
          style={{
            color: colors.text,
            fontSize: 17,
          }}>
          {getGreeting()}{'\n'}
          <ThemedText
            style={{
              color: colors.text,
              fontSize: 20,
            }}>
            {user?.first_name}
          </ThemedText>
        </ThemedText>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              padding: 10,
              borderRadius: 20,
              marginEnd: 20,
              width: 111,
            }}>
            <ThemedText
              style={{
                color: colors.white,
                textAlign: 'center',
                fontSize: 12,
                fontFamily: 'DMSans-semiBold',
              }}>
              {' '}
              Earn 3% bonus
            </ThemedText>
          </TouchableOpacity>
          <View>
            <Icon source={require('../../../assets/images/notification.png')} />
            <View
              style={{
                position: 'absolute',
                backgroundColor: colors.red,
                borderRadius: 20,
                padding: 1,
                right: -8,
                top: -10,
              }}>
              <ThemedText
                style={{
                  color: colors.white,
                  fontSize: 12,
                  fontFamily: 'DMSans-semiBold',
                }}>
                {' '}
                9+
              </ThemedText>
            </View>
          </View>
        </View>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ paddingHorizontal: 20, height: '100%' }}>
          <View
            style={{
              width: '100%',
              height: 175,
              borderColor: colors.white,
              borderWidth: 1,
              alignSelf: 'center',
              borderRadius: 10,
              marginTop: 10,
            }}>
            <LinearGradient
              start={{ x: 0.1, y: 0.5 }}
              end={{ x: 0.5, y: 0.4 }}
              colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0)']}
              style={{
                width: '100%',
                height: '100%',
                paddingHorizontal: 10,
                paddingVertical: 15,
                alignItems: 'center',
                borderRadius: 10,
                margin: 0.2
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ThemedText
                  style={{
                    color: colors.textGray,
                    textAlign: 'center',
                    fontSize: 15,
                    fontFamily: 'DMSans-regular',
                    paddingEnd: 10,
                  }}>
                  Total Balance
                </ThemedText>
                <TouchableOpacity onPress={() => {
                  setisVible(!isVisible)
                }}>

                  <Icon source={
                    isVisible ? require('../../../assets/images/eye.png')
                      : require('../../../assets/images/eye_opened.png')}
                  />
                </TouchableOpacity>
              </View>
              <ThemedText
                style={{
                  color: colors.textDark,
                  textAlign: 'center',
                  fontSize: 32,
                  fontFamily: 'DMSans-regular',
                  marginTop: 12,
                }}>
                {!isVisible ? `$${balance()}` : "*******"}

              </ThemedText>

              <View
                style={{
                  height: 1,
                  width: '80%',
                  backgroundColor: colors.borderCOlor,
                  marginTop: 12,
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 12,
                }}>
                <ThemedText
                  style={{
                    color: colors.textGray,
                    textAlign: 'center',
                    fontSize: 15,
                    fontFamily: 'DMSans-regular',
                  }}>
                  Total Gains
                </ThemedText>
                <Icon
                  style={{ height: 10, width: 10, paddingHorizontal: 10 }}
                  source={require('../../../assets/images/trend.png')}
                />
                <ThemedText
                  style={{
                    color: colors.green,
                    textAlign: 'center',
                    fontSize: 15,
                    fontFamily: 'DMSans-regular',
                  }}>
                  {gain()}%
                </ThemedText>

                <Icon
                  style={{ height: 10, width: 10, paddingHorizontal: 15 }}
                  source={require('../../../assets/images/more.png')}
                />
              </View>
            </LinearGradient>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(mainRouts.fundWallet)
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
              borderColor: colors.borderCOlor,
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
              Add money
            </ThemedText>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 31,
              justifyContent: 'space-between',
            }}>
            <ThemedText type='defaultSemiBold'
              style={{
                textAlign: 'center',
                fontSize: 18,
              }}>
              {plans.length > 0 ? 'Your plans' : 'Create a plan'}
            </ThemedText>

            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ThemedText type='defaultSemiBold'
                style={{
                  color: plans.length > 0 ? colors.primary : colors.lightGray,
                  textAlign: 'center',
                  fontSize: 14,
                  paddingEnd: 10,
                }}>
                View all plans
              </ThemedText>
              <Icon
                color={colors.lightGray}
                style={{ height: 10, width: 10 }}
                source={require('../../../assets/images/more.png')}
              />
            </TouchableOpacity>
          </View>

          <ThemedText
            style={{
              color: colors.textGray,
              fontSize: 15,
              marginTop: 12,
              width: '85%',
              display: plans.length > 0 ? 'none' : 'flex'
            }}>
            Start your investment journey by creating a plan
          </ThemedText>

          <FlatList
            data={[
              { id: 'create' }, // Wrap "create" in an object
              ...plans
            ]}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{
              alignItems: 'center',
              gap: 10,
              marginTop: 10
            }}
            keyExtractor={(item, index) => {
              // Generate a unique key for the "create" button and use the plan's id for plans
              return item.id === 'create' ? `create-${index}` : item.id;
            }}
            renderItem={({ item }) => (
              item.id === 'create' ? (
                <TouchableOpacity onPress={() => {
                  navigation.navigate(mainRouts.createPlan);
                }}
                  style={{
                    height: 243,
                    width: 170,
                    backgroundColor: colors.borderCOlor,
                    paddingHorizontal: 20,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    style={{ height: 42, width: 42 }}
                    source={require('../../../assets/images/addicon.png')}
                  />
                  <ThemedText
                    style={{
                      color: colors.textDark,
                      textAlign: 'center',
                      fontSize: 14,
                      fontFamily: 'DMSans-Bold',
                      marginTop: 7,
                    }}>
                    Create an investment plan
                  </ThemedText>
                </TouchableOpacity>
              ) : (
                <PlanItem item={item as IPlans} width={170} height={243} onPress={() => {
                  navigation.navigate(mainRouts.planDetails, {
                    id: item.id
                  });
                }} />
              )
            )}
          />


          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 12,
              backgroundColor: colors.white,
              shadowColor: '#rgba(53, 71, 89, 0.15)',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              elevation: 5,
              marginTop: 31,
              borderRadius: 10,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                style={{ height: 24, width: 24 }}
                source={require('../../../assets/images/ask.png')}
              />
              <ThemedText
                style={{
                  color: colors.textDark,
                  textAlign: 'center',
                  fontFamily: 'DMSans-Bold',
                  marginStart: 6,
                }}>
                Need help?
              </ThemedText>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                padding: 10,
                borderRadius: 8,
                // marginEnd: 20,
                width: 111,
              }}>
              <ThemedText
                style={{
                  color: colors.white,
                  textAlign: 'center',
                  fontSize: 12,
                  fontFamily: 'DMSans-semiBold',
                }}>
                Contact us
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderWidth: 2,
              borderColor: 'rgba(65, 188, 196, 1)',
              backgroundColor: colors.primary,
              height: 240,
              padding: 20,
              borderRadius: 15,
              shadowColor: '#rgba(64, 187, 195, 0.15)',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 1,
              shadowRadius: 4.84,

              elevation: 5,
              marginTop: 34,
            }}>
            <ThemedText
              style={{
                color: colors.white,
                textAlign: 'left',
                fontSize: 14,
                fontFamily: 'DMSans-Bold',
              }}>
              {' '}
              TODAY’S QUOTE
            </ThemedText>

            <View
              style={{
                height: 2,
                backgroundColor: colors.white,
                width: 56,
                marginTop: 20,
              }}
            />

            <ThemedText
              style={{
                color: colors.white,
                textAlign: 'left',
                fontSize: 15,
                fontFamily: 'DMSans-Regular',
                marginTop: 20,
              }}>
              {' '}
              We have no intention of rotating capital out of strong multi-year
              investments because they’ve recently done well or because ‘growth’
              has out performed ‘value’.
            </ThemedText>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                justifyContent: 'space-between'
              }}>
              <ThemedText
                style={{
                  color: colors.white,
                  textAlign: 'left',
                  fontSize: 15,
                  fontFamily: 'DMSans-Bold',
                }}>
                {' '}
                Carl Sagan
              </ThemedText>
              <TouchableOpacity
                style={{

                  height: 42,
                  width: 42,
                  borderRadius: 20,
                }}>
                <Icon
                  style={{ height: 42, width: 42 }}
                  source={require('../../../assets/images/share.png')}
                />
              </TouchableOpacity>


            </View>


          </View>

          <View style={{ alignItems: 'center' }}>

            <Image style={{ height: 30, width: 100, marginTop: 32 }} source={require('../../../assets/images/rise.png')} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 10,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '50%',
  },
});

export default Home;
