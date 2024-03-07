import {ArrowDown2, SearchNormal1} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {appColors} from '../constants/appColor';
import {SelectModel} from '../models/SelectModel';
import {globalStyles} from '../styles/globalStyles';
import ButtonComponent from './ButtonComponent';
import InputComponent from './InputComponent';
import RowComponent from './RowComponent';
import SpaceComponents from './SpaceComponents';
import TextComponent from './TextComponent';
import {fontFamilies} from '../constants/fontFamilies';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  label?: string;
  values: SelectModel[];
  selected?: string | string[];
  onSelect: (val: string | string[]) => void;
  multiple?: boolean;
}

const DropdownPicker = (props: Props) => {
  const {label, values, selected, onSelect, multiple} = props;

  const [isVisibleModalize, setIsVisibleModelize] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const modelizeRef = useRef<Modalize>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // console.log('selectedItems', selected);

  useEffect(() => {
    if (isVisibleModalize) {
      modelizeRef.current?.open();
    }
  }, [isVisibleModalize]);

  useEffect(() => {
    if (isVisibleModalize && selected) {
      setSelectedItems(multiple ? (selected as string[]) : []);
    }
  }, [isVisibleModalize, selected, multiple]);

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      const data = [...selectedItems];
      const index = selectedItems.findIndex(element => element === id);

      if (index !== -1) {
        data.splice(index, 1);
      }
      setSelectedItems(data);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const renderSelectItem = (item: SelectModel) => {
    return (
      <RowComponent
        onPress={
          multiple
            ? () => handleSelectItem(item.value)
            : () => {
                onSelect(item.value), modelizeRef.current?.close();
              }
        }
        key={item.value}
        style={styles.listItemUser}>
        <TextComponent
          text={item.label}
          flex={1}
          font={
            selectedItems?.includes(item.value)
              ? fontFamilies.medium
              : fontFamilies.regular
          }
          color={
            selectedItems?.includes(item.value)
              ? appColors.primary
              : appColors.text
          }
        />
        {selectedItems.includes(item.value) && (
          <MaterialCommunityIcons
            name="account-check"
            size={22}
            color={appColors.primary}
          />
        )}
      </RowComponent>
    );
  };

  const renderSelectedItem = (id: string) => {
    const item = values.find(element => element.value === id);

    return item ? (
      <RowComponent key={id} style={styles.selectedItem}>
        <TextComponent
          text={`${
            item.label.includes('@') ? item.label.split('@')[0] : item.label
          }`}
          color={appColors.primary}
        />
        <SpaceComponents width={8} />
        <TouchableOpacity
          onPress={() => {
            handleSelectItem(id);
            onSelect(selectedItems);
          }}>
          <AntDesign name="close" size={18} color={appColors.text} />
        </TouchableOpacity>
      </RowComponent>
    ) : (
      <></>
    );
  };

  return (
    <View style={{marginBottom: 12}}>
      {label && <TextComponent text={label} styles={{marginBottom: 8}} />}
      <RowComponent
        style={[
          globalStyles.inputContainer,
          {justifyContent: 'flex-start', alignItems: 'flex-start'},
        ]}
        onPress={() => {
          setIsVisibleModelize(true);
        }}>
        <RowComponent style={{flex: 1, flexWrap: 'wrap'}}>
          {selected ? (
            selectedItems.length > 0 ? (
              selectedItems.map(item => renderSelectedItem(item))
            ) : (
              <TextComponent
                text={
                  values.find(element => element.value === selected)?.label ??
                  ''
                }
              />
            )
          ) : (
            <TextComponent text="Select" />
          )}
        </RowComponent>
        <ArrowDown2 size={22} color={appColors.gray2} />
      </RowComponent>
      <Portal>
        <Modalize
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          ref={modelizeRef}
          onClose={() => setIsVisibleModelize(false)}
          handlePosition="inside"
          FooterComponent={
            multiple && (
              <View style={{paddingHorizontal: 20, paddingBottom: 30}}>
                <ButtonComponent
                  text="Arrgee"
                  type="primary"
                  onPress={() => {
                    onSelect(selectedItems);
                    modelizeRef.current?.close();
                  }}
                />
              </View>
            )
          }
          HeaderComponent={
            <RowComponent
              style={{marginBottom: 12, paddingHorizontal: 20, paddingTop: 30}}>
              <View style={{flex: 1}}>
                <InputComponent
                  style={{marginBottom: 0}}
                  placeholder="Search ..."
                  value={searchKey}
                  onChange={val => setSearchKey(val)}
                  allowClear
                  affix={<SearchNormal1 size={22} color={appColors.text} />}
                />
              </View>
              <SpaceComponents width={20} />
              <ButtonComponent
                type="link"
                text="Cancel"
                onPress={() => modelizeRef.current?.close()}
              />
            </RowComponent>
          }>
          <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
            {values.map(item => renderSelectItem(item))}
          </View>
        </Modalize>
      </Portal>
    </View>
  );
};

export default DropdownPicker;
const styles = StyleSheet.create({
  listItemUser: {
    marginBottom: 20,
  },
  selectedItem: {
    borderWidth: 0.5,
    borderColor: appColors.gray,
    padding: 4,
    marginBottom: 8,
    marginRight: 8,
    borderRadius: 8,
  },
});
