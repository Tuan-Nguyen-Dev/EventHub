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
  const {selected, onSelect, type, label} = props;
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  // console.log('selected', selected);
  // console.log('onselected', onSelect);
  return (
    <View style={{flex: 1}}>
      {label && (
        <TextComponent text={label} styles={{marginBottom: 8}} size={18} />
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
              : 'Choice'
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
        mode={type}
        open={isShowDatePicker}
        date={new Date()}
        modal
        onCancel={() => setIsShowDatePicker(false)}
        onConfirm={val => {
          setIsShowDatePicker(false);
          // console.log(val);
          onSelect(val);
        }}
      />
    </View>
  );
};

export default DateTimePickerComponent;
