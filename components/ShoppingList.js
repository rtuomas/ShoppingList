import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  ShoppingList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: 'lightblue',
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    text: {
      padding: 5,
      width: '90%',
      fontSize: 20,
      color: 'black'
    },
    delete: {
      alignSelf: 'center',
      borderRadius: 25,
      padding: 5,
      backgroundColor: 'red',
      height: 30,
      text: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
      },
    }
  }
});


function ShoppingList( {deleteRow, name, uniqueId} ) {
  console.log("shoppinglist ", name, uniqueId)

  const [rowOptions, setRowOptions] = useState(false)

  const options = () => {
    setRowOptions(!rowOptions)
  }

  return (
    <TouchableOpacity onPress={options}>
      <View style={styles.ShoppingList}>
        <Text style={styles.ShoppingList.text}>{name}</Text>
        {rowOptions ?
            <Pressable
              style={styles.ShoppingList.delete}
              onPress={() => deleteRow(uniqueId)}
            >
              <Text style={styles.ShoppingList.delete.text}> X </Text>
            </Pressable>
          : null}
      </View>
    </TouchableOpacity>
  );
}

export default ShoppingList;