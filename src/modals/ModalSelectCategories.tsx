import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {appColors} from '../constants/appColor';
import {KnifeFork, KnifeFork_Color} from '../assets/svgs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Portal} from 'react-native-portalize';
import {Modalize} from 'react-native-modalize';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../components';
import {Category} from '../models/Category';
import eventAPI from '../apis/eventApi';
import {globalStyles} from '../styles/globalStyles';
import userAPI from '../apis/userApi';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelected: (vals: string[]) => void;
  seletected?: string[];
  categories?: Category[];
}

const ModalSelectCategories = (props: Props) => {
  const {visible, onClose, onSelected, seletected} = props;

  const [isFill, setIsFill] = useState(false);
  const modalizeRef = useRef<Modalize>();
  const [catsSelected, setCatsSelected] = useState<string[]>(seletected ?? []);
  const [categories, setCategories] = useState<Category[]>([]);
  const auth = useSelector(authSelector);

  useEffect(() => {
    if (visible) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [visible]);
  const onSelectedCategory = (id: string) => {
    const items = [...catsSelected];
    const index = items.findIndex(element => element === id);

    if (index !== -1) {
      items.splice(index, 1);
      setCatsSelected(items);
    } else {
      setCatsSelected([...items, id]);
    }
  };
  //   const categories: Category[] = [
  //     {
  //       key: 'sports',
  //       title: 'Sports',

  //       color: '#F0635A',
  //       // _id: ''
  //     },
  //     {
  //       key: 'music',
  //       title: 'Music',
  //       color: '#F59762',
  //     },
  //     {
  //       key: 'food',
  //       title: 'Food',

  //       color: '#29D697',
  //     },
  //     {
  //       key: 'art',
  //       title: 'Art',

  //       color: '#46CDFB',
  //     },
  //   ];
  const handleUpdateInterests = async () => {
    const api = `/update-interests?uid=${auth.id}`;

    try {
      await userAPI.HandleUser(api, catsSelected, 'put');
      onSelected(catsSelected);
    } catch (error) {
      console.log(error);
    }
  };
  // const getCategories = async () => {
  //   const api = `/get-categories`;
  //   try {
  //     const res: any = await eventAPI.HandleEvent(api);
  //     setCategories(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Portal>
      <Modalize
        handlePosition="inside"
        adjustToContentHeight
        ref={modalizeRef}
        onClose={onClose}>
        <SectionComponent style={{padding: 30}}>
          <RowComponent>
            {categories.length > 0 &&
              categories.map(category => (
                <TouchableOpacity
                  onPress={() => onSelectedCategory(category._id)}
                  style={[
                    globalStyles.shadow,
                    globalStyles.center,
                    {
                      padding: 12,
                      marginRight: 8,
                      marginBottom: 8,
                      backgroundColor: appColors.white,
                      borderRadius: 12,
                      minWidth: 80,
                      borderWidth: 1,
                      borderColor: catsSelected?.includes(category._id)
                        ? appColors.primary
                        : appColors.white,
                    },
                  ]}
                  key={category._id}>
                  <TextComponent text={category.title} />
                </TouchableOpacity>
              ))}
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <ButtonComponent
            type="primary"
            onPress={handleUpdateInterests}
            text="Agree"
          />
        </SectionComponent>
      </Modalize>
    </Portal>
  );
};

export default ModalSelectCategories;
