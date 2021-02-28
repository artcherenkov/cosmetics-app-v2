import React, { useState } from "react";
import PropTypes from 'prop-types';
import { FlatList, View, Text, TextInput, TouchableOpacity, LogBox } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import styles from "./styles";

LogBox.ignoreLogs([
  `VirtualizedLists should never be nested`, // TODO: Remove when fixed
]);

const Picker = ({ data, initialValue, onItemChange, isPlaceholder, pickerContainerStyle, pickedItemTitleStyle, listItemTitleStyle }) => {
  const [searchValue, setSearchValue] = useState(``);
  const [pickedItem, setPickedItem] = useState(initialValue || { title: `Новая услуга` });
  const [isPickerOpened, setIsPickerOpened] = useState(false);

  const handleInputChange = (value) => setSearchValue(value);
  const handleItemChange = (newItem) => {
    const oldItem = pickedItem;
    setPickedItem(newItem);
    setIsPickerOpened(false);
    onItemChange(newItem, oldItem);
  };
  const togglePicker = () => {
    setIsPickerOpened((prevState) => !prevState);
    setSearchValue(``);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={handleItemChange.bind(this, item)}>
      <View style={styles.listItem}>
        <Text style={listItemTitleStyle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const getPickedValueContainerStyles = () => !isPickerOpened
    ? styles.pickedValueContainer
    : [styles.pickedValueContainer, styles.pickedValueContainerActive];

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={[getPickedValueContainerStyles(), pickerContainerStyle]}
        onPress={togglePicker}
      >
        {pickedItem.title === initialValue.title && isPlaceholder
          ? <Text style={[styles.pickedValue, pickedItemTitleStyle, { opacity: 0.3 }]}>{pickedItem.title}</Text>
          : <Text style={[styles.pickedValue, pickedItemTitleStyle]}>{pickedItem.title}</Text>}
        <FontAwesome style={styles.icon} name="unsorted" size={15} color="#808080"/>
      </TouchableOpacity>
      {isPickerOpened && <View style={styles.pickerContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Поиск..."
            onChangeText={handleInputChange}
          />
        </View>
        <View>
          <FlatList
            data={data.slice().filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))}
            style={styles.list}
            initialNumToRender={20}
            removeClippedSubviews={true}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>}
    </View>
  );
};

Picker.propTypes = {
  isPlaceholder: PropTypes.bool,
  pickerContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  pickedItemTitleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  listItemTitleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  data: PropTypes.array.isRequired,
  initialValue: PropTypes.object.isRequired,
  onItemChange: PropTypes.func.isRequired,
};

export default Picker;
