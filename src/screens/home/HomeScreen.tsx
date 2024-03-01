import {
  ArrowDown,
  HambergerMenu,
  Notification,
  SearchNormal1,
  Sort,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  CartComponent,
  CategoriresList,
  CricleComponent,
  EventItem,
  RowComponent,
  SectionComponent,
  SpaceComponents,
  TabBarComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColor';
import {fontFamilies} from '../../constants/fontFamilies';
import {authSelector, removeAuth} from '../../redux/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TabComponent from '../../components/TagComponent';
import TagComponent from '../../components/TagComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk-next';
import GeoLocation from '@react-native-community/geolocation';
import axios from 'axios';
import {err} from 'react-native-svg';
import {AddressModel} from '../../models/AddressModel';
const HomeScreen = ({navigation}: any) => {
  const [currenLocation, setCurrenLocation] = useState<AddressModel>();

  const dispatch = useDispatch();

  const auth = useSelector(authSelector);

  useEffect(() => {
    GeoLocation.getCurrentPosition(position => {
      if (position.coords) {
        reverseGeoLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      }
    });
  }, []);

  const reverseGeoLocation = async ({
    lat,
    long,
  }: {
    lat: number;
    long: number;
  }) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=vi-VI&apiKey=2avNGLusOpe6YcuFJ_rTfNp20Ccyds_R94d6cm0c_uY `;

    try {
      const res = await axios(api);
      if (res && res.status === 200 && res.data) {
        const item = res.data.items;
        setCurrenLocation(item[0]);
      }
    } catch (error) {
      console.log(err);
    }
  };
  console.log(currenLocation);

  const itemEvents = {
    title: 'International Band Music Concert',
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    location: {
      title: 'Title',
      address: 'Ha Noi UUUUU',
    },
    user: [''],
    imageUr: '',
    authorId: '',
    starAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),
  };

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={{
          backgroundColor: appColors.primary,
          height: Platform.OS === 'android' ? 170 : 190,
          borderBottomLeftRadius: 33,
          borderBottomRightRadius: 33,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
        }}>
        <View style={{paddingHorizontal: 16}}>
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <HambergerMenu size={24} color={appColors.white} />
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'center'}}>
              <RowComponent>
                <TextComponent
                  text="Current Location"
                  color={appColors.white}
                />
                <MaterialIcons
                  name="arrow-drop-down"
                  size={18}
                  color={appColors.white}
                />
              </RowComponent>

              {currenLocation && (
                <TextComponent
                  text={`${currenLocation.address.city}, ${currenLocation.address.countryName}`}
                  color={appColors.white}
                  font={fontFamilies.medium}
                />
              )}
            </View>

            <CricleComponent styles={{backgroundColor: '#524CE0'}} size={36}>
              <View>
                <Notification size={18} color={appColors.white} />
                <View
                  style={{
                    backgroundColor: '#02E9FE',
                    width: 10,
                    height: 10,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: '#524CE0',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                />
              </View>
            </CricleComponent>
          </RowComponent>
          <SpaceComponents height={20} />
          <RowComponent>
            <RowComponent
              style={{flex: 1}}
              onPress={() =>
                navigation.navigate('SearchEvents', {
                  isFilter: false,
                })
              }>
              <SearchNormal1
                size={18}
                variant="TwoTone"
                color={appColors.white}
              />
              <View
                style={{
                  width: 1,
                  backgroundColor: appColors.white,
                  marginHorizontal: 10,
                  height: 24,
                }}
              />
              <TextComponent
                flex={1}
                text="Search ..."
                color={appColors.gray2}
                size={18}
              />
            </RowComponent>
            <TagComponent
              onPress={() =>
                navigation.navigate('SearchEvents', {
                  isFilter: true,
                })
              }
              bgColor="#5D56F3"
              label="Filter"
              icon={
                <CricleComponent size={16} color="#B1AEFA">
                  <Sort size={16} color="#5D56F3" />
                </CricleComponent>
              }
            />
          </RowComponent>
          <SpaceComponents height={20} />
        </View>

        <View style={{marginTop: 10}}>
          <CategoriresList isFill />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, marginTop: Platform.OS === 'android' ? 22 : 18}}>
        <TabBarComponent title="Upcoming Events" onPress={() => {}} />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Array.from({length: 5})}
          renderItem={({item, index}) => (
            <EventItem type="card" key={index} item={itemEvents} />
          )}
        />
        <SectionComponent>
          <ImageBackground
            source={require('../../assets/images/invite-image.png')}
            style={{flex: 1, padding: 16, minHeight: 127}}
            imageStyle={{flex: 1, resizeMode: 'cover', borderRadius: 12}}>
            <TextComponent text="Invite your friends" title />
            <TextComponent text="Get $20 for ticket" />
            <RowComponent justify="flex-start">
              <TouchableOpacity
                style={[
                  globalStyles.button,
                  {
                    marginTop: 12,
                    backgroundColor: '#00F8FF',
                    paddingHorizontal: 28,
                  },
                ]}>
                <TextComponent
                  text="INTIVE"
                  font={fontFamilies.bold}
                  color={appColors.white}
                />
              </TouchableOpacity>
            </RowComponent>
          </ImageBackground>
        </SectionComponent>

        <TabBarComponent title="Nearby You" onPress={() => {}} />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Array.from({length: 5})}
          renderItem={({item, index}) => (
            <EventItem type="card" key={index} item={itemEvents} />
          )}
        />
      </ScrollView>
      {/* <Button
        title="LogOut"
        onPress={async () => {
          await AsyncStorage.clear();
          await GoogleSignin.signOut();
          dispatch(removeAuth({}));
          LoginManager.logOut();
        }}
      /> */}
    </View>
  );
};

export default HomeScreen;
