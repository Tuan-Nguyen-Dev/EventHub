import {View, Text, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {appColors} from '../constants/appColor';

interface Props {
  onPress?: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  isShawdown?: boolean;
  color?: string;
}

const CartComponent = (props: Props) => {
  const {children, onPress, style, isShawdown, color} = props;
  return (
    <TouchableOpacity
      style={[
        globalStyles.card,
        isShawdown ? globalStyles.shadow : undefined,
        {backgroundColor: color ?? appColors.white},
        style,
      ]}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default CartComponent;
