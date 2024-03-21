import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {Edit} from 'iconsax-react-native';
import ModalSelectCategories from '../../../modals/ModalSelectCategories';
import eventAPI from '../../../apis/eventApi';
import {globalStyles} from '../../../styles/globalStyles';
import {Category} from '../../../models/Category';

interface Props {
  profile: ProfileModel;
}

const EditProfile = (props: Props) => {
  const {profile} = props;
  const [isVisibleModalCategory, setIsVisibleModalCategory] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const navigation: any = useNavigation();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const api = `/get-categories`;
    try {
      const res: any = await eventAPI.HandleEvent(api);

      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
          <RowComponent onPress={() => setIsVisibleModalCategory(true)}>
            <Edit size={18} color={appColors.primary} />
            <SpaceComponents width={8} />
            <TextComponent text="Change" color={appColors.primary} />
          </RowComponent>
        </RowComponent>
        <RowComponent style={{flexWrap: 'wrap', justifyContent: 'flex-start'}}>
          {categories.length > 0 &&
            profile.interests &&
            categories.map(
              item =>
                profile.interests?.includes(item._id) && (
                  <View
                    key={item._id}
                    style={[
                      globalStyles.tag,
                      {backgroundColor: item.color, margin: 6},
                    ]}>
                    <TextComponent text={item.title} color={appColors.white} />
                  </View>
                ),
            )}
        </RowComponent>
      </>

      <ModalSelectCategories
        categories={categories}
        seletected={profile.interests}
        onSelected={vals => {
          setIsVisibleModalCategory(false);
          navigation.navigate('ProfileScreen', {
            isUpdated: true,
            id: profile.uid,
          });
        }}
        onClose={() => setIsVisibleModalCategory(false)}
        visible={isVisibleModalCategory}
      />
    </SectionComponent>
  );
};

export default EditProfile;
