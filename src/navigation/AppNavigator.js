import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppNavigator = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>App Navigator Placeholder</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  text: {
    fontSize: 16,
    color: '#64748b',
  },
});

export default AppNavigator;
