import React from 'react';
import {View, StyleSheet} from 'react-native';
import ValidateCreditCard from './demo/ValidateCreditCard';
import ValidateCreditCardWithHook from './demo/ValidateCreditCardWithHook';

function App() {
  return (
    <View style={styles.container}>
      <ValidateCreditCard />
      {/* <ValidateCreditCardWithHook /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
