import {View, Text, Share, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Portal} from 'react-native-portalize';
import {Modalize} from 'react-native-modalize';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponents,
  TextComponent,
  UserComponent,
} from '../components';
import userAPI from '../apis/userApi';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';
import {fontFamilies} from '../constants/fontFamilies';
import {SearchNormal1, TickCircle} from 'iconsax-react-native';
import {appColors} from '../constants/appColor';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ModalInvite = (props: Props) => {
  const {onClose, visible} = props;
  const modalizeRef = useRef<Modalize>();
  const auth = useSelector(authSelector);
  const [friendIds, setFriendIds] = useState<string[]>([]);
  const [useSelected, setUseSelected] = useState<string[]>([]);
  useEffect(() => {
    if (auth.following && auth.following.length > 0) {
      setFriendIds(auth.following);
    }
  }, [auth]);
  useEffect(() => {
    if (visible) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [visible]);

  const handleSelected = (id: string) => {
    const items: string[] = [...useSelected];

    const index = items.findIndex(element => element === id);

    if (index !== -1) {
      items.splice(index, 1);
    } else {
      items.push(id);
    }
    setUseSelected(items);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <Portal>
      <Modalize
        FooterComponent={
          <SectionComponent>
            <ButtonComponent text="Invite" onPress={onShare} type="primary" />
          </SectionComponent>
        }
        handlePosition="inside"
        adjustToContentHeight
        ref={modalizeRef}
        onClose={onClose}>
        <SectionComponent style={{paddingTop: 30}}>
          <TextComponent
            text="Invite Friend"
            size={24}
            font={fontFamilies.medium}
            title
          />
          <InputComponent
            onChange={val => console.log(val)}
            placeholder="Search"
            suffix={<SearchNormal1 size={20} color={appColors.primary} />}
            value=""
            style={{marginTop: 12, marginBottom: 24}}
          />
          {friendIds.length ? (
            friendIds.map((id: string) => (
              <RowComponent key={id}>
                <View style={{flex: 1}}>
                  <UserComponent
                    type="Invite"
                    userId={id}
                    onPress={() => handleSelected(id)}
                  />
                </View>

                <TickCircle
                  variant="Bold"
                  size={24}
                  color={
                    useSelected.includes(id)
                      ? appColors.primary
                      : appColors.gray2
                  }
                />
              </RowComponent>
            ))
          ) : (
            <TextComponent text="No friends" />
          )}
        </SectionComponent>
      </Modalize>
    </Portal>
  );
};

export default ModalInvite;
