import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {ReactNode} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {globalStyles} from '../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import RowComponent from './RowComponent';
import {appColors} from '../constants/appColor';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {ArrowLeft} from 'iconsax-react-native';
import TextComponent from './TextComponent';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  back?: boolean;
}

const ContainerComponent = (props: Props) => {
  const {children, isImageBackground, isScroll, title, back} = props;

  const navigation: any = useNavigation();

  const returnContainer = isScroll ? (
    <ScrollView style={{flex: 1}}>{children}</ScrollView>
  ) : (
    <View style={{flex: 1}}>{children}</View>
  );

  const headerComponent = () => {
    return (
      <View style={{flex: 1}}>
        {(title || back) && (
          <RowComponent
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              minWidth: 48,
              minHeight: 48,
            }}>
            {back && (
              <TouchableOpacity
                style={{marginRight: 12}}
                onPress={() => navigation.goBack()}>
                <ArrowLeft size={24} color={appColors.text} />
              </TouchableOpacity>
            )}
            {title ? (
              <TextComponent text={title} font={fontFamilies.medium} />
            ) : (
              <></>
            )}
          </RowComponent>
        )}

        {returnContainer}
      </View>
    );
  };

  return isImageBackground ? (
    <ImageBackground
      source={require('../assets/images/splash-img.png')}
      style={{flex: 1}}
      imageStyle={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>{headerComponent()}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyles.container]}>
      <View>{headerComponent()}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;

const styles = StyleSheet.create({});
