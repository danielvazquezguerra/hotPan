import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import DanielLogo from './assets/img/daniel-logo.png';

const App = () => {

  const ponerNombre = () => {

    console.log('Daniel');

  }

  return (

    <View style={styles.container}>
      <Image 
      
      style={styles.image} 
      source={DanielLogo}
      
      />

      <TouchableOpacity 
        onPress={ponerNombre}
        style={styles.button}
      >

        <Text>
          Mucho gusto!
        </Text>

      </TouchableOpacity>

    </View>  
  );
};


const styles = StyleSheet.create ({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'black',
    marginTop: 20
  },
  image: {
    width: 160,
    height: 133,

  },
  buttonBox: {
    marginTop: 20,
    width: 300, 
    height: 60,
    borderWidth: 2,
    borderColor: 'black'
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 45,
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 40
  }
})

export default App;