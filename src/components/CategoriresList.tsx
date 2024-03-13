import {View, Text, FlatList} from 'react-native';
import React, {ReactNode} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {appColors} from '../constants/appColor';
import TagComponent from './TagComponent';
import {Art, KnifeFork, KnifeFork_Color} from '../assets/svgs';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface Props {
  isFill?: boolean;
}

interface Cateogry {
  icon: ReactNode;
  color: string;
  label: string;
  key: string;
}

const CategoriresList = (props: Props) => {
  const {isFill} = props;

  const categories: Cateogry[] = [
    {
      key: 'sports',
      label: 'Sports',
      icon: (
        <FontAwesome5
          name="basketball-ball"
          color={isFill ? appColors.white : '#F0635A'}
          size={20}
        />
      ),
      color: '#F0635A',
    },
    {
      key: 'music',
      label: 'Music',
      icon: (
        <FontAwesome5
          name="music"
          color={isFill ? appColors.white : '#F59762'}
          size={20}
        />
      ),
      color: '#F59762',
    },
    {
      key: 'food',
      label: 'Food',
      icon: isFill ? (
        <KnifeFork color={isFill ? appColors.white : '#29D697'} />
      ) : (
        <KnifeFork_Color color={isFill ? appColors.white : '#29D697'} />
      ),
      color: '#29D697',
    },
    {
      key: 'art',
      label: 'Art',
      icon: (
        <Ionicons
          name="color-palette"
          color={isFill ? appColors.white : '#46CDFB'}
        />
      ),
      color: '#46CDFB',
    },
  ];

  return (
    <FlatList
      style={{paddingHorizontal: 16}}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      renderItem={({item, index}) => (
        <TagComponent
          style={{
            marginRight: index === categories.length - 1 ? 28 : 12,
            minWidth: 82,
          }}
          onPress={() => {}}
          bgColor={isFill ? item.color : appColors.white}
          label={item.label}
          icon={item.icon}
          textColor={isFill ? appColors.white : appColors.text2}
        />
      )}
    />
  );
};

export default CategoriresList;
