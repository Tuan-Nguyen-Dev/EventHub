import {View, Text} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponents,
} from '../../../components';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {appColors} from '../../../constants/appColor';
const AboutProfile = () => {
  return (
    <>
      <SectionComponent>
        <RowComponent>
          <ButtonComponent
            iconFlex="left"
            icons={
              <Feather name="user-plus" size={20} color={appColors.white} />
            }
            text="Follow"
            type="primary"
          />
          <SpaceComponents height={20} />

          <ButtonComponent
            textColor={appColors.primary}
            iconFlex="left"
            icons={
              <Ionicons
                name="chatbubble-outline"
                size={20}
                color={appColors.primary}
              />
            }
            text="Messages"
            type="primary"
            styles={{backgroundColor: appColors.white}}
          />
        </RowComponent>
      </SectionComponent>
    </>
  );
};

export default AboutProfile;
