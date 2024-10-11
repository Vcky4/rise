import * as React from "react";
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import mainRouts from "../routs/mainRouts";
import Home from "../../screens/home/Home";
import colors from "../../../assets/colors/colors";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { getFocusedRouteNameFromRoute, RouteProp } from "@react-navigation/native";
import SetPin from '../../screens/auth/SetPin';
import Success from '../../screens/home/Success';
import Icon from "../../component/Icon";
import Plans from "../../screens/plans/Plans";
import Wallet from "../../screens/wallet/Wallet";
import Feeds from "../../screens/feeds/Feeds";
import Account from "../../screens/account/Account";
import { ThemedText } from "../../component/ThemedText";
import CreatePlans from "../../screens/plans/CreatePlan";
import FundWallet from "../../screens/home/AddFund";

interface IProps {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}
const BtStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();



const MainStack: React.FC<IProps> = ({ navigation, route }) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? mainRouts.setPin;
  return (
    <View style={{
      paddingTop: Platform.OS === 'ios' && routeName !== mainRouts.home ? 50 : 0,
      flex: 1,
      backgroundColor: colors.white
    }}>
      <BtStack.Navigator>
        <Stack.Screen name={mainRouts.setPin} component={SetPin} options={{ headerShown: false }} />

        <Stack.Screen
          name={mainRouts.success}
          component={Success}
          options={{ headerShown: false }}
        />
        <BtStack.Screen name={mainRouts.home} component={Home} options={{ headerShown: false }} />
        <BtStack.Screen name={mainRouts.plans} component={Plans} options={{ headerShown: false }} />
        <BtStack.Screen name={mainRouts.wallet} component={Wallet} options={{ headerShown: false }} />
        <BtStack.Screen name={mainRouts.feeds} component={Feeds} options={{ headerShown: false }} />
        <BtStack.Screen name={mainRouts.account} component={Account} options={{ headerShown: false }} />
        <BtStack.Screen name={mainRouts.createPlan} component={CreatePlans} options={{ headerShown: false }} />
        <BtStack.Screen name={mainRouts.fundWallet} component={FundWallet} options={{ headerShown: false }} />

      </BtStack.Navigator>

      <View style={{
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingBottom: Platform.OS == 'ios' ? 30 : 10,
        display: (
          routeName === mainRouts.home
        ) ? 'flex' : 'none',
      }}>
        {[
          { name: mainRouts.home, icon: require('../../../assets/images/home.png') },
          { name: mainRouts.createPlan, icon: require('../../../assets/images/plans.png') },
          { name: mainRouts.wallet, icon: require('../../../assets/images/wallet.png') },
          { name: mainRouts.feeds, icon: require('../../../assets/images/feeds.png') },
          { name: mainRouts.account, icon: require('../../../assets/images/account.png') },
        ].map((e, i) => <TouchableOpacity onPress={() => {

          navigation.navigate(e.name)

        }}
          key={i} style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon source={e.icon}
            size={32}
            color={(e.name === mainRouts.home) ? routeName === e.name ? colors.primary : colors.textGray : undefined}
          />
          <ThemedText style={{
            color: colors.textGray,
            fontSize: 14,
            display: routeName !== e.name ? 'flex' : 'none',
          }}>{e.name}</ThemedText>
          <Icon source={require('../../../assets/images/dot.png')}
            size={15}
            color={colors.primary}
            style={{
              display: routeName === e.name ? 'flex' : 'none',
            }} />
        </TouchableOpacity>

        )}
      </View>

    </View>
  );
};


const AuthPassed = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'bt'}
        component={MainStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthPassed;