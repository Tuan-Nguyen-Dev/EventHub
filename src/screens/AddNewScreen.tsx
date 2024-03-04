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

const initValues = {
  title: '',
  description: '',
  location: {
    title: '',
    address: '',
  },
  user: [],
  imageUr: '',
  authorId: '',
  starAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
};

const AddNewScreen = () => {
  const auth = useSelector(authSelector);
  // console.log('check auth', auth);
  const [eventData, setEventData] = useState<any>({
    ...initValues,
    authorId: auth.id,
  });

  const [userSelects, setUserSelects] = useState<SelectModel[]>([]);

  const handleChangeValue = (key: string, value: string | Date | string[]) => {
    const items = {...eventData};
    items[`${key}`] = value;
    setEventData(items);
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

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
    const res = await userAPI.HandleUser('/get-all-users');

    // console.log('Res', res);
  };

  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent text="Add new " title />
      </SectionComponent>
      <SectionComponent>
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

        <RowComponent>
          <DateTimePickerComponent
            label="Start At :"
            onSelect={val => handleChangeValue('starAt', val)}
            selected={eventData.starAt}
            type="time"
          />
          <SpaceComponents width={20} />
          <DateTimePickerComponent
            label="End At :"
            onSelect={val => handleChangeValue('endAt', val)}
            selected={eventData.endAt}
            type="time"
          />
        </RowComponent>

        <DateTimePickerComponent
          label="Date :"
          onSelect={val => handleChangeValue('date', val)}
          selected={eventData.date}
          type="date"
        />

        <DropdownPicker
          label="Invite User"
          values={userSelects}
          onSelect={(val: string | string[]) =>
            handleChangeValue('users', val as string[])
          }
          selected={eventData.user}
          multiple
        />

        <InputComponent
          allowClear
          placeholder="Title Address"
          value={eventData.location.title}
          onChange={val =>
            handleChangeValue('location', {...eventData.location, title: val})
          }
        />
        <ChoiceLocationComponet />

        <InputComponent
          placeholder="Price"
          value={eventData.price}
          keyboardType="number-pad"
          onChange={val =>
            handleChangeValue('price', {...eventData.price, val})
          }
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          type="primary"
          text="Add New"
          onPress={handleAddEvent}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AddNewScreen;
