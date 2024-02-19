import {View, Text, Button} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ButtonComponent, InputComponent} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import App from '../../../App';
import {appColors} from '../../constants/appColor';
import {Lock, Sms} from 'iconsax-react-native';
import ContainerComponent from '../../components/ContainerComponent';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <ContainerComponent isImageBackground>
      <Text>Helll</Text>
      {/* <InputComponent
        value={email}
        onChange={val => setEmail(val)}
        placeholder="Email"
        // isPassword
        allowClear
        affix={<Sms size={22} color={appColors.gray} />}
      />
      <InputComponent
        value={password}
        onChange={val => setPassword(val)}
        placeholder="Password"
        isPassword
        allowClear
        affix={<Lock size={22} color={appColors.gray} />}
      /> */}
    </ContainerComponent>
  );
};

export default LoginScreen;
