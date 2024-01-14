import React from 'react';
import {FC} from 'react';
import {View} from 'react-native';

interface Props {
  width?: number;
  height?: number;
}

const SpaceComponents: FC<Props> = ({width, height}) => {
  return (
    <View
      style={{
        width,
        height,
      }}></View>
  );
};

export default SpaceComponents;
