import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  TextComponent,
} from '../components';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';
import {Autobrightness} from 'iconsax-react-native';
import ChoiceLocationComponet from '../components/ChoiceLocationComponet';

const initValues = {
  title: '',
  description: '',
  location: {
    title: '',
    address: '',
  },
  user: [''],
  imageUr: '',
  authorId: '',
  starAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
};

const AddNewScreen = () => {
  const auth = useSelector(authSelector);
  const [eventData, setEventData] = useState<any>({
    ...initValues,
    authorId: auth.id,
  });

  const handleChangeValue = (key: string, value: string) => {
    const items = {...eventData};
    items[`${key}`] = value;
    setEventData(items);
  };

  const handleAddEvent = async () => {
    console.log(eventData);
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
        <ChoiceLocationComponet />
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
