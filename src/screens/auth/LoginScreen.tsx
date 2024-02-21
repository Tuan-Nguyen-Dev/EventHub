import React, {useState} from 'react';
import {Image, Text} from 'react-native';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponents,
  TextComponent,
} from '../../components';
import {Lock, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColor';
import {Switch} from 'react-native';
import SocialComponent from './components/SocialComponent';
import {fontFamilies} from '../../constants/fontFamilies';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);

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
        <ButtonComponent text="SIGN IN" type="primary" />
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
