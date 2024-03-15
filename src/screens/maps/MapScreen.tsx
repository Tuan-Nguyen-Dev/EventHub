import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {FlatList, StatusBar, TouchableOpacity, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import {ArrowLeft2} from 'iconsax-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import eventAPI from '../../apis/eventApi';
import {
  CartComponent,
  CategoriresList,
  EventItem,
  InputComponent,
  RowComponent,
  SpaceComponents,
} from '../../components';
import MarkerCustomComponent from '../../components/MarkerCustomComponent';
import {appColors} from '../../constants/appColor';
import {appInfo} from '../../constants/appInfos';
import {EventModel} from '../../models/EventModels';
import {globalStyles} from '../../styles/globalStyles';
import Geocoder from 'react-native-geocoding';
Geocoder.init(process.env.MAP_API_KEY as string);
const MapScreen = ({navigation}: any) => {
  const [currenLocation, setCurrenLocation] = useState<{
    lat: number;
    long: number;
  }>();
  const [events, setEvents] = useState<EventModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      if (position.coords) {
        setCurrenLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      }
    });
  }, []);

  useEffect(() => {
    currenLocation && getNearbyEvents();
  }, [currenLocation]);

  const getNearbyEvents = async () => {
    const api = `/get-events?lat=${currenLocation?.lat}&long=${
      currenLocation?.long
    }&distance=${5}`;
    try {
      const res = await eventAPI.HandleEvent(api);
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log('Evemented', events);

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} />
      {currenLocation ? (
        <MapView
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
          }}
          showsMyLocationButton
          showsUserLocation
          initialRegion={{
            latitude: currenLocation.lat,
            longitude: currenLocation.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: currenLocation.lat,
            longitude: currenLocation.long,
            latitudeDelta: 0.01,
            longitudeDelta: 0.015,
          }}
          mapType="hybrid">
          {events.length > 0 &&
            events.map(event => (
              <Marker
                key={event._id}
                title={event.title}
                description=""
                coordinate={{
                  longitude: event.position.long,
                  latitude: event.position.lat,
                }}>
                <MarkerCustomComponent type={event.category} />
              </Marker>
            ))}
        </MapView>
      ) : (
        <></>
      )}
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          padding: 20,
          paddingTop: 60,
          // backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }}>
        <RowComponent>
          <View style={{flex: 1}}>
            <InputComponent
              style={{marginBottom: 0}}
              affix={
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Explore', {
                      screen: 'HomeScreen',
                    });
                  }}>
                  <ArrowLeft2 size={22} color={appColors.text} />
                </TouchableOpacity>
              }
              placeholder="Search .."
              value=""
              onChange={val => console.log(val)}
            />
          </View>
          <SpaceComponents width={12} />
          <CartComponent
            onPress={getNearbyEvents}
            style={[globalStyles.noSpaceCard, {width: 56, height: 56}]}
            color={appColors.white}>
            <MaterialIcons
              name="my-location"
              size={28}
              color={appColors.primary}
            />
          </CartComponent>
        </RowComponent>
        <SpaceComponents height={20} />
        <CategoriresList />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          right: 0,
          left: 0,
        }}>
        <FlatList
          data={events}
          renderItem={({item}) => <EventItem item={item} type="list" />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default MapScreen;
