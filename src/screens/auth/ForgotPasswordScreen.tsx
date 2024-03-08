import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponents,
  TextComponent,
} from '../../components';
import {ArrowRight, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColor';
import {Validate} from '../../utils/validate';
import authenticationAPI from '../../apis/authApi';
import {LoadingModel} from '../../modals';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckEmail = () => {
    const isValidEmail = Validate.email(email);
    setIsDisable(!isValidEmail);
  };

  const handleForgotPassword = async () => {
    const api = `/forgot-password`;
    setIsLoading(true);
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post',
      );
      console.log('check', res);
      Alert.alert('Send Email', 'We send a email new password');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('Cant not create a new password', error);
    }
  };

  return (
    <ContainerComponent back isImageBackground isScroll>
      <SectionComponent>
        <TextComponent text="Resset Password" title />
        <SpaceComponents height={12} />
        <TextComponent text="Please enter your email address to request a password reset" />
        <SpaceComponents height={26} />

        <InputComponent
          value={email}
          onChange={val => setEmail(val)}
          placeholder="abc@example.com"
          affix={<Sms size={22} color={appColors.gray} />}
          onEnd={handleCheckEmail}
        />
      </SectionComponent>

      <SectionComponent>
        <ButtonComponent
          onPress={handleForgotPassword}
          disabled={isDisable}
          text="Send"
          type="primary"
          iconFlex="right"
          icons={<ArrowRight size={20} color={appColors.white} />}
        />
      </SectionComponent>
      <LoadingModel visible={isLoading} />
    </ContainerComponent>
  );
};

export default ForgotPasswordScreen;
