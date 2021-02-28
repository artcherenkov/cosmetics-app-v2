import React, { useState } from "react";
import PropTypes from 'prop-types';
import { FlatList, LogBox, Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

import styles from "./styles";

LogBox.ignoreLogs([
  `VirtualizedLists should never be nested`, // TODO: Remove when fixed
]);

const Picker = ({ data, initialValue, onItemChange, isPlaceholder, isMultiple, pickerContainerStyle, pickedItemTitleStyle, listItemTitleStyle }) => {
  const [searchValue, setSearchValue] = useState(``);
  const [pickedItem, setPickedItem] = useState([initialValue] || [{ title: `Новая услуга` }]);
  const [isPickerOpened, setIsPickerOpened] = useState(false);

  const handleInputChange = (value) => setSearchValue(value);
  const handleItemChange = (newItem) => {
    if (isMultiple) {
      setPickedItem((prevState) => {
        let newState = prevState?.filter((item) => item.title !== initialValue.title) || []
        if (newState?.includes(newItem)) {
          newState = newState.filter((item) => item !== newItem);
        } else {
          newState.push(newItem);
        }
        onItemChange(newState.length ? newState.map((item) => item.title).join(`, `) : null);
        return newState.length ? newState : null;
      });
    } else {
      setPickedItem([newItem]);
      setIsPickerOpened(false);
      onItemChange(newItem, pickedItem[0]);
    }
  };
  const togglePicker = () => {
    setIsPickerOpened((prevState) => !prevState);
    setSearchValue(``);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={handleItemChange.bind(this, item)}>
      <View style={styles.listItem}>
        <Text style={listItemTitleStyle}>
          {isMultiple && pickedItem && pickedItem.includes(item) && <View style={{ marginRight: 10 }}>
            <AntDesign name="check" size={15} />
          </View>}
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const getPickedValueContainerStyles = () => !isPickerOpened
    ? styles.pickedValueContainer
    : [styles.pickedValueContainer, styles.pickedValueContainerActive];

  const getResultString = (arr) => {
    if (arr) {
      return arr.map((item) => item.title).join(`, `);
    }
    return ``;
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={[getPickedValueContainerStyles(), pickerContainerStyle]}
        onPress={togglePicker}
      >
        {getResultString(pickedItem) === initialValue.title && isPlaceholder
          ? <Text style={[styles.pickedValue, pickedItemTitleStyle, { opacity: 0.3 }]}>{getResultString(pickedItem)}</Text>
          : <Text style={[styles.pickedValue, pickedItemTitleStyle]}>{getResultString(pickedItem)}</Text>}
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
