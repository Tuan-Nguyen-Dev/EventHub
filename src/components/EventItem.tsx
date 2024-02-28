import {Location} from 'iconsax-react-native';
import React from 'react';
import {ImageBackground} from 'react-native';
import {appColors} from '../constants/appColor';
import {appInfo} from '../constants/appInfos';
import {fontFamilies} from '../constants/fontFamilies';
import {EventModel} from '../models/EventModels';
import {globalStyles} from '../styles/globalStyles';
import AvatarGroup from './AvatarGroup';
import CartComponent from './CartComponent';
import RowComponent from './RowComponent';
import SpaceComponents from './SpaceComponents';
import TextComponent from './TextComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
interface Props {
  item: EventModel;
  type: 'card' | 'list';
}

const EventItem = (props: Props) => {
  const {item, type} = props;
  return (
    <CartComponent
      isShawdown
      style={{width: appInfo.sizes.WIDTH * 0.7}}
      onPress={() => {}}>
      <ImageBackground
        imageStyle={{resizeMode: 'cover', borderRadius: 12}}
        style={{flex: 1, padding: 10, marginBottom: 12, height: 130}}
        source={require('../assets/images/event-img.png')}>
        <RowComponent justify="space-between">
          <CartComponent color="#FFFFFFB3" style={[globalStyles.noSpaceCard]}>
            <TextComponent
              text="10"
              font={fontFamilies.bold}
              size={18}
              color="#F0635A"
            />
            <TextComponent
              text="June"
              font={fontFamilies.semiBold}
              size={12}
              color="#F0635A"
            />
          </CartComponent>
          <CartComponent color="#FFFFFFB3" style={[globalStyles.noSpaceCard]}>
            <MaterialIcons
              name="bookmark"
              size={22}
              color={appColors.danger2}
            />
          </CartComponent>
        </RowComponent>
      </ImageBackground>
      <TextComponent numberOfLines={1} text={item.title} title size={18} />
      <AvatarGroup />
      <RowComponent>
        <Location size={18} color={appColors.gray3} variant="Bold" />
        <SpaceComponents width={10} />
        <TextComponent
          flex={1}
          numberOfLines={1}
          text={item.location.address}
          color={appColors.gray}
          size={12}
        />
      </RowComponent>
    </CartComponent>
  );
};

export default EventItem;
