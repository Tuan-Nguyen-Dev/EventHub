import {View, Text, Modal, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SpaceComponents,
  TextComponent,
} from '../components';
import {globalStyles} from '../styles/globalStyles';
import {ActivityIndicator} from 'react-native';
import {appColors} from '../constants/appColor';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SearchNormal1} from 'iconsax-react-native';
import {err} from 'react-native-svg';
import axios from 'axios';
import {LocationModel} from '../models/LocationModel';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelected?: (val: string) => void;
}

const ModalLocation = (props: Props) => {
  const {visible, onClose, onSelected} = props;
  const [searchKey, setSearchKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocations] = useState<LocationModel[]>([]);

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
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal animationType="slide" visible={visible} style={{flex: 1}}>
      <View style={{paddingHorizontal: 20}}>
        <RowComponent justify="flex-end" style={{marginVertical: 20}}>
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
          <SpaceComponents width={12} />
          <ButtonComponent text="Cancel" type="link" onPress={handleClose} />
        </RowComponent>
        <View>
          {isLoading ? (
            <ActivityIndicator />
          ) : location.length > 0 ? (
            <FlatList
              data={location}
              renderItem={({item}) => (
                <>
                  <TextComponent text={item.address.label} />
                </>
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
      </View>
    </Modal>
  );
};

export default ModalLocation;
