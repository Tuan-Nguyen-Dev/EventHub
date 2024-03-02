import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {SearchNormal1} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import GeoCoder from 'react-native-geocoding';
import MapView from 'react-native-maps';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SpaceComponents,
  TextComponent,
} from '../components';
import {appColors} from '../constants/appColor';
import {appInfo} from '../constants/appInfos';
import {LocationModel} from '../models/LocationModel';

GeoCoder.init(process.env.MAP_API_KEY as string);

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelected: (val: {
    address: string;
    position?: {
      lat: number;
      long: number;
    };
  }) => void;
}

const ModalLocation = (props: Props) => {
  const {visible, onClose, onSelected} = props;
  const [searchKey, setSearchKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocations] = useState<LocationModel[]>([]);
  const [addressSelected, setAddressSelected] = useState('');

  const [currenLocation, setCurrenLocation] = useState<{
    lat: number;
    long: number;
  }>();
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
    // console.log('adasd', addressSelected);
    GeoCoder.from(addressSelected).then(res => {
      const position = res.results[0].geometry.location;
      // console.log('CHeck res', res.results[0].geometry.location);
      setCurrenLocation({
        lat: position.lat,
        long: position.lng,
      });
    });
  }, [addressSelected]);

  useEffect(() => {
    if (!searchKey) {
      setLocations([]);
    }
  }, [searchKey]);

  const handleClose = () => {
    onClose();
  };

  const handleSearchLocation = async () => {
    const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchKey}&limit=20&lang=vi-VI&apiKey=2avNGLusOpe6YcuFJ_rTfNp20Ccyds_R94d6cm0c_uY `;

    try {
      setIsLoading(true);
      const res = await axios.get(api);
      if (res && res.data && res.status === 200) {
        setLocations(res.data.items);
      }

      setIsLoading(false);
      // console.log('chjec', res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal animationType="slide" visible={visible} style={{flex: 1}}>
      <View>
        <RowComponent
          justify="flex-end"
          style={{marginVertical: 20, paddingHorizontal: 20}}>
          <View style={{flex: 1}}>
            <InputComponent
              style={{marginBottom: 0}}
              placeholder="Search"
              affix={<SearchNormal1 size={20} color={appColors.gray} />}
              value={searchKey}
              allowClear
              onChange={val => setSearchKey(val)}
              onEnd={handleSearchLocation}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              top: 56,
              left: 10,
              right: 10,
              backgroundColor: appColors.white,
              zIndex: 5,
              padding: 20,
            }}>
            {isLoading ? (
              <ActivityIndicator />
            ) : location.length > 0 ? (
              <FlatList
                data={location}
                style={{height: 700}}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{marginBottom: 12}}
                    onPress={() => {
                      setAddressSelected(item.address.label);
                      setSearchKey('');
                    }}>
                    <TextComponent text={item.address.label} />
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View>
                <TextComponent
                  text={searchKey ? 'Location not found' : 'Search location'}
                />
              </View>
            )}
          </View>
          <SpaceComponents width={12} />
          <ButtonComponent text="Cancel" type="link" onPress={handleClose} />
        </RowComponent>

        {currenLocation && (
          <MapView
            style={{
              width: appInfo.sizes.WIDTH,

              height: 500,
              marginVertical: 40,
              zIndex: -1,
            }}
            showsUserLocation
            showsMyLocationButton
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
            mapType="standard"
          />
        )}

        <ButtonComponent
          text="Confrim"
          type="primary"
          onPress={() => {
            onSelected({
              address: addressSelected,
              position: currenLocation,
            });
            onClose();
          }}
        />
      </View>
    </Modal>
  );
};

export default ModalLocation;
