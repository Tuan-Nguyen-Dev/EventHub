import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {Eye, EyeSlash} from 'iconsax-react-native';
import {appColors} from '../constants/appColor';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
  value: string;
  onChange: (value: string) => void;
  affix?: ReactNode;
  placeholder?: string;
  suffix?: ReactNode;
  isPassword?: boolean;
  allowClear?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  onEnd?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  style?: StyleProp<ViewStyle>;
}

const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    affix,
    placeholder,
    suffix,
    allowClear,
    isPassword,
    keyboardType,
    onEnd,
    multiline,
    numberOfLines,
    style,
  } = props;

  const [isShowPassword, setIsShowPassword] = useState(isPassword ?? false);
  return (
    <View
      style={[
        styles.inputContainer,
        {alignItems: multiline ? 'flex-start' : 'center'},
        style,
      ]}>
      {affix ?? affix}

      <TextInput
        style={[
          styles.input,
          globalStyles.text,
          {
            paddingHorizontal: affix || suffix ? 12 : 0,
            textAlignVertical: multiline ? 'top' : 'auto',
          },
        ]}
        value={value}
        placeholder={placeholder ?? ''}
        onChangeText={val => onChange(val)}
        secureTextEntry={isShowPassword}
        placeholderTextColor={'#747688'}
        keyboardType={keyboardType ?? 'default'}
        autoCapitalize="none"
        onEndEditing={onEnd}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />

      {suffix ?? suffix}
      <TouchableOpacity
        onPress={
          isPassword
            ? () => setIsShowPassword(!isShowPassword)
            : () => onChange('')
        }>
        {isPassword ? (
          <FontAwesome
            name={isShowPassword ? 'eye-slash' : 'eye'}
            size={22}
            color={appColors.gray}
          />
        ) : (
          value &&
          value.length > 0 &&
          allowClear && (
            <AntDesign size={22} name="close" color={appColors.text} />
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray3,
    width: '100%',
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: appColors.white,
    marginBottom: 20,
    paddingVertical: 14,
  },
  input: {
    padding: 0,
    margin: 0,
    flex: 1,
    // paddingHorizontal: 14,
    color: appColors.text,
  },
});
