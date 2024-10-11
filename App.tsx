import 'react-native-gesture-handler';
import React, { useEffect, useContext, useState } from "react";
import { View, Text, StatusBar, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux'


import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import AuthStack from "./src/navigation/stacks/AuthStack";
import MainStack from "./src/navigation/stacks/MainStack";
import Splash from "./src/screens/onboarding/Splash";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/utils/redux/redux-persist';
import { onlineManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo'

// Create a client
const queryClient = new QueryClient()

const RootNavigator: React.FC = () => {
  const { token, } = useContext(AuthContext)
  const [isLoading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 2000) });

  return (
    <NavigationContainer>
      {
        isLoading ? <Splash /> :
          token ? <MainStack /> :
            <AuthStack />}
    </NavigationContainer>
  )
}
export default function App() {
  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected)
    })
  })
  if (Platform.OS == 'ios') {
    StatusBar.setBarStyle('light-content', true);	//<<--- add this
  }
  return (
    <View style={{
      flex: 1,
      backgroundColor: "#0898A0",
      paddingTop: Platform.OS === 'ios' ? 50 : 0
    }}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthContextProvider>
              <StatusBar backgroundColor={"#0898A0"} />
              <RootNavigator />
            </AuthContextProvider>
            <Toast />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </View>
  );
}