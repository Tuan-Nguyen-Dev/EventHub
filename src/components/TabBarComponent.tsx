import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {appColors} from '../constants/appColor';
import {ArrowRight2} from 'iconsax-react-native';

interface Props {
  title: string;
  onPress: () => void;
}

const TabBarComponent = (props: Props) => {
  const {title, onPress} = props;
  return (
    <RowComponent style={{marginBottom: 20, paddingHorizontal: 16}}>
      <TextComponent title text={title} flex={1} />
      <RowComponent onPress={onPress}>
        <TextComponent text="See All" size={12} color={appColors.text2} />
        <ArrowRight2 size={14} color={appColors.text2} variant="Bold" />
      </RowComponent>
    </RowComponent>
  );
};

export default TabBarComponent;