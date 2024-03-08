import {View, Text} from 'react-native';
import React, {useState} from 'react';
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
import authenticationAPI from '../../../apis/authApi';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Settings,
  LoginButton,
  LoginManager,
  Profile,
} from 'react-native-fbsdk-next';
import {LoadingModel} from '../../../modals';

GoogleSignin.configure({
  webClientId:
    '1071142857658-fdjvjcejql6hqpkm9amobhm30nnaa4ue.apps.googleusercontent.com',
});

Settings.setAppID('1386156962018154');

const SocialComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const api = `/google-signin`;

  const handleLoginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      setIsLoading(true);
      const user = userInfo.user;
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        user,
        'post',
      );
      dispatch(addAuth(res.data));
      await AsyncStorage.setItem('auth', JSON.stringify(res.data));
      setIsLoading(false);

      console.log(res.data);
    } catch (error) {
      console.log('CHeck error: ' + error);
    }
  };

  const handleLoginWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        const profile = await Profile.getCurrentProfile();
        if (profile) {
          setIsLoading(true);
          const data = {
            name: profile.name,
            givenName: profile.firstName,
            familyName: profile.lastName,
            photoUrl: profile.imageURL,
            email: profile.userID,
          };
          const res: any = await authenticationAPI.HandleAuthentication(
            api,
            data,
            'post',
          );
          dispatch(addAuth(res.data));
          await AsyncStorage.setItem('auth', JSON.stringify(res.data));
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log('Login with Facebook failed: ' + error);
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
        onPress={handleLoginWithFacebook}
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
      <LoadingModel visible={isLoading} />
    </SectionComponent>
  );
};

export default SocialComponent;
