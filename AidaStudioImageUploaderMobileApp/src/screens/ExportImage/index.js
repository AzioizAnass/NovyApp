import React from 'react';
import {
  Text,
  View,
  Button,
  Image,
  Alert,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Badge} from 'react-native-elements';
import axios from 'axios';

const ExportImage = ({imageUri, setImageUri, url}) => {
  const sendImage = () => {
    let file = new FormData();
    file.append('file', {
      uri: imageUri.uri,
      name: 'file.jpg',
      type: 'image/jpg',
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    //please change the IP address below
    console.log(url);
    axios
      .post(url + '/api/ihms/uploadImage', file, config)
      .then(res => {
        if (res.status == 201) {
          ToastAndroid.showWithGravityAndOffset(
            'The image has been sent',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            170,
          );
        }
      })
      .catch(err => {
        Alert.alert('Error : network error');
        throw err;
      });
  };
  const deleteImage = () => {
    setImageUri('');
  };
  const editImage = () => {
    ImagePicker.openCropper({
      path: imageUri.uri,
      freeStyleCropEnabled: true,
      cropperActiveWidgetColor: '#FF067E',
      cropperToolbarTitle: 'Edit Image',
    }).then(image => {
      setImageUri({uri: image.path});
    });
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
      }}>
      <View
        resizeMode="contain"
        style={[
          styles.container,
          {
            flexDirection: 'row',
            alignContent: 'center',
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            paddingBottom: 9,
            paddingTop: 9,
            paddingLeft: 15,
            backgroundColor: 'white',
          },
        ]}>
        <Image
          style={{width: 40, height: 40}}
          source={require('../../../assets/icons/NovelisLogo.png')}
          resizeMode="contain"
        />
        <Text
          style={{
            color: '#303167',
            fontSize: 20,
            marginLeft: 10,
            fontWeight: 'bold',
          }}>
          Aida Studio Image Uploader
        </Text>
      </View>
      <View
        style={{
          top: 18,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <View style={{width: 250, height: 400, flexDirection: 'column'}}>
            <Image
              source={imageUri}
              resizeMode="contain"
              style={{
                flex: 1,
                backgroundColor: '#ddd',
                top: 0,
              }}
            />
            <Badge
              value="X"
              textStyle={{fontWeight: 'bold'}}
              badgeStyle={{paddingBottom: 1}}
              status="primary"
              containerStyle={{position: 'absolute', top: -4, right: -4}}
              onPress={() => deleteImage()}
            />
          </View>
          <View
            style={{
              height: 85,
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Button
              onPress={() => editImage()}
              color="#7BAFFF"
              title="Edit Image"></Button>
            <Button
              onPress={() => sendImage()}
              color="#FF067E"
              title="Send Image"></Button>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ExportImage;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
  },
});
