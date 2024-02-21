import {Lock, Sms, User} from 'iconsax-react-native';
import React, {useState} from 'react';
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
import SocialComponent from './components/SocialComponent';

const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
  const [values, setValues] = useState(initValue);

  const handleChangeValue = (key: string, val: string) => {
    const data: any = {...values};

    data[`${key}`] = val;
    setValues(data);
  };

  return (
    <ContainerComponent isScroll isImageBackground back>
      <SectionComponent>
        <TextComponent title text="Sign up" size={24} />
        <SpaceComponents height={20} />
        <InputComponent
          value={values.username}
          placeholder="Full name"
          onChange={val => handleChangeValue('username', val)}
          allowClear
          affix={<User size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={values.email}
          placeholder="abc@email.com"
          onChange={val => handleChangeValue('email', val)}
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={values.password}
          placeholder="Password"
          onChange={val => handleChangeValue('password', val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={values.confirmPassword}
          placeholder="Confirm password"
          onChange={val => handleChangeValue('confirmPassword', val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />
      </SectionComponent>
      <SpaceComponents height={15} />
      <SectionComponent>
        <ButtonComponent text="SIGN UP" type="primary" />
      </SectionComponent>

      <SocialComponent />

      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Already have an account? " />
          <ButtonComponent
            type="link"
            text="Sign in"
            onPress={() => navigation.navigate('LoginScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default SignUpScreen;
