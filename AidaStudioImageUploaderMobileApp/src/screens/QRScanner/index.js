import React, {Component} from 'react';
import {Text, StyleSheet, View, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import axios from 'axios';
class QRScanner extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];
    this.stopScanning = false;
    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
      },
    };
  }

  onBarCodeRead(scanResult) {
    var seconds = new Date().getTime();
    // String barecode = urlBackend.concat(";").concat(token).concat(";").concat(nowStr).concat(";").concat(projectDescription).concat(";").concat(idUser).concat(";").concat(securityKey).concat(";");//.concat(time);

    let qrInfo = scanResult.data.split(';');

    if (!this.stopScanning) {
      if (qrInfo[1] == 'src=aida-studio-qr-code') {
        let url = qrInfo[0];
        this.props.navigation.navigate('ImportImageOptions', {
          url: url,
          qrCode: scanResult.data,
        });
        //please change the ip address below
        axios
          .get(url + '/api/qrCodeValide?qrCode='+qrInfo)
          .then(res => {})
          .catch(err => {
            console.warn('Error :' + err);
            throw err;
          });
      }

      if (qrInfo[1] != 'src=aida-studio-qr-code') {
        this.stopScanning = true;
        Alert.alert('Error', 'QR code does not correspond to Aida Studio', [
          {
            text: 'Ok',
            onPress: () => (this.stopScanning = false),
            style: 'cancel',
          },
        ]);
      }

      if (scanResult.data != null) {
        if (!this.barcodeCodes.includes(scanResult.data)) {
          this.barcodeCodes.push(scanResult.data);
        }
      }
    }

    return;
  }

  async takePicture() {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
    }
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Waiting</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.container, {flex: 1}]}>
        <Text style={styles.text}>
          Please Scan The Qr Code from Aida Studio Website
        </Text>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          defaultTouchToFocus
          flashMode={this.state.camera.flashMode}
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
          style={styles.qrScanner}
          type={this.state.camera.type}
        />
      </View>
    );
  }
}

export default QRScanner;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  qrScanner: {
    marginTop: 75,
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    color: '#303167',
    fontSize: 19,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 55,
    marginBottom: 10,
    marginHorizontal: 50,
  },
});
