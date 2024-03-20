import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {ProfileModel} from '../../models/ProfileModel';
import {
  AvatarComponent,
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponents,
  TextComponent,
} from '../../components';
import ButtonImagePicker from '../../components/ButtonImagePicker';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import userAPI from '../../apis/userApi';
import {LoadingModel} from '../../modals';
const EditProfileScreen = ({navigation, route}: any) => {
  const {profile}: {profile: ProfileModel} = route.params;
  const [fileSelected, setFileSelected] = useState<any>();
  const [profileData, setProfileData] = useState<ProfileModel>(profile);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelected = (val: ImageOrVideo) => {
    setFileSelected(val);
    handleChangeValue('photoUrl', val.path);
  };
  const handleChangeValue = (key: string, value: string | Date | string[]) => {
    const items: any = {...profileData};

    items[`${key}`] = value;
    setProfileData(items);
  };

  const onUpdateProfile = async () => {
    if (fileSelected) {
      const filename = `${fileSelected.filename ?? `image-${Date.now()}`}.${
        fileSelected.path.split('.')[1]
      }`;
      const path = `images/${filename}`;

      const res = storage().ref(path).putFile(fileSelected.path);

      res.on(
        'state_changed',
        snap => {
          console.log(snap.bytesTransferred);
        },
        error => {
          console.log(error);
        },
        () => {
          storage()
            .ref(path)
            .getDownloadURL()
            .then(url => {
              profileData.photoUrl = url;

              handleUpdateProfile(profileData);
            });
        },
      );
    } else {
      handleUpdateProfile(profileData);
    }
  };

  const handleUpdateProfile = async (data: ProfileModel) => {
    const api = `/update-profile?uid=${profile.uid}`;

    const newData = {
      bio: data.bio ?? '',
      familyName: data.givenName ?? '',
      givenName: data.givenName ?? '',
      name: data.name ?? '',
      photoUrl: data.photoUrl ?? '',
    };

    setIsLoading(true);

    try {
      const res: any = await userAPI.HandleUser(api, newData, 'put');

      setIsLoading(false);

      navigation.navigate('ProfileScreen', {
        isUpdated: true,
        id: profile.uid,
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <ContainerComponent isScroll back title={profile.name}>
      <SectionComponent>
        <RowComponent>
          <AvatarComponent
            photoURL={profileData.photoUrl}
            name={profileData.name ? profileData.name : profileData.email}
            size={100}
          />
        </RowComponent>
        <SpaceComponents height={16} />
        <RowComponent>
          <ButtonImagePicker
            onSelected={
              (val: any) =>
                val.type === 'url'
                  ? handleChangeValue('photoUrl', val.value as string)
                  : handleFileSelected(val.value)
              // console.log(val)
            }
          />
        </RowComponent>

        <InputComponent
          placeholder="Full Name"
          allowClear
          value={profileData.name}
          onChange={val => handleChangeValue('name', val)}
        />
        <InputComponent
          placeholder="Give Name"
          allowClear
          value={profileData.givenName}
          onChange={val => handleChangeValue('givenName', val)}
        />
        <InputComponent
          placeholder="Family Name"
          allowClear
          value={profileData.familyName}
          onChange={val => handleChangeValue('familyName', val)}
        />
        <InputComponent
          placeholder="Giới thiệu"
          allowClear
          value={profileData.bio}
          multiline
          numberOfLines={5}
          onChange={val => handleChangeValue('bio', val)}
        />
        <ButtonComponent
          disabled={profileData === profile}
          text="Update"
          onPress={onUpdateProfile}
          type="primary"
        />
        <LoadingModel visible={isLoading} />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default EditProfileScreen;
