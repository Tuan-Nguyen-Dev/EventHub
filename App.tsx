/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AuthNavigator from './src/navigators/AuthNavigator';
import {SplashScreen} from './src/screens';
import {StatusBar} from 'react-native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigators/MainNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppRouters from './src/navigators/AppRouters';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';
import {HandleNotification} from './src/utils/handleNotification';

const App = () => {
  useEffect(() => {
    HandleNotification.checkNotificationPermission();
  }, []);

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <Provider store={store}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Host>
            <NavigationContainer>
              <AppRouters />
            </NavigationContainer>
          </Host>
        </Provider>
      </GestureHandlerRootView>
    </>
  );
};

export default App;
