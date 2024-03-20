import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import userAPI from '../../apis/userApi';
import {
  AvatarComponent,
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponents,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColor';
import {ProfileModel} from '../../models/ProfileModel';
import {AuthState, authSelector} from '../../redux/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';
import AboutProfile from './components/AboutProfile';
import EditProfile from './components/EditProfile';

const ProfileScreen = ({navigation, route}: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const auth: AuthState = useSelector(authSelector);
  const [profile, setProfile] = useState<ProfileModel>();
  const [userFollowers, setUserFollowers] = useState<string[]>([]);
  const [profileId, setProfileId] = useState('');

  useEffect(() => {
    if (route.params) {
      const {id} = route.params;
      setProfileId(id);

      if (route.params.isUpdated) {
        getProfile();
      }
    } else {
      setProfileId(auth.id);
    }
  }, [route]);

  useEffect(() => {
    if (profileId) {
      getProfile();
      getFollowersByUid();
    }
  }, [profileId]);

  const getProfile = async () => {
    const api = `/getProfile?uid=${profileId}`;
    setIsLoading(true);
    try {
      const res = await userAPI.HandleUser(api);
      res && res.data && setProfile(res.data);
      setIsLoading(false);
      // console.log('Res get profile', res);
    } catch (error) {
      console.log('Failed to get profile', error);
      setIsLoading(false);
    }
  };

  const getFollowersByUid = async () => {
    const api = `/get-followers?uid=${profileId}`;
    try {
      const res = await userAPI.HandleUser(api);
      setUserFollowers(res.data);
      // console.log(res);
    } catch (error) {
      console.log('Failed to get followers', error);
    }
  };

  return (
    <ContainerComponent back title="Profile">
      {isLoading ? (
        <ActivityIndicator />
      ) : profile ? (
        <>
          <SectionComponent style={[globalStyles.center]}>
            <RowComponent>
              <AvatarComponent
                photoURL={profile.photoUrl}
                name={profile.name ? profile.name : profile.email}
                size={100}
              />
            </RowComponent>
            <SpaceComponents height={16} />
            <TextComponent
              text={
                profile.name
                  ? profile.name
                  : profile.familyName && profile.givenName
                  ? `${profile.familyName} ${profile.givenName}`
                  : profile.email
              }
              title
              size={24}
            />
            <SpaceComponents height={16} />
            <RowComponent>
              <View style={[globalStyles.center, {flex: 1}]}>
                <TextComponent
                  title
                  text={`${profile.following.length}`}
                  size={20}
                />
                <SpaceComponents height={8} />
                <TextComponent text="Following" />
              </View>
              <View
                style={{
                  backgroundColor: appColors.gray2,
                  width: 1,
                  height: '100%',
                }}
              />
              <View style={[globalStyles.center, {flex: 1}]}>
                <TextComponent
                  title
                  text={`${userFollowers.length}`}
                  size={20}
                />
                <SpaceComponents height={8} />
                <TextComponent text="Followers" />
              </View>
            </RowComponent>
          </SectionComponent>
          {auth.id !== profileId ? (
            <AboutProfile />
          ) : (
            <EditProfile profile={profile} />
          )}
        </>
      ) : (
        <TextComponent text="Profile not found" />
      )}
      {/* <ButtonComponent
        text="Handle"
        onPress={() => getProfile()}
        type="primary"
      /> */}
    </ContainerComponent>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
