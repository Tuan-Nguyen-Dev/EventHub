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

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

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
        />
      </SectionComponent>

      <SectionComponent>
        <ButtonComponent
          text="Send"
          type="primary"
          iconFlex="right"
          icons={<ArrowRight size={20} color={appColors.white} />}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default ForgotPasswordScreen;
