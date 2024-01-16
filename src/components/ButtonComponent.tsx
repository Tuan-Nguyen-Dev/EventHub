import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import {TextComponent} from '.';

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
  return (
    <TouchableOpacity>
      {icons && iconFlex === 'left' && icons}
      <TextComponent text={text} color={color} styles={textStyle} />
      {icons && iconFlex === 'right' && icons}
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({});
