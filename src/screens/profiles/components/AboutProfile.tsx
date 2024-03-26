import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponents,
  TextComponent,
} from '../../../components';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {appColors} from '../../../constants/appColor';
import {useDispatch, useSelector} from 'react-redux';
import {
  authSelector,
  updateFollowing,
} from '../../../redux/reducers/authReducer';
import {ProfileModel} from '../../../models/ProfileModel';
import {globalStyles} from '../../../styles/globalStyles';
import {fontFamilies} from '../../../constants/fontFamilies';
import userAPI from '../../../apis/userApi';
import {LoadingModel} from '../../../modals';

interface Props {
  profile: ProfileModel;
}

const AboutProfile = (props: Props) => {
  const {profile} = props;
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [tabSelected, setTabSelected] = useState('about');
  const tabs = [
    {
      key: 'about',
      title: 'About',
    },
    {
      key: 'events',
      title: 'Events',
    },
    {
      key: 'reviews',
      title: 'Reviews',
    },
  ];

  // console.log('Profile about profile', profile);
  console.log('Auth about profile', auth);

  const renderTabContent = (id: string) => {
    let content = <></>;
    switch (id) {
      case 'about':
        content = (
          <>
            <TextComponent text={profile.bio} />
          </>
        );
        break;

      default:
        content = <></>;
        break;
    }
    return content;
  };

  const handleToggleFollowing = async () => {
    const api = `/update-following`;
    setIsLoading(true);
    try {
      const res = await userAPI.HandleUser(
        api,
        {
          uid: auth.id,
          authorId: profile.uid,
        },
        'put',
      );

      // console.log('Res about profile', res);
      dispatch(updateFollowing(res.data));
      setIsLoading(false);
    } catch (error) {
      console.log('Can not update following About Profile', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <SectionComponent>
        <RowComponent>
          <ButtonComponent
            onPress={handleToggleFollowing}
            iconFlex="left"
            icons={
              <Feather
                name={
                  auth.following && auth.following.includes(profile.uid)
                    ? 'user-minus'
                    : 'user-plus'
                }
                size={20}
                color={appColors.white}
              />
            }
            text={
              auth.following && auth.following.includes(profile.uid)
                ? 'Unfollow'
                : 'Follow'
            }
            type="primary"
          />
          <SpaceComponents height={20} />

          <ButtonComponent
            textColor={appColors.primary}
            iconFlex="left"
            icons={
              <Ionicons
                name="chatbubble-outline"
                size={20}
                color={appColors.primary}
              />
            }
            text="Messages"
            type="primary"
            styles={{backgroundColor: appColors.white}}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent>
          {tabs.map(item => (
            <TouchableOpacity
              onPress={() => setTabSelected(item.key)}
              style={[
                globalStyles.center,
                {
                  flex: 1,
                },
              ]}
              key={item.key}>
              <TextComponent
                styles={{}}
                text={item.title}
                size={16}
                font={
                  item.key === tabSelected
                    ? fontFamilies.medium
                    : fontFamilies.regular
                }
                color={
                  item.key === tabSelected ? appColors.primary : appColors.text
                }
              />
              <View
                style={{
                  width: 50,
                  flex: 0,
                  marginTop: 6,
                  borderRadius: 100,
                  height: 3,
                  backgroundColor:
                    item.key === tabSelected
                      ? appColors.primary
                      : appColors.white,
                }}
              />
            </TouchableOpacity>
          ))}
        </RowComponent>
        {renderTabContent(tabSelected)}
      </SectionComponent>
      <LoadingModel visible={isLoading} />
    </>
  );
};

export default AboutProfile;
