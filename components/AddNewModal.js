import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Modal,
} from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    margin: 15,
    backgroundColor: "pink",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    input: {

    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'green',
      text: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
      },
    }
  }
});


function AddNewModal( {modalVisible, setModalVisible, setText, buttonAddNew} ) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.modalContainer.input}
          onChangeText={text => setText(text)}
          placeholder="Lisää tuote"
        />
        <Pressable
            style={styles.modalContainer.button}
            onPress={buttonAddNew}
        >
          <Text style={styles.modalContainer.button.text}>Lisää</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

export default AddNewModal;