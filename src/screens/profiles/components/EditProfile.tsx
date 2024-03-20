import {View, Text} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponents,
  TextComponent,
} from '../../../components';
import {ProfileModel} from '../../../models/ProfileModel';
import TagComponent from '../../../components/TagComponent';
import {useNavigation} from '@react-navigation/native';
import {appColors} from '../../../constants/appColor';

interface Props {
  profile: ProfileModel;
}

const EditProfile = (props: Props) => {
  const {profile} = props;

  const navigation: any = useNavigation();

  // console.log('Profile edited', profile);
  return (
    <SectionComponent>
      <RowComponent>
        <ButtonComponent
          text="Edit Profile"
          onPress={() =>
            navigation.navigate('EditProfileScreen', {
              profile,
            })
          }
          type="primary"
          styles={{
            borderColor: appColors.primary,
            backgroundColor: appColors.white,
          }}
          textColor={appColors.primary}
        />
        <SpaceComponents height={20} />
      </RowComponent>
      <TextComponent text="About" title size={18} />
      <TextComponent text={profile.bio} />
      <SpaceComponents height={20} />
      <>
        <RowComponent>
          <TextComponent text="Interests" title size={18} flex={1} />
          <ButtonComponent text="Change" />
        </RowComponent>
        <RowComponent style={{flexWrap: 'wrap', justifyContent: 'flex-start'}}>
          {Array.from({length: 10}).map((item, index) => (
            <TagComponent
              key={index}
              label="Music"
              bgColor="#e0e0e0"
              onPress={() => {}}
              style={{
                marginRight: 10,
                marginBottom: 12,
              }}
            />
          ))}
        </RowComponent>
      </>
    </SectionComponent>
  );
};

export default EditProfile;
