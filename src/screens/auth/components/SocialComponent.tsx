import {View, Text} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  SectionComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColor';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Google} from 'iconsax-react-native';

const SocialComponent = () => {
  return (
    <SectionComponent>
      <TextComponent
        text="OR"
        color={appColors.gray4}
        font={fontFamilies.medium}
        size={16}
        styles={{textAlign: 'center'}}
      />
      <ButtonComponent
        text="Login with Google"
        type="primary"
        textColor={appColors.text}
        color={appColors.white}
        icons={<Google size={24} color={appColors.primary} />}
        iconFlex="left"
      />
    </SectionComponent>
  );
};

export default SocialComponent;
