import {Lock, Sms, User} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
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
import {LoadingModel} from '../../modals';
import SocialComponent from './components/SocialComponent';
import {ClipPath, err} from 'react-native-svg';
import {Validate} from '../../utils/validate';
import authenticationAPI from '../../apis/authApi';

interface ErrorMessages {
  email: string;
  passwords: string;
  confirmPassword: string;
}

const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
  const [values, setValues] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const [erroMessage, setErrorMessage] = useState<any>();
  const [isDisabled, setIsDisabled] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !erroMessage ||
      (erroMessage &&
        (erroMessage.email ||
          erroMessage.password ||
          erroMessage.confirmPassword)) ||
      !values.email ||
      !values.password ||
      !values.confirmPassword
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [erroMessage]);

  const handleChangeValue = (key: string, val: string) => {
    const data: any = {...values};

    data[`${key}`] = val;
    setValues(data);
  };

  const formValidator = (key: string) => {
    const data = {...erroMessage};
    let message = '';
    switch (key) {
      case 'email':
        if (!values.email) {
          message = 'Email is required';
        } else if (!Validate.email(values.email)) {
          message = 'Email is not valid !!';
        } else {
          message = '';
        }
        break;
      case 'password':
        message = !values.password ? 'Password is required' : '';
        break;
      case 'confirmPassword':
        if (!values.confirmPassword) {
          message = 'Please enter your confirm password';
        } else if (values.confirmPassword !== values.password) {
          message = 'Password is not correct !!!';
        } else {
          message = '';
        }
        break;
    }

    data[`${key}`] = message;
    setErrorMessage(data);
  };

  const handleRegister = async () => {
    const api = '/verify-email';
    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        api,
        {email: values.email},
        'post',
      );
      navigation.navigate('VerificationScreen', {
        code: res.data.code,
        ...values,
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
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
          onEnd={() => formValidator('email')}
        />
        <InputComponent
          value={values.password}
          placeholder="Password"
          onChange={val => handleChangeValue('password', val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
          onEnd={() => formValidator('password')}
        />
        <InputComponent
          value={values.confirmPassword}
          placeholder="Confirm password"
          onChange={val => handleChangeValue('confirmPassword', val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
          onEnd={() => formValidator('confirmPassword')}
        />
      </SectionComponent>
      {erroMessage &&
        (erroMessage.email ||
          erroMessage.password ||
          erroMessage.confirmPassword) && (
          <SectionComponent>
            {Object.keys(erroMessage).map(
              (error, index) =>
                erroMessage[`${error}`] && (
                  <TextComponent
                    key={`error${index}`}
                    text={erroMessage[`${error}`]}
                    color={'red'}
                  />
                ),
            )}
          </SectionComponent>
        )}
      <SpaceComponents height={15} />
      <SectionComponent>
        <ButtonComponent
          disabled={isDisabled}
          onPress={handleRegister}
          text="SIGN UP"
          type="primary"
        />
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
      <LoadingModel visible={isLoading} />
    </ContainerComponent>
  );
};

export default SignUpScreen;
