import {View, Text} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {ArrowRight2, Calendar, Clock} from 'iconsax-react-native';
import {appColors} from '../constants/appColor';
import {globalStyles} from '../styles/globalStyles';
import {fontFamilies} from '../constants/fontFamilies';
import {DateTime} from '../utils/DateTime';

interface Props {
  selected?: Date;
  type: 'date' | 'time';
  onSelect: (val: Date) => void;
  label?: string;
}

const DateTimePickerComponent = (props: Props) => {
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const {selected, onSelect, type, label} = props;
  //   console.log(new Date(selected).toISOString());
  // console.log('ádasdasd', selected);

  return (
    <View style={{flex: 1}}>
      {label && (
        <TextComponent
          title
          text="Start At: "
          styles={{marginBottom: 8}}
          size={18}
        />
      )}
      <RowComponent
        style={[globalStyles.inputContainer]}
        onPress={() => setIsShowDatePicker(true)}>
        <TextComponent
          text={`${
            selected
              ? type === 'time'
                ? DateTime.GetTime(selected)
                : DateTime.GetDate(selected)
              : 'Choice Time'
          }`}
          flex={1}
          font={fontFamilies.medium}
          styles={{textAlign: 'center'}}
        />
        {type === 'time' ? (
          <Clock size={22} color={appColors.gray} />
        ) : (
          <Calendar size={22} color={appColors.gray} />
        )}
      </RowComponent>
      <DatePicker
        open={isShowDatePicker}
        date={new Date()}
        mode={type}
        modal
        onConfirm={val => {
          setIsShowDatePicker(false);
          onSelect(val);
        }}
        onCancel={() => {
          setIsShowDatePicker(false);
        }}
      />
    </View>
  );
};

export default DateTimePickerComponent;
