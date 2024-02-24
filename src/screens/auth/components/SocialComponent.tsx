import {View, Text} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  SectionComponent,
  SpaceComponents,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColor';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Facebook, Google} from '../../../assets/svgs';

const SocialComponent = () => {
  return (
    <SectionComponent>
      <TextComponent
        text="OR"
        color={appColors.gray4}
        font={fontFamilies.medium}
        // title
        size={16}
        styles={{textAlign: 'center'}}
      />
      <SpaceComponents height={16} />
      <ButtonComponent
        text="Login with Google"
        type="primary"
        textColor={appColors.text}
        color={appColors.white}
        iconFlex="left"
        textFont={fontFamilies.regular}
        icons={<Google />}
      />
      <ButtonComponent
        text="Login with Google"
        type="primary"
        textColor={appColors.text}
        color={appColors.white}
        iconFlex="left"
        textFont={fontFamilies.regular}
        icons={<Facebook />}
      />
      {/* <ButtonComponent
        text="Login with Facebook"
        type="primary"
        textColor={appColors.text}
        color={appColors.white}
        textFont={fontFamilies.regular}
        iconFlex="left"
        icons={<Facebook />}
      /> */}
    </SectionComponent>
  );
};

export default SocialComponent;
