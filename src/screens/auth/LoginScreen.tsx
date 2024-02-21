import React, {useState} from 'react';
import {Text} from 'react-native';
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
