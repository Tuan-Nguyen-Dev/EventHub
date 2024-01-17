import React, {ReactNode} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {TextComponent} from '.';
import {globalStyles} from '../styles/globalStyles';
import {appColors} from '../constants/appColor';
import {fontFamilies} from '../constants/fontfamilies';

interface Props {
  icons?: ReactNode;
  text: string;
  type?: 'primary' | 'text' | 'link';
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  iconFlex?: 'right' | 'left';
}

const ButtonComponent = (props: Props) => {
  const {
    icons,
    text,
    type,
    color,
    styles,
    textColor,
    textStyle,
    onPress,
    iconFlex,
  } = props;
  return type === 'primary' ? (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.button,
        {
          backgroundColor: color ?? appColors.primary,
        },
        styles,
      ]}>
      {icons && icons}
      <TextComponent
        text={text}
        color={textColor ?? appColors.white}
        styles={[
          textStyle,
          {
            marginLeft: icons ? 12 : 0,
          },
          styles,
        ]}
        flex={icons && iconFlex === 'right' ? 1 : 0}
      />
      {icons && iconFlex === 'right' && icons}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity>
      <TextComponent
        text="Login"
        color={type === 'link' ? appColors.link : appColors.text}
      />
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({});
