import {
  ArrowDown,
  HambergerMenu,
  Notification,
  SearchNormal1,
  Sort,
} from 'iconsax-react-native';
import React from 'react';
import {Platform, StatusBar, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  CategoriresList,
  CricleComponent,
  RowComponent,
  SpaceComponents,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColor';
import {fontFamilies} from '../../constants/fontFamilies';
import {authSelector} from '../../redux/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TabComponent from '../../components/TagComponent';
import TagComponent from '../../components/TagComponent';

const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();

  const auth = useSelector(authSelector);

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={{
          backgroundColor: appColors.primary,
          height: Platform.OS === 'android' ? 170 : 190,
          borderBottomLeftRadius: 33,
          borderBottomRightRadius: 33,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
        }}>
        <View style={{paddingHorizontal: 16}}>
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <HambergerMenu size={24} color={appColors.white} />
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'center'}}>
              <RowComponent>
                <TextComponent
                  text="Current Location"
                  color={appColors.white}
                />
                <MaterialIcons
                  name="arrow-drop-down"
                  size={18}
                  color={appColors.white}
                />
              </RowComponent>
              <TextComponent
                text="New York, USA"
                color={appColors.white}
                font={fontFamilies.medium}
              />
            </View>

            <CricleComponent styles={{backgroundColor: '#524CE0'}} size={36}>
              <View>
                <Notification size={18} color={appColors.white} />
                <View
                  style={{
                    backgroundColor: '#02E9FE',
                    width: 10,
                    height: 10,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: '#524CE0',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                />
              </View>
            </CricleComponent>
          </RowComponent>
          <SpaceComponents height={20} />
          <RowComponent>
            <RowComponent
              style={{flex: 1}}
              onPress={() =>
                navigation.navigate('SearchEvents', {
                  isFilter: false,
                })
              }>
              <SearchNormal1
                size={18}
                variant="TwoTone"
                color={appColors.white}
              />
              <View
                style={{
                  width: 1,
                  backgroundColor: appColors.white,
                  marginHorizontal: 10,
                  height: 24,
                }}
              />
              <TextComponent
                flex={1}
                text="Search ..."
                color={appColors.gray2}
                size={18}
              />
            </RowComponent>
            <TagComponent
              onPress={() =>
                navigation.navigate('SearchEvents', {
                  isFilter: true,
                })
              }
              bgColor="#5D56F3"
              label="Filter"
              icon={
                <CricleComponent size={16} color="#B1AEFA">
                  <Sort size={16} color="#5D56F3" />
                </CricleComponent>
              }
            />
          </RowComponent>
          <SpaceComponents height={20} />
        </View>

        <View style={{marginTop: 10}}>
          <CategoriresList isFill />
        </View>

        <View style={{flex: 1}}></View>
      </View>
    </View>
  );
};

export default HomeScreen;
