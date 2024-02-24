import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {
  addAuth,
  authReducer,
  authSelector,
} from '../redux/reducers/authReducer';
import {useDispatch, useSelector} from 'react-redux';
import {SplashScreen} from '../screens';

const AppRouters = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const {getItem} = useAsyncStorage('auth');
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    checkLogin();

    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  const checkLogin = async () => {
    const res = await getItem();

    if (res) {
      try {
        const authData = JSON.parse(res);
        dispatch(addAuth(authData));
      } catch (error) {
        // console.log('Error parsing JSON:', error);
        // Xử lý lỗi khi không thể phân tích chuỗi thành JSON
      }
    }
    // const res = await getItem();

    // res && dispatch(addAuth(JSON.parse(res)));
  };

  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : auth.accesstoken ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default AppRouters;
