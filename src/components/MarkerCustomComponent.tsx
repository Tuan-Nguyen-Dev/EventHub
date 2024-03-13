import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import {globalStyles} from '../styles/globalStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {appColors} from '../constants/appColor';
import {KnifeFork, KnifeFork_Color} from '../assets/svgs';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  type: string;
}

const MarkerCustomComponent = (props: Props) => {
  const {type} = props;

  const renderIcon = (type: string) => {
    let icon;
    switch (type) {
      case 'art':
        icon = <Ionicons name="color-palette" color={'#46CDFB'} />;
        break;
      case 'food':
        icon = <KnifeFork_Color />;
        break;
      case 'sports':
        icon = (
          <FontAwesome5 name="basketball-ball" color={'#F0635A'} size={20} />
        );
        break;

      default:
        icon = <FontAwesome5 name="music" color={'#F59762'} size={20} />;
        break;
    }
    return icon;
  };

  return (
    <ImageBackground
      source={require('../assets/images/maker_bg.png')}
      style={[
        globalStyles.shadow,
        {
          width: 56,
          height: 56,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
      imageStyle={{resizeMode: 'contain'}}>
      {renderIcon(type)}
    </ImageBackground>
  );
};

export default MarkerCustomComponent;
