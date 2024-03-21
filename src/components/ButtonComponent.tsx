import React, {ReactNode} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {fontFamilies} from '../constants/fontFamilies';
import {TextComponent} from '.';
import {globalStyles} from '../styles/globalStyles';
import {appColors} from '../constants/appColor';

interface Props {
  icons?: ReactNode;
  text?: string;
  type?: 'primary' | 'text' | 'link';
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
  textFont?: string;

  onPress?: () => void;
  iconFlex?: 'right' | 'left';
  disabled?: boolean;
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
    textFont,
    disabled,
  } = props;
  return type === 'primary' ? (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        activeOpacity={0.5}
        disabled={disabled}
        onPress={onPress}
        style={[
          globalStyles.button,
          globalStyles.shadow,
          {
            backgroundColor: color
              ? color
              : disabled
              ? appColors.gray4
              : appColors.primary,
            marginBottom: 17,
            width: '80%',
          },
          styles,
        ]}>
        {icons && iconFlex === 'left' && icons}
        {text && (
          <TextComponent
            text={text}
            color={textColor ?? appColors.white}
            styles={[
              textStyle,
              {
                marginLeft: icons ? 12 : 0,
                fontSize: 16,
                textAlign: 'center',
              },
              styles,
            ]}
            flex={icons && iconFlex === 'right' ? 1 : 0}
            font={textFont ?? fontFamilies.medium}
          />
        )}

        {icons && iconFlex === 'right' && icons}
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity onPress={onPress}>
      {icons && icons}
      {text && (
        <TextComponent
          text={text}
          color={type === 'link' ? appColors.link : appColors.text}
        />
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({});
