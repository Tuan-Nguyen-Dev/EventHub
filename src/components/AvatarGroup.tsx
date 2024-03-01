import React from 'react';
import {Image} from 'react-native';
import {appColors} from '../constants/appColor';
import {fontFamilies} from '../constants/fontFamilies';
import RowComponent from './RowComponent';
import SpaceComponents from './SpaceComponents';
import TextComponent from './TextComponent';

interface Props {
  size?: number;
}

const AvatarGroup = (props: Props) => {
  const {size} = props;
  const photoUrl =
    'https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-deo-kinh.jpg';
  return (
    <RowComponent justify="flex-start" style={{marginVertical: 12}}>
      {Array.from({length: 3}).map((item, index) => (
        <Image
          key={`img${index}`}
          source={{uri: photoUrl}}
          style={{
            width: size ?? 24,
            height: size ?? 24,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: appColors.white,
            marginLeft: index > 0 ? -8 : 0,
          }}
        />
      ))}
      <SpaceComponents width={12} />
      <TextComponent
        text="+20 going"
        size={12 + (size ? (size - 24) / 2 : 0)}
        color={appColors.primary}
        font={fontFamilies.semiBold}
      />
    </RowComponent>
  );
};

export default AvatarGroup;
