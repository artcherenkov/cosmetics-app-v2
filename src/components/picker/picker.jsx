import React, { useState } from "react";
import PropTypes from 'prop-types';
import { FlatList, View, Text, TextInput, TouchableOpacity, LogBox } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import styles from "./styles";

// LogBox.ignoreLogs([
//   `VirtualizedLists should never be nested`, // TODO: Remove when fixed
// ]);

const Picker = ({ data, initialValue, onItemChange }) => {
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
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const getPickedValueContainerStyles = () => !isPickerOpened
    ? styles.pickedValueContainer
    : [styles.pickedValueContainer, styles.pickedValueContainerActive];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={getPickedValueContainerStyles()} onPress={togglePicker}>
        <Text style={styles.pickedValue}>{pickedItem.title}</Text>
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
            data={data.slice().filter((item) => item.title.toLowerCase().includes(searchValue))}
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
  data: PropTypes.array.isRequired,
  initialValue: PropTypes.object.isRequired,
  onItemChange: PropTypes.func.isRequired,
};

export default Picker;
