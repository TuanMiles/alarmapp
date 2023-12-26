import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SleepAnalytics = () => {
  return (
    <View style={styles.container}>
      <Text>Sleep Analytics Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SleepAnalytics;