import React from 'react';
import {ActivityIndicator, Image, ImageBackground} from 'react-native';
import {appInfo} from '../constants/appInfos';
import {SpaceComponents} from '../components';

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/splash-img.png')}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      imageStyle={{flex: 1}}>
      <Image
        source={require('../assets/images/logo.png')}
        style={{
          width: appInfo.sizes.WIDTH * 0.8,
          resizeMode: 'contain',
        }}
      />
      <SpaceComponents height={20} />
      <ActivityIndicator />
    </ImageBackground>
  );
};

export default SplashScreen;
