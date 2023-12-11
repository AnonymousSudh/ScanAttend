import React from 'react';
import { Picker } from '@react-native-picker/picker';

const Dropdown = ({ items, selectedValue, onValueChange }) => {
  return (
    <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
      {items.map((item, index) => (
        <Picker.Item key={index} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
};

export default Dropdown;