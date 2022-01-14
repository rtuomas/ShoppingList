
import React, {useState, useEffect} from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Animated,
  Easing,
  ImageBackground,
  RefreshControl
} from 'react-native';
import AddNewModal from './components/AddNewModal'
import PlusButton from './components/PlusButton';
import ShoppingList from './components/ShoppingList'
import Network from './services/Networking'

const background = require('./img/ostoskoriBackground.jpg')
const reloadArrow = require('./img/reload.png')

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  header: {
    width: '100%',
    height: 40,
    text: {
      alignSelf: 'center',
      color: 'black',
      fontWeight: 'bold',
      fontSize: 30,
    }

  },
  reloadImage: {
    alignSelf: 'center',
    width: 66,
    height: 66
  },
  button: {
    width: '100%'
  }
});

const OstoskoriApp = () => {

  const [products, setProduct] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  const onRefresh = () => {
    setRefreshing(true);
    console.log("refreshing view...")
    getList().then(() => setRefreshing(false))
  };


  const getList = async () => {
    try {
     let json = await Network.getList()
     setProduct(json);
     setLoaded(true)
   } catch (error) {
     console.error(error);
   }
 }

  useEffect(() => {
    console.log("USE_EFFECT")
    getList();
  }, []);



  const buttonAddNew = async () => {
    if(text!=null){
      const uniqueId = Math.random()
      const newProduct = [
        ...products,
        {
          name: text,
          uniqueId: uniqueId
        }
      ];
      setProduct(newProduct);

      await Network.addNewProduct(text, uniqueId)
      setModalVisible(!modalVisible)
      setText(null)
    }

  }

  const deleteRow = async id => {
    const response = await Network.removeProduct(id)
    if(response.status = 200) {
      const filteredProducts = products.filter(item => item.uniqueId !== id)
      setProduct(filteredProducts)

    } else {
      console.log("error react delete")
    }
  }


  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={background} resizeMode="cover" style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.header.text}>Ostoskori</Text>
        </View>

        <AddNewModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setText={setText}
          buttonAddNew={buttonAddNew}
        />

        <View style={styles.container}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          >
            {
              isLoaded ?
                products.map(product =>
                  <ShoppingList
                    deleteRow={deleteRow}
                    key={Math.random()}
                    uniqueId={product.uniqueId ? product.uniqueId : Math.random()}
                    name={product.name}
                  />
                ) :

              <Animated.View style={{transform: [{rotate: spin}] }} >
                <Image
                          style={styles.reloadImage}
                          source={reloadArrow}
                />
              </Animated.View>

            }
          </ScrollView>
        </View>

        <View style={styles.button}>
          <PlusButton setModalVisible={setModalVisible} />
        </View>

      </ImageBackground>
    </View>
  )
}



export default OstoskoriApp;

