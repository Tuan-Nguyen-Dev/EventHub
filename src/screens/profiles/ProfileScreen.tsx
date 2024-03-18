import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ButtonComponent, ContainerComponent} from '../../components';
import {
  AuthState,
  authSelector,
  removeAuth,
} from '../../redux/reducers/authReducer';
import {HandleNotification} from '../../utils/handleNotification';
import {LoginManager} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import LoadingComponent from '../../components/LoadingComponent';
import {LoadingModel} from '../../modals';

const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const auth: AuthState = useSelector(authSelector);

  const handleLogout = async () => {
    setIsLoading(true);

    const fcmToken = await AsyncStorage.getItem('fcmtoken');
    if (fcmToken) {
      if (auth.fcmTokens && fcmToken.length > 0) {
        const items = [...auth.fcmTokens];
        const index = items.findIndex(element => element === fcmToken);
        if (index !== -1) {
          items.splice(index, 1);
        }
        await HandleNotification.Update(auth.id, items);
      }
    }

    await GoogleSignin.signOut();
    LoginManager.logOut();

    // clear local storage
    await AsyncStorage.removeItem('auth');

    dispatch(removeAuth({}));
    setIsLoading(false);
  };

  return (
    <ContainerComponent back>
      <Text>ProfileScreen</Text>

      <ButtonComponent text="Logout" type="primary" onPress={handleLogout} />
      <LoadingModel visible={isLoading} />
    </ContainerComponent>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
