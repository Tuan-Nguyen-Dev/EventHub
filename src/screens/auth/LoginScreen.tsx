import AsyncStorage from '@react-native-async-storage/async-storage';
import {Lock, Sms} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Alert, Image, Switch} from 'react-native';
import {useDispatch} from 'react-redux';
import authticationAPI from '../../apis/authApi';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponents,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColor';
import {addAuth} from '../../redux/reducers/authReducer';
import {Validate} from '../../utils/validate';
import SocialComponent from './components/SocialComponent';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const emailValidation = Validate.email(email);

    if (!email || !password || !emailValidation) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email, password]);

  const handleLogin = async () => {
    const emailValidation = Validate.email(email);

    if (emailValidation) {
      setIsLoading(true);
      try {
        const res = await authticationAPI.HandleAuthentication(
          '/login',
          {email, password},
          'post',
        );

        dispatch(addAuth(res.data));
        await AsyncStorage.setItem(
          'auth',
          isRemember ? JSON.stringify(res.data) : email,
        );
        setIsLoading(true);
      } catch (error) {
        console.log(error);
        setIsLoading(true);
      }
    } else {
      Alert.alert('Email is not valid');
    }
  };

  return (
    <ContainerComponent isScroll isImageBackground>
      <SectionComponent
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
        }}>
        <Image source={require('../../assets/images/text-logo.png')} />
      </SectionComponent>
      <SectionComponent>
        <TextComponent title text="Sign in" size={24} />
        <SpaceComponents height={20} />
        <InputComponent
          value={email}
          onChange={val => setEmail(val)}
          placeholder="Email"
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
        />

        <RowComponent justify="space-between">
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{true: appColors.primary}}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <SpaceComponents width={4} />
            <TextComponent text="Remember Me" />
          </RowComponent>
          <ButtonComponent
            text="Forget Password ?"
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
            type="text"
          />
        </RowComponent>
      </SectionComponent>
      <SpaceComponents height={15} />
      <SectionComponent>
        <ButtonComponent
          disabled={isLoading || isDisable}
          onPress={handleLogin}
          text="SIGN IN"
          type="primary"
        />
      </SectionComponent>

      <SocialComponent />

      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Don’t have an account? " />
          <ButtonComponent
            type="link"
            text="Sign up"
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
