/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AddSquare, Calendar, Location, User} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import {Platform} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CricleComponent, TextComponent} from '../components';
import {appColors} from '../constants/appColor';
import {AddNewScreen} from '../screens';
import EventNavigator from './EventNavigator';
import ExploreNavigator from './ExploreNavigator';
import MapNavigator from './MapNavigator';
import ProfileNavigator from './ProfileNavigator';
import DrawerNavigator from './DrawerNavigator';
const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 68,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: appColors.white,
        },
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({focused, color, size}) => {
          let icon: ReactNode;
          color = focused ? appColors.primary : appColors.gray5;
          size = 24;
          switch (route.name) {
            case 'Explore':
              icon = <MaterialIcons name="explore" size={size} color={color} />;
              break;
            case 'Events':
              icon = <Calendar size={size} color={color} variant="Bold" />;
              break;
            case 'Map':
              icon = <Location size={size} color={color} variant="Bold" />;
              break;
            case 'Profile':
              icon = <User size={size} color={color} variant="Bold" />;
              break;
            case 'Add':
              icon = (
                <CricleComponent
                  size={52}
                  styles={{marginTop: Platform.OS === 'ios' ? 50 : -60}}>
                  <AddSquare size={24} color={appColors.white} variant="Bold" />
                </CricleComponent>
              );
              break;
          }

          return icon;
        },
        tabBarIconStyle: {
          marginTop: 8,
        },
        tabBarLabel({focused}) {
          return route.name === 'Add' ? null : (
            <TextComponent
              text={route.name}
              flex={0}
              size={16}
              color={focused ? appColors.primary : appColors.gray5}
              styles={{marginBottom: Platform.OS === 'android' ? 12 : 0}}
            />
          );
        },
      })}>
      <Tab.Screen name="Explore" component={ExploreNavigator} />
      <Tab.Screen name="Events" component={EventNavigator} />
      <Tab.Screen name="Add" component={AddNewScreen} />
      <Tab.Screen name="Map" component={MapNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
