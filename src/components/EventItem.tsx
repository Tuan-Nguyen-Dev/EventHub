import {Location} from 'iconsax-react-native';
import React from 'react';
import {ImageBackground, View} from 'react-native';
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
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import {DateTime} from '../utils/DateTime';
interface Props {
  item: EventModel;
  type: 'card' | 'list';
}

const EventItem = (props: Props) => {
  const {item, type} = props;
  const navigation: any = useNavigation();
  return (
    <CartComponent
      isShawdown
      style={{width: appInfo.sizes.WIDTH * 0.7}}
      onPress={() => {
        navigation.navigate('EventDetail', {item});
      }}>
      {type === 'card' ? (
        <>
          <ImageBackground
            imageStyle={{resizeMode: 'cover', borderRadius: 12}}
            style={{flex: 1, padding: 10, marginBottom: 12, height: 130}}
            source={require('../assets/images/event-img.png')}>
            <RowComponent justify="space-between">
              <CartComponent
                color="#FFFFFFB3"
                style={[globalStyles.noSpaceCard]}>
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
              <CartComponent
                color="#FFFFFFB3"
                style={[globalStyles.noSpaceCard]}>
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
              text={item.locationAddress}
              color={appColors.gray}
              size={12}
            />
          </RowComponent>
        </>
      ) : (
        <>
          <RowComponent>
            <Image
              source={{uri: item.photoUrl}}
              style={{
                width: 72,
                height: 79,
                borderRadius: 12,
                resizeMode: 'cover',
              }}
            />
            <SpaceComponents width={12} />
            <View style={{flex: 1, alignItems: 'stretch'}}>
              <TextComponent
                color={appColors.primary}
                text={`${DateTime.GetDayString(item.date)} • ${DateTime.GetTime(
                  new Date(item.starAt),
                )}`}
              />
              <TextComponent
                text={item.title}
                title
                size={18}
                numberOfLines={3}
              />
              <RowComponent>
                <Location size={18} color={appColors.gray3} variant="Bold" />
                <TextComponent
                  flex={1}
                  numberOfLines={1}
                  text={item.locationAddress}
                  color={appColors.gray}
                  size={12}
                />
              </RowComponent>
            </View>
          </RowComponent>
        </>
      )}
    </CartComponent>
  );
};

export default EventItem;
