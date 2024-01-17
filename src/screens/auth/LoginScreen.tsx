import {View, Text, Button} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ButtonComponent} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import App from '../../../App';
import {appColors} from '../../constants/appColor';

const LoginScreen = () => {
  return (
    <View style={[globalStyles.container]}>
      <Text>LoginScreen</Text>
      {/* <Button
        title="Đăng nhập"
        onPress={async () => await AsyncStorage.setItem('assetToken', 'adadas')}
      /> */}

      <ButtonComponent
        text="Đăng nhập"
        type="primary"
        onPress={() => console.log('Login')}
        icons={
          <View>
            <Text>Nuadasdasdt</Text>
          </View>
        }
      />
    </View>
  );
};

export default LoginScreen;
