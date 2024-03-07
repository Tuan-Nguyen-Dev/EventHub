import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {ReactNode, useRef, useState} from 'react';
import ButtonComponent from './ButtonComponent';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import TextComponent from './TextComponent';
import {Camera, Icon, Image, Link} from 'iconsax-react-native';
import {appColors} from '../constants/appColor';
import RowComponent from './RowComponent';
import SpaceComponents from './SpaceComponents';
import {fontFamilies} from '../constants/fontFamilies';
import ImageCropPicker, {
  ImageOrVideo,
  Options,
} from 'react-native-image-crop-picker';
import {globalStyles} from '../styles/globalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InputComponent from './InputComponent';

interface Props {
  onSelected: (val: {
    type: 'url' | 'file';
    value: string | ImageOrVideo;
  }) => void;
}

const ButtonImagePicker = (props: Props) => {
  const {onSelected} = props;

  const [imageUrl, setImagUrl] = useState('');
  const [isVisibleModalAddUrl, setIsVisibleModalAddUrl] = useState(false);

  const options: Options = {
    cropping: true,
    mediaType: 'photo',
  };

  const modalizeRef = useRef<Modalize>();

  const choiceImages = [
    {
      key: 'camera',
      title: 'Take a picture',
      icon: <Camera size={22} color={appColors.text} />,
    },
    {
      key: 'libary',
      title: 'From picture',
      icon: <Image size={22} color={appColors.text} />,
    },
    {
      key: 'url',
      title: 'From url',
      icon: <Link size={22} color={appColors.text} />,
    },
  ];

  const renderItem = (item: {icon: ReactNode; key: string; title: string}) => (
    <RowComponent
      key={item.key}
      style={{marginBottom: 20}}
      onPress={() => handleChoiceImage(item.key)}>
      {item.icon}
      <SpaceComponents width={8} />
      <TextComponent text={item.title} flex={1} font={fontFamilies.medium} />
    </RowComponent>
  );

  const handleChoiceImage = (key: string) => {
    switch (key) {
      case 'libary':
        ImageCropPicker.openPicker(options).then(res => {
          onSelected({type: 'file', value: res});
        });
        break;

      case 'camera':
        ImageCropPicker.openCamera(options).then(res => {
          onSelected({type: 'file', value: res});
        });
        break;

      default:
        setIsVisibleModalAddUrl(true);
        break;
    }
    modalizeRef.current?.close();
  };

  return (
    <View style={{marginBottom: 20}}>
      <ButtonComponent
        text="Upload Image"
        onPress={() => modalizeRef.current?.open()}
        type="link"
      />
      <Portal>
        <Modalize
          adjustToContentHeight
          ref={modalizeRef}
          handlePosition="inside">
          <View style={{marginVertical: 30, paddingHorizontal: 20}}>
            {choiceImages.map(item => renderItem(item))}
          </View>
        </Modalize>
      </Portal>
      <Modal
        visible={isVisibleModalAddUrl}
        style={{flex: 1}}
        transparent
        animationType="slide">
        <View
          style={[
            globalStyles.container,
            {
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <View
            style={{
              backgroundColor: appColors.white,
              margin: 20,
              borderRadius: 12,
              width: '90%',
              padding: 20,
            }}>
            <RowComponent justify="flex-end">
              <TouchableOpacity
                onPress={() => {
                  setImagUrl('');
                  setIsVisibleModalAddUrl(false);
                }}>
                <AntDesign name="close" size={24} color={appColors.text} />
              </TouchableOpacity>
            </RowComponent>

            <TextComponent text="Image URL" title size={18} />
            <SpaceComponents height={8} />
            <InputComponent
              placeholder="URL"
              value={imageUrl}
              allowClear
              onChange={val => setImagUrl(val)}
            />
            <RowComponent justify="flex-end">
              <ButtonComponent
                text="Agree"
                type="link"
                onPress={() => {
                  setIsVisibleModalAddUrl(false);
                  onSelected({type: 'url', value: imageUrl});
                  setImagUrl('');
                }}
              />
            </RowComponent>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ButtonImagePicker;

const styles = StyleSheet.create({});
