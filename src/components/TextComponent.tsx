import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {appColors} from '../constants/appColor';
import {fontFamilies} from '../constants/fontfamilies';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  text: string;
  color?: string;
  size?: number;
  flex?: number;
  font?: string;
  styles?: StyleProp<TextStyle>;
  title?: boolean;
}

const TextComponent = (props: Props) => {
  const {text, color, flex, size, font, styles, title} = props;

  return (
    <Text
      style={[
        globalStyles.text,
        {
          color: color ?? appColors.text,
          flex: flex ?? 0,
          fontSize: size ?? title ? 24 : 14,
          fontFamily: font ?? title ? fontFamilies.bold : fontFamilies.regular,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;