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
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const SocialComponent = () => {
  const handleLoginWithGoogle = async () => {
    GoogleSignin.configure({
      webClientId:
        '1071142857658-fdjvjcejql6hqpkm9amobhm30nnaa4ue.apps.googleusercontent.com',
    });

    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.user);
    } catch (error) {
      console.log('CHeck error: ' + error);
    }
  };
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
        onPress={handleLoginWithGoogle}
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
