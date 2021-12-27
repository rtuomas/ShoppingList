import React from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#616EC3',
    text: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'white',
    },
  }
});


function PlusButton( {setModalVisible} ) {
  return (
    <Pressable
      style={styles.button}
      onPress={() => setModalVisible(true)}
    >
      <Text style={styles.button.text}>+</Text>
    </Pressable>
  );
}

export default PlusButton;