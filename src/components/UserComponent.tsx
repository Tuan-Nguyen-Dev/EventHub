import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import userAPI from '../apis/userApi';
import {ProfileModel} from '../models/ProfileModel';
import {Image} from 'react-native';
import SpaceComponents from './SpaceComponents';
import {fontFamilies} from '../constants/fontFamilies';
import {appColors} from '../constants/appColor';
import TagComponent from './TagComponent';

interface Props {
  userId: string;
  type: 'Notification' | 'Invite';
  onPress: () => void;
}

const UserComponent = (props: Props) => {
  const {onPress, type, userId} = props;

  const [profile, setProfile] = useState<ProfileModel>();

  useEffect(() => {
    getProfile();
  }, [userId]);

  const getProfile = async () => {
    const api = `/getProfile?uid=${userId}`;
    try {
      const res = await userAPI.HandleUser(api);
      res && res.data && setProfile(res.data);
      // console.log('Res get profile', res);
    } catch (error) {
      console.log('Failed to get profile', error);
    }
  };

  return (
    profile && (
      <>
        <RowComponent onPress={onPress}>
          <Image
            source={{
              uri: profile.photoUrl
                ? profile.photoUrl
                : 'https://img.icons8.com/cute-clipart/64/name.png',
            }}
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              resizeMode: 'cover',
            }}
          />
          <SpaceComponents width={16} />
          <View
            style={{
              flex: 1,
              height: 48,
              justifyContent: 'space-around',
            }}>
            <TextComponent
              text={profile.name ? profile.name : profile?.email}
              size={16}
              font={fontFamilies.medium}
            />
            <TextComponent
              text={profile.type ? profile.type : 'Personal'}
              color={appColors.gray}
            />
          </View>
        </RowComponent>
      </>
    )
  );
};

export default UserComponent;
