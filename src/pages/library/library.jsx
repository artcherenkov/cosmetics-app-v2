import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";

import commonStyles from "../common-styles";
import styles from './styles';
import data from './data';
import Link from "../../components/link/link";

const LibraryScreen = ({ navigation }) => {
  return (
    <View style={commonStyles.page}>
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Entypo name="menu" size={30}/>
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>База знаний</Text>
      </View>
      <View style={styles.container}>
        <View style={{ flexGrow: 1, flex: 1, marginBottom: 40 }}>
          <FlatList
            style={styles.list}
            data={data}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item }) => <Link url={item.url} content={item.title} />}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>

      </View>
    </View>
  );
};

LibraryScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default LibraryScreen;
