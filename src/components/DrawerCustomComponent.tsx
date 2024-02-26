import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import RowComponent from './RowComponent';
import ButtonComponent from './ButtonComponent';
import TextComponent from './TextComponent';
import {globalStyles} from '../styles/globalStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SpaceComponents from './SpaceComponents';

const DrawerCustomComponent = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Profile</Text>
      </View>
      <View style={{flex: 1, paddingVertical: 20}}>
        <Text>Menu container</Text>
      </View>
      <RowComponent justify="flex-start">
        {/* <ButtonComponent
          textColor="#00F8FF"
          text="Upgrade Pro"
          color="#00F8FF33"
          type="primary"
        /> */}
        <TouchableOpacity
          style={[globalStyles.button, {backgroundColor: '#00F8FF33'}]}>
          <MaterialCommunityIcons name="crown" size={22} color="#00F8FF" />
          <SpaceComponents width={4} />
          <TextComponent color="#00F8FF" text="Upgrade Pro" />
        </TouchableOpacity>
      </RowComponent>
    </View>
  );
};

export default DrawerCustomComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: Platform.OS === 'android' ? StatusBar.currentHeight : 48,
  },
});
