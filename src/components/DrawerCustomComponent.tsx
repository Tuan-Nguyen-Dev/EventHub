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
  Key,
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
import {HandleNotification} from '../utils/handleNotification';
import AvatarComponent from './AvatarComponent';

const DrawerCustomComponent = ({navigation}: any) => {
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const size = 20;
  const color = appColors.gray;

  // console.log('Auth DrawerCustomComponent', auth);
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

  const handleLogout = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmtoken');
    if (fcmToken) {
      if (auth.fcmTokens && fcmToken.length > 0) {
        const items = [...auth.fcmTokens];
        const index = items.findIndex(element => element === fcmToken);
        if (index !== -1) {
          items.splice(index, 1);
        }
        await HandleNotification.Update(auth.id, items);
      }
    }

    await GoogleSignin.signOut();
    LoginManager.logOut();

    // clear local storage
    await AsyncStorage.removeItem('auth');

    dispatch(removeAuth({}));
  };
  const handleNavigation = (key: string) => {
    switch (key) {
      case 'SignOut':
        handleLogout();
        break;
      case 'MyProfile':
        navigation.navigate('Profile', {
          screen: 'ProfileScreen',
          params: {
            id: auth.id,
          },
        });

        break;
      default:
        console.log(key);
        break;
    }
    navigation.closeDrawer();
  };

  return (
    <View style={styles.container}>
      <AvatarComponent
        onPress={() => handleNavigation('MyProfile')}
        photoURL={auth.photo}
        name={auth.name ? auth.name : auth.email}
      />
      {/* <TouchableOpacity onPress={() => handleNavigation('MyProfile')}>
        {auth.photo ? (
          <Image source={{uri: auth.photo}} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, {backgroundColor: appColors.gray}]}>
            <TextComponent
              title
              size={24}
              color={appColors.white}
              text={
                auth.name
                  ? auth.name
                      .split(' ')
                      [auth.name.split(' ').length - 1].substring(0, 1)
                  : ''
              }
            />
          </View>
        )}
        <TextComponent text={auth.name} title size={18} />
      </TouchableOpacity> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={profileMenu}
        style={{flex: 1, marginVertical: 20}}
        renderItem={({item, index}) => (
          <RowComponent
            style={[styles.listItem]}
            onPress={() => handleNavigation(item.key)}>
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
