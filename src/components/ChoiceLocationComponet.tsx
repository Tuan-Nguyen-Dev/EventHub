import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {CartComponent, RowComponent, SpaceComponents, TextComponent} from '.';
import {globalStyles} from '../styles/globalStyles';
import {ArrowRight2, Location} from 'iconsax-react-native';
import {appColors} from '../constants/appColor';
import ModalLocation from '../modals/ModalLocation';

const ChoiceLocationComponet = () => {
  const [isVibleModalLocation, setIsVisibleModalLocation] = useState(false);

  return (
    <>
      <RowComponent
        onPress={() => setIsVisibleModalLocation(!isVibleModalLocation)}
        style={[globalStyles.inputContainer]}>
        <Location size={22} color={appColors.primary} variant="Bold" />
        <SpaceComponents width={12} />
        <TextComponent text="Hải Lăng, Quảng Trị" flex={1} />
        <ArrowRight2 color={appColors.primary} size={22} />
      </RowComponent>

      <ModalLocation
        visible={isVibleModalLocation}
        onClose={() => setIsVisibleModalLocation(false)}
        onSelected={val => console.log(val)}
      />
    </>
  );
};

export default ChoiceLocationComponet;

const styles = StyleSheet.create({
  card: {
    backgroundColor: `${appColors.gray2}80`,
    borderRadius: 12,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
