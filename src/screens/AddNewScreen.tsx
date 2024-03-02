import React, {useState} from 'react';
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

  const handleChangeValue = (key: string, value: string | Date) => {
    const items = {...eventData};
    items[`${key}`] = value;
    setEventData(items);
  };

  const handleAddEvent = async () => {
    console.log('adadasd', eventData);
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

        <InputComponent
          allowClear
          placeholder="Title Address"
          numberOfLines={3}
          value={eventData.location.title}
          onChange={val =>
            handleChangeValue('location', {...eventData.location, title: val})
          }
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
