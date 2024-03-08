import {View, Text, Modal} from 'react-native';
import React from 'react';
import {TextComponent} from '../components';
import {globalStyles} from '../styles/globalStyles';
import {ActivityIndicator} from 'react-native';
import {appColors} from '../constants/appColor';

interface Props {
  visible: boolean;
  mess?: string;
}

const LoadingModel = (props: Props) => {
  const {visible, mess} = props;
  return (
    <Modal visible={visible} style={{flex: 1}} transparent statusBarTranslucent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color={appColors.white} size={32} />
        <TextComponent text="Loading" flex={0} color={appColors.white} />
      </View>
    </Modal>
  );
};

export default LoadingModel;
