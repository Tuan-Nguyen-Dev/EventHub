import {View, Text, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  onPress?: () => void;
}

const RowComponent = (props: Props) => {
  const {justify, style, onPress, children} = props;

  const localStyles = [globalStyles.row, {justifyContent: justify}, style];

  return onPress ? (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={localStyles}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={localStyles}>{children}</View>
  );
};

export default RowComponent;
