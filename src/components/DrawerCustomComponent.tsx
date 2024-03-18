import {
  Image,
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
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../redux/reducers/authReducer';
import {appColors} from '../constants/appColor';
import {
  Bookmark2,
  Calendar,
  Logout,
  Message2,
  MessageQuestion,
  Setting2,
  Sms,
  User,
} from 'iconsax-react-native';
import {FlatList} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerCustomComponent = ({navigation}: any) => {
  const user = useSelector(authSelector);
  const dispatch = useDispatch();
  const size = 20;
  const color = appColors.gray;
  const profileMenu = [
    {
      key: 'MyProfile',
      title: 'My Profile',
      icon: <User size={size} color={color} />,
    },
    {
      key: 'Message',
      title: 'Message',
      icon: <Message2 size={size} color={color} />,
    },
    {
      key: 'Calendar',
      title: 'Calendar',
      icon: <Calendar size={size} color={color} />,
    },
    {
      key: 'Bookmark',
      title: 'Bookmark',
      icon: <Bookmark2 size={size} color={color} />,
    },
    {
      key: 'ContactUs',
      title: 'Contact Us',
      icon: <Sms size={size} color={color} />,
    },
    {
      key: 'Settings',
      title: 'Settings',
      icon: <Setting2 size={size} color={color} />,
    },
    {
      key: 'HelpAndFAQs',
      title: 'Help & FAQs',
      icon: <MessageQuestion size={size} color={color} />,
    },
    {
      key: 'SignOut',
      title: 'Sign Out',
      icon: <Logout size={size} color={color} />,
    },
  ];

  const handleSignOut = async () => {
    await GoogleSignin.signOut();
    await LoginManager.logOut();
    dispatch(removeAuth({}));
    await AsyncStorage.clear();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('Profile', {
            screen: 'ProfileScreen',
          });
        }}>
        {user.photo ? (
          <Image source={{uri: user.photo}} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, {backgroundColor: appColors.gray}]}>
            <TextComponent
              title
              size={24}
              color={appColors.white}
              text={
                user.name
                  ? user.name
                      .split(' ')
                      [user.name.split(' ').length - 1].substring(0, 1)
                  : ''
              }
            />
          </View>
        )}
        <TextComponent text={user.name} title size={18} />
      </TouchableOpacity>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={profileMenu}
        style={{flex: 1, marginVertical: 20}}
        renderItem={({item, index}) => (
          <RowComponent
            style={[styles.listItem]}
            onPress={
              item.key === 'SignOut'
                ? () => handleSignOut()
                : () => {
                    console.log(item.key);
                    navigation.closeDrawer();
                  }
            }>
            {item.icon}
            <TextComponent text={item.title} styles={styles.listItemText} />
          </RowComponent>
        )}
      />
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
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 100,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    paddingVertical: 12,
    justifyContent: 'flex-start',
  },

  listItemText: {
    paddingLeft: 12,
  },
});
