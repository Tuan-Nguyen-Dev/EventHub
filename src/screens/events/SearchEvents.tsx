import {View, Text} from 'react-native';
import React from 'react';

const SearchEvents = ({navigation, params, route}: any) => {
  const {isFilter}: {isFilter: boolean} = route.params;
  console.log('isFilter', isFilter);
  return (
    <View>
      <Text>SearchEvents</Text>
    </View>
  );
};

export default SearchEvents;
