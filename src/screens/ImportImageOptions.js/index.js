import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Permissions from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import ExportImage from '../ExportImage';
import {IconButton, MD3Colors} from 'react-native-paper';

const ImportImageOptions = ({route, navigation}) => {
  let [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
  let [zoom, setZoom] = useState(0);
  let cameraRef = useRef(null);
  let [imageUri, setImageUri] = useState('');
  let [imagePath, setImagePath] = useState('');

  const {url} = route.params;

  useEffect(() => {
    Permissions.check('photo').then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      setPermission(response);
    });
  }, []);

  const takePicture = async () => {
    try {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      options;
      console.log('data uri :', data.uri);
      //setImageUri(data.uri);
      openCamera(data.uri);
    } catch (error) {
      console.log('error : ', error);
    }
  };
  const openCamera = data => {
    ImagePicker.openCropper({
      path: data,
      freeStyleCropEnabled: true,
      cropperActiveWidgetColor: '#FF067E',
      cropperToolbarTitle: 'Edit Image',
    }).then(image => {
      const source = {uri: image.path};
      setImageUri(source);
    });
  };

  const openGalerie = () => {
    ImagePicker.openPicker({
      cropping: true,
      freeStyleCropEnabled: true,
      cropperActiveWidgetColor: '#FF067E',
      cropperToolbarTitle: 'Edit Image',
    })
      .then(image => {
        const source = {uri: image.path};
        console.log('success');
        //setImagePath(image.path);
        setImageUri(source);
      })
      .catch(e => console.log(e));
  };
  const deleteImage = () => {
    setImageUri('');
  };
  const toggleFlash = () => {
    flash == RNCamera.Constants.FlashMode.off
      ? setFlash(RNCamera.Constants.FlashMode.torch)
      : setFlash(RNCamera.Constants.FlashMode.off);
  };

  return (
    <View
      resizeMode="contain"
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
      }}>
      {imageUri ? (
        <ExportImage
          resizeMode="contain"
          imageUri={imageUri}
          setImageUri={setImageUri}
          deleteImage={deleteImage}
          url={url}
        />
      ) : (
        <View style={styles.container}>
          <RNCamera
            resizeMode="contain"
            ref={cameraRef}
            style={styles.qrScanner}
            flashMode={flash}
            type={RNCamera.Constants.Type.back}
          />
          <View
            style={{
              position: 'absolute',
              alignItems: 'center',
              backgroundColor: '#2E9659',
              top: 0,
              left: 0,
              right: 0,
              height: 22,
              borderRadius: 100,
            }}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Camera Is On</Text>
          </View>

          <View
            resizeMode="contain"
            style={{
              flexDirection: 'column',
              width: 315,
              alignItems: 'stretch',
              justifyContent: 'space-between',
              position: 'absolute',
              bottom: 0,
              paddingBottom: 25,
            }}>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 0,
                borderColor: '#B90058',
                borderWidth: 4,
                borderRadius: 100,
                borderStyle: 'solid',
                width: 100,
                height: 100,
                marginBottom: 25,
                padding: 30,
              }}
              onPress={() => takePicture()}>
              <View
                style={{
                  alignSelf: 'center',
                  flex: 0,
                  outlineColor: '#B90058',
                  outlineWidth: 30,
                  borderRadius: 100,
                  outlineStyle: 'solid',
                  backgroundColor: 'white',
                  width: 80,
                  height: 80,
                }}></View>
            </TouchableOpacity>

            <View
              style={{
                height: 'auto',
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingBottom: 16,
                flex: 0,
                position: 'absolute',
                bottom: 0,
                paddingBottom: 65,
                paddingLeft: 10,
              }}>
              <IconButton
                icon="image"
                mode="contained"
                containerColor="white"
                size={35}
                iconColor="#5679B1"
                onPress={() => openGalerie()}
              />
            </View>
            <View
              style={{
                height: 'auto',
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: 16,
                flex: 0,
                position: 'absolute',
                bottom: 0,
                paddingBottom: 65,
                marginLeft: 241,
              }}>
              {flash == RNCamera.Constants.FlashMode.torch ? (
                <IconButton
                  icon="flash-off"
                  mode="contained"
                  containerColor="white"
                  size={35}
                  iconColor="#AEAEAE"
                  onPress={() => toggleFlash()}
                />
              ) : (
                <IconButton
                  icon="flash"
                  mode="contained"
                  containerColor="white"
                  size={35}
                  iconColor="#5679B1"
                  onPress={() => toggleFlash()}
                />
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ImportImageOptions;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  qrScanner: {
    //marginTop: 75,
    width: 410,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    resizeMode: 'contain',
    flex: 1,
  },
});
