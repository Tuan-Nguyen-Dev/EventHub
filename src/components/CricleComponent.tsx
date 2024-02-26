import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {appColors} from '../constants/appColor';

interface Props {
  size?: number;
  children: ReactNode;
  color?: string;
  onPress?: () => void;
  styles?: StyleProp<ViewStyle>;
}

const CricleComponent = (props: Props) => {
  const {size, children, color, onPress, styles} = props;
  return onPress ? (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          width: size ?? 40,
          height: size ?? 40,
          backgroundColor: color ?? appColors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
        },
        styles,
      ]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View
      style={[
        {
          width: size ?? 40,
          height: size ?? 40,
          backgroundColor: color ?? appColors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
        },
        styles,
      ]}>
      {children}
    </View>
  );
};

export default CricleComponent;
