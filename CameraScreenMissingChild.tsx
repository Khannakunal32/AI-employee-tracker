



import React, { Component, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import { Constants } from 'expo';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
export default class App extends Component {
  state = {
    image: null,
    uploading: false,
  };

  render() {
    let {
      image
    } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />

        <Text
          style={styles.exampleText}>
          Example: Scan image through camera or in camera roll
        </Text>

        <Button
          onPress={this._pickImage}
          title="Pick an image from camera roll"
        />

        <Button onPress={this._takePhoto} title="Scan image" />

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
      </View>
    );
  }


  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let {
      image
    } = this.state;

    if (!image) {
      return;
    }

    return (
      <View
        style={styles.maybeRenderContainer}>
        <View
          style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={styles.maybeRenderImageText}>
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };


  _takePhoto = async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!pickerResult.cancelled) {
        this.setState({ image: pickerResult.uri });
      }

      this.uploadImageAsync(pickerResult.uri);
    }
  };

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        aspect: [4, 3],
      });


      if (!pickerResult.cancelled) {
        this.setState({ image: pickerResult.uri});
      }

      this.uploadImageAsync(pickerResult.uri);
    }
  };

 uploadImageAsync(pictureuri) {
  // let apiUrl = 'http://123.123.123.123/ABC';
  // let apiUrl = 'http://10.32.227.7:5000/scanimage';
  // let apiUrl = 'http://127.0.0.1:5000/addtry';
//   console.log(apiUrl);

  axios.post('http://10.32.226.108:5000/comparedummy', {
    userType:"admin",
    imageDetails:{pictureuri}
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function (error){
    console.log(error);
  })


  
  Alert .alert(
    "Details of the case",
    "All the details are logged in console, if matched the information will be processed soon",
    [
      {
        text: "Ok",
        onPress: () => console.log("ok")
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("Hide you personal information") }
    ]
  );



    // data.append('alpha',"beta");
    // data.append('beta',"gamma");

  //   axios.post('http://10.32.227.7:5000/addtry', {
  //     alpha: 'articleID',
  //     beta: 'Axios in React Native'
  // })
  //     .then(function (response) {
  //         console.log(response);
  //     })
  //     .catch(function (error) {
  //         console.log(error);
  //     });

 
        // let name ="kunal";
        // let surname = "khanna";
        // axios.get(`http://10.32.227.7:5000/addtry?alpha=${name}&beta=${surname}`)
        //         .then(function (response) {
        //     console.log(response);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });


    // fetch(apiUrl, {  
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'multipart/form-data'
    //     // 'Content-Type': 'application/json'
    //   },
    //   method: 'POST',
    //   body: data
    // }).then(
    //   response => {
    //     console.log('succ ')
    //     console.log(response)
    //   }
    //   ).catch(err => {
    //   console.log('err ')
    //   console.log(err)
    // } )




  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  maybeRenderImage: {
    height: 250,
    width: 250,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
});
