import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Button } from "react-native";
import DanielLogo from './assets/img/daniel-logo.png';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Sharing from 'expo-sharing';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';




const App = () => {
  
  
  const [hasPermission, setHasPermission] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [ selectImage, setSelectImage ] = useState(null);
  const [ tipoCamera, setTipoCamera ] = useState(Camera.Constants.Type.back);

  let openImagePicker = async () => {

   let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

   if ( permissionResult.granted === false ) {

    alert('Permisos son requeridos')
    return;

   }

   const pickerResult = await ImagePicker.launchImageLibraryAsync()

   if (pickerResult.cancelled === true ) {

     return; 

   }

    setSelectImage({localUri: pickerResult.uri})
    
   }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted')
      console.log(status);
    })();
  }, []);

  if (hasPermission === null) {
    return (
    
      <View>

        <Text>

          Esperando los permisos...

        </Text>

      </View>
      
      );
  }

  if ( hasPermission === false ) {

    return <Text>No access to camera</Text>;

  }

  if (hasPermission === true ) {

    return (

      <Camera 
        style={styles.camera}
        type={tipoCamera}
        
      >

        <Button
          title='Voltear cámara'
          style={styles.buttonCamera}

          onPress={ () => {

            const { front, back } = Camera.Constants.type
            const nuevoTipo = tipoCamera === back ? front : back 
            setTipoCamera(nuevoTipo)

          }}
        
        />

        

      </Camera>

    )
    

  }



  const openShareDialog = async () => {

   if (!(await Sharing.isAvailableAsync())) {

      alert('Compartir, no está disponible');

      return;
   }

   Sharing.shareAsync(selectImage.localUri);


  }

  return (

    <View style={styles.container}>

      <TouchableOpacity
        onPress={openImagePicker}
      
      
      
      >

        <Image 
        
        // defaultSource={DanielLogo}
        style={styles.image} 
        source={
          
          selectImage !== null ?  {uri: selectImage.localUri} : DanielLogo
        }
        
        />

      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={openShareDialog}
      >

        <Text>
          Nice to meet you!
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
    // resizeMode: 'contain'

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
  },
  camera: {
    width: '100%',
    height: '50%',
    marginTop: 100,
  },
  buttonCamera:{
    marginTop: 40
  }
})

export default App;