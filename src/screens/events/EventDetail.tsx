import {ArrowLeft, ArrowRight, Calendar, Location} from 'iconsax-react-native';
import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  ButtonComponent,
  CartComponent,
  RowComponent,
  SectionComponent,
  SpaceComponents,
  TabBarComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColor';
import {globalStyles} from '../../styles/globalStyles';
import AvatarGroup from '../../components/AvatarGroup';
import {EventModel} from '../../models/EventModels';
import {fontFamilies} from '../../constants/fontFamilies';

const EventDetail = ({navigation, route}: any) => {
  const {item}: {item: EventModel} = route.params;
  return (
    <View style={{flex: 1, backgroundColor: appColors.white}}>
      <ImageBackground
        source={require('../../assets/images/event-img.png')}
        style={{flex: 1, height: 244}}
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
                color="#FFFFFF4D"
                style={[globalStyles.noSpaceCard, {width: 36, height: 36}]}>
                <MaterialIcons
                  name="bookmark"
                  size={22}
                  color={appColors.white}
                />
              </CartComponent>
            </RowComponent>
          </RowComponent>
        </LinearGradient>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            paddingTop: 100,
          }}>
          <SectionComponent>
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
                <AvatarGroup size={36} />
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
          </SectionComponent>
          <View style={{backgroundColor: appColors.white, flex: 1}}>
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
                    text="14 December 2024"
                    size={16}
                    font={fontFamilies.medium}
                  />
                  <TextComponent
                    text="Monday, AM: 8:00"
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
                    text={item.location.title}
                    size={16}
                    font={fontFamilies.medium}
                  />
                  <TextComponent
                    text={item.location.address}
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
          </View>
        </ScrollView>
      </ImageBackground>

      <LinearGradient
        colors={['rgba(255,255,255,0.5)', 'rgba(255,255,255,1)']}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          padding: 12,
        }}>
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
      </LinearGradient>
    </View>
  );
};

export default EventDetail;
