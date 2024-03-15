import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponents,
  TextComponent,
} from '../components';
import ChoiceLocationComponet from '../components/ChoiceLocationComponet';
import {authSelector} from '../redux/reducers/authReducer';
import DateTimePickerComponent from '../components/DateTimePickerComponent';
import userAPI from '../apis/userApi';
import DropdownPicker from '../components/DropdownPicker';
import {SelectModel} from '../models/SelectModel';
import ButtonImagePicker from '../components/ButtonImagePicker';
import {Image} from 'react-native';
import {View} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {Validate} from '../utils/validate';
import storage from '@react-native-firebase/storage';
import {err} from 'react-native-svg';
import {EventModel} from '../models/EventModels';
import eventAPI from '../apis/eventApi';

const initValues = {
  title: '',
  description: '',
  locationTitle: '',
  locationAddress: '',
  position: {
    lat: '',
    long: '',
  },
  users: [],
  photoUrl: '',
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
  price: '',
  category: '',
};

const AddNewScreen = ({navigation}: any) => {
  const auth = useSelector(authSelector);
  // console.log('check auth', auth);
  const [eventData, setEventData] = useState<any>({
    ...initValues,
    authorId: auth.id,
  });

  const [userSelects, setUserSelects] = useState<SelectModel[]>([]);
  const [fileSelected, setFileSelected] = useState<any>();
  const [errorMess, setErrorMess] = useState<string[]>([]);
  // console.log('asdasd', fileSelected.uri);

  const handleChangeValue = (key: string, value: string | Date | string[]) => {
    const items = {...eventData};
    items[`${key}`] = value;
    setEventData(items);
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  useEffect(() => {
    const mess = Validate.AddEventValidation(eventData);
    setErrorMess(mess);
  }, [eventData]);

  const handleGetAllUsers = async () => {
    const api = `/get-all-users`;
    try {
      const res: any = await userAPI.HandleUser(api);
      if (res && res.data) {
        const items: SelectModel[] = [];

        res.data.forEach(
          (item: any) =>
            item.email &&
            items.push({
              label: item.email,
              value: item.id,
            }),
        );
        setUserSelects(items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddEvent = async () => {
    if (fileSelected) {
      const fileName = `${fileSelected.fileName ?? `image-${Date.now()}`}.${
        fileSelected.path.split('.')[1]
      }`;
      const path = `images/${fileName}`;

      const res = storage().ref(path).putFile(fileSelected.path);

      res.on(
        'state_changed',
        snap => {
          console.log(snap.bytesTransferred);
        },
        error => {
          console.log(error);
        },
        () => {
          storage()
            .ref(path)
            .getDownloadURL()
            .then(url => {
              eventData.photoUrl = url;
              handlePustEvent(eventData);
            });
        },
      );
    } else {
      handlePustEvent(eventData);
    }
  };

  const handlePustEvent = async (event: EventModel) => {
    // console.log('Event', event);

    const api = `/add-new`;
    try {
      const res = await eventAPI.HandleEvent(api, event, 'post');
      navigation.navigate('Explore', {
        screen: 'HomeScreen',
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelected = (val: ImageOrVideo) => {
    setFileSelected(val);
    handleChangeValue('photoUrl', val.path);
  };

  const handleLocation = (val: any) => {
    const items = {...eventData};
    items.position = val.position;
    // console.log('Asdasd', val.position);
    items.locationAddress = val.address;

    setEventData(items);
  };
  // console.log('Event data', eventData);
  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent text="Add new " title />
      </SectionComponent>
      <SectionComponent>
        {eventData.photoUrl || fileSelected ? (
          <Image
            source={{
              uri: eventData.photoUrl ? eventData.photoUrl : fileSelected.uri,
            }}
            style={{width: '100%', height: 250}}
            resizeMode="cover"
          />
        ) : null}
        <ButtonImagePicker
          onSelected={
            (val: any) =>
              val.type === 'url'
                ? handleChangeValue('photoUrl', val.value as string)
                : handleFileSelected(val.value)
            // console.log(val)
          }
        />
        <InputComponent
          allowClear
          placeholder="Title"
          value={eventData.title}
          onChange={val => handleChangeValue('title', val)}
        />
        <InputComponent
          allowClear
          placeholder="Description"
          multiline
          numberOfLines={3}
          value={eventData.description}
          onChange={val => handleChangeValue('description', val)}
        />

        <DropdownPicker
          selected={eventData.category}
          values={[
            {
              label: 'Sport',
              value: 'sport',
            },
            {
              label: 'Food',
              value: 'food',
            },
            {
              label: 'Art',
              value: 'art',
            },
            {
              label: 'Music',
              value: 'music',
            },
          ]}
          onSelect={val => handleChangeValue('category', val)}
        />

        <RowComponent>
          <DateTimePickerComponent
            label="Start at: "
            type="time"
            onSelect={val => handleChangeValue('starAt', val)}
            selected={eventData.startAt}
          />

          <SpaceComponents width={20} />
          <DateTimePickerComponent
            label="End at:"
            type="time"
            onSelect={val => handleChangeValue('endAt', val)}
            selected={eventData.endAt}
          />
        </RowComponent>

        <DateTimePickerComponent
          label="Date:"
          type="date"
          onSelect={val => handleChangeValue('date', val)}
          selected={eventData.date}
        />
        <DropdownPicker
          label="Invite User"
          values={userSelects}
          onSelect={(val: string | string[]) =>
            handleChangeValue('users', val as string[])
          }
          selected={eventData.users}
          multiple
        />

        <InputComponent
          allowClear
          placeholder="Title Address"
          value={eventData.locationTitle}
          onChange={val => handleChangeValue('locationTitle', val)}
        />
        <ChoiceLocationComponet onSelect={val => handleLocation(val)} />

        <InputComponent
          placeholder="Price"
          value={eventData.price}
          keyboardType="number-pad"
          onChange={val => handleChangeValue('price', val)}
        />
      </SectionComponent>

      {errorMess.length > 0 && (
        <SectionComponent>
          {errorMess.map(mess => (
            <TextComponent
              text={mess}
              key={mess}
              color="red"
              styles={{marginBottom: 12}}
            />
          ))}
        </SectionComponent>
      )}

      <SectionComponent>
        <ButtonComponent
          disabled={errorMess.length > 0}
          type="primary"
          text="Add New"
          onPress={handleAddEvent}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AddNewScreen;
