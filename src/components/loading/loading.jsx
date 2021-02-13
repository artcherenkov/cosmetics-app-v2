import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={`large`} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: `absolute`,
    justifyContent: `center`,
    alignItems: `center`,
    zIndex: 100,
    top: 0,
    left: 0,
    backgroundColor: `rgba(255, 255, 255, .6)`,
    width: `100%`,
    height: `100%`,
  },
});

export default Loading;
