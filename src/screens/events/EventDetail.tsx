import {ArrowLeft, ArrowRight, Calendar, Location} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  ButtonComponent,
  CartComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponents,
  TabBarComponent,
  TextComponent,
} from '../../components';
import AvatarGroup from '../../components/AvatarGroup';
import {appColors} from '../../constants/appColor';
import {fontFamilies} from '../../constants/fontFamilies';
import {EventModel} from '../../models/EventModels';
import {globalStyles} from '../../styles/globalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  AuthState,
  authReducer,
  authSelector,
} from '../../redux/reducers/authReducer';
import eventAPI from '../../apis/eventApi';
import LoadingComponent from '../../components/LoadingComponent';
import {LoadingModel} from '../../modals';
import {UserHandle} from '../../utils/UserHandlers';
import {DateTime} from '../../utils/DateTime';
import {appInfo} from '../../constants/appInfos';

const EventDetail = ({navigation, route}: any) => {
  const {item}: {item: EventModel} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [followers, setFollowers] = useState<string[]>([]);

  const auth: AuthState = useSelector(authSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    item && getFollowersById();
  }, [item]);

  const getFollowersById = async () => {
    const api = `/followers?id=${item._id}`;
    try {
      const res = await eventAPI.HandleEvent(api);
      res && res.data && setFollowers(res.data);
    } catch (error) {
      console.log('Can not get followers', error);
    }
  };

  const handleFlower = () => {
    const items = [...followers];
    if (items.includes(auth.id)) {
      const index = items.findIndex(element => element === auth.id);
      if (index !== -1) {
        items.splice(index, 1);
      }
    } else {
      items.push(auth.id);
    }
    setFollowers(items);
    handleUpdateFollowers(items);
  };

  const handleUpdateFollowers = async (data: string[]) => {
    await UserHandle.getFollowersById(auth.id, dispatch);

    const api = `/update-followes`;
    try {
      await eventAPI.HandleEvent(
        api,
        {
          id: item._id,
          followers: data,
        },
        'post',
      );
    } catch (error) {
      console.log('Can not  update followers Event details ', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: appColors.white}}>
      <ImageBackground
        source={{uri: item.photoUrl}}
        style={{flex: 1, height: 230}}
        imageStyle={{
          resizeMode: 'cover',
        }}>
        <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}>
          <RowComponent
            style={{
              padding: 16,
              paddingTop: 42,
              alignItems: 'flex-end',
            }}>
            <RowComponent style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{width: 48, height: 48, justifyContent: 'center'}}>
                <ArrowLeft size={28} color={appColors.white} />
              </TouchableOpacity>
              <TextComponent
                flex={1}
                text="Event Details"
                title
                color={appColors.white}
              />
              <CartComponent
                onPress={handleFlower}
                color={
                  auth.follow_events && auth.follow_events.includes(item._id)
                    ? 'FFFFFFB3'
                    : '#FFFFFF4D'
                }
                style={[globalStyles.noSpaceCard, {width: 36, height: 36}]}>
                <MaterialIcons
                  name="bookmark"
                  size={22}
                  color={
                    auth.follow_events && auth.follow_events.includes(item._id)
                      ? appColors.danger2
                      : appColors.white
                  }
                />
              </CartComponent>
            </RowComponent>
          </RowComponent>
        </LinearGradient>

        <ScrollView
          style={{
            paddingTop: 100,
          }}
          contentContainerStyle={{flexGrow: 1}}>
          <SectionComponent>
            {item.users.length > 0 ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <RowComponent
                  justify="space-between"
                  style={[
                    globalStyles.shadow,
                    {
                      backgroundColor: appColors.white,
                      borderRadius: 100,
                      paddingHorizontal: 12,
                      width: '90%',
                    },
                  ]}>
                  <AvatarGroup userIds={item.users} size={36} />
                  <TouchableOpacity
                    style={[
                      globalStyles.button,
                      {
                        backgroundColor: appColors.primary,
                        paddingVertical: 8,
                      },
                    ]}>
                    <TextComponent text="Invite" color={appColors.white} />
                  </TouchableOpacity>
                </RowComponent>
              </View>
            ) : (
              <>
                <ButtonComponent
                  text="Invite"
                  type="primary"
                  styles={{borderRadius: 100}}
                />
              </>
            )}
          </SectionComponent>
          <View style={{backgroundColor: appColors.white}}>
            <SectionComponent>
              <TextComponent
                title
                font={fontFamilies.medium}
                size={34}
                text={item.title}
              />
            </SectionComponent>
            <SectionComponent>
              <RowComponent style={{marginBottom: 20}}>
                <CartComponent
                  color={`${appColors.primary}4D`}
                  style={[globalStyles.noSpaceCard, {width: 48, height: 48}]}>
                  <Calendar
                    size={22}
                    color={appColors.primary}
                    variant="Bold"
                  />
                </CartComponent>
                <SpaceComponents width={16} />
                <View
                  style={{flex: 1, height: 48, justifyContent: 'space-around'}}>
                  <TextComponent
                    text={DateTime.GetDate(new Date(item.date))}
                    size={16}
                    font={fontFamilies.medium}
                  />
                  <TextComponent
                    text={`${
                      appInfo.dayNames[new Date(item.date).getDay()]
                    }, ${DateTime.GetStartAndEnd(item.startAt, item.endAt)}`}
                    color={appColors.gray}
                  />
                </View>
              </RowComponent>
              <RowComponent style={{marginBottom: 20}}>
                <CartComponent
                  color={`${appColors.primary}4D`}
                  style={[globalStyles.noSpaceCard, {width: 48, height: 48}]}>
                  <Location
                    size={22}
                    color={appColors.primary}
                    variant="Bold"
                  />
                </CartComponent>
                <SpaceComponents width={16} />
                <View
                  style={{flex: 1, height: 48, justifyContent: 'space-around'}}>
                  <TextComponent
                    text={item.locationTitle}
                    size={16}
                    font={fontFamilies.medium}
                  />
                  <TextComponent
                    text={item.locationAddress}
                    color={appColors.gray}
                  />
                </View>
              </RowComponent>
              <RowComponent style={{marginBottom: 20}}>
                <Image
                  source={{
                    uri: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-deo-kinh.jpg',
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
                  style={{flex: 1, height: 48, justifyContent: 'space-around'}}>
                  <TextComponent
                    text="Son Tung MPT"
                    size={16}
                    font={fontFamilies.medium}
                  />
                  <TextComponent
                    text="Monday, AM: 8:00"
                    color={appColors.gray}
                  />
                </View>
              </RowComponent>
            </SectionComponent>
            <TabBarComponent title="About Event" />
            <SectionComponent>
              <TextComponent text={item.description} />
            </SectionComponent>
            <TabBarComponent title="About Event" />
            <SectionComponent>
              <TextComponent text={item.description} />
            </SectionComponent>
          </View>
        </ScrollView>
      </ImageBackground>

      <ButtonComponent
        text="BUY TICKET $120"
        type="primary"
        onPress={() => {}}
        iconFlex="right"
        icons={
          <View
            style={[
              globalStyles.iconContainer,
              {
                backgroundColor: appColors.primary2,
              },
            ]}>
            <ArrowRight size={18} color={appColors.white} />
          </View>
        }
      />
      <LoadingModel visible={isLoading} />
    </View>
  );
};

export default EventDetail;
