import {ArrowRight2, Location} from 'iconsax-react-native';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {RowComponent, SpaceComponents, TextComponent} from '.';
import {appColors} from '../constants/appColor';
import ModalLocation from '../modals/ModalLocation';
import {globalStyles} from '../styles/globalStyles';

const ChoiceLocationComponet = () => {
  const [isVibleModalLocation, setIsVisibleModalLocation] = useState(false);
  const [addressSelected, setAddressSelected] = useState<{
    address: string;
    position?: {
      lat: number;
      long: number;
    };
  }>();
  return (
    <>
      <RowComponent
        onPress={() => setIsVisibleModalLocation(!isVibleModalLocation)}
        style={[globalStyles.inputContainer]}>
        <Location size={22} color={appColors.primary} variant="Bold" />
        <SpaceComponents width={12} />
        <TextComponent
          numberOfLines={1}
          text={addressSelected ? addressSelected.address : 'Choice Location'}
          flex={1}
        />
        <ArrowRight2 color={appColors.primary} size={22} />
      </RowComponent>

      <ModalLocation
        visible={isVibleModalLocation}
        onClose={() => setIsVisibleModalLocation(false)}
        onSelected={val => setAddressSelected(val)}
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
