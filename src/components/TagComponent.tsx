import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';
import TextComponent from './TextComponent';
import {appColors} from '../constants/appColor';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  label: string;
  onPress?: () => void;
  icon?: ReactNode;
  bgColor?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const TagComponent = (props: Props) => {
  const {label, icon, textColor, bgColor, onPress, style, textStyle} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.row,
        globalStyles.tag,
        {
          backgroundColor: bgColor ?? appColors.white,
        },
        style,
      ]}>
      {icon && icon}
      <TextComponent
        font={fontFamilies.medium}
        text={label}
        styles={[{marginLeft: icon ? 8 : 0}, textStyle]}
        color={
          textColor ? textColor : bgColor ? appColors.white : appColors.gray
        }
      />
    </TouchableOpacity>
  );
};

export default TagComponent;
