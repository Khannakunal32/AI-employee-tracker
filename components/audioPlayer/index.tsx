import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, AVPlaybackStatus, Audio } from 'expo-av';

export default function AudioPlayer(props) {
    
   const {uri,type}=props
console.log(uri)
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [audioUri, setaudioUri] = React.useState(props.uri);

  return (
    <View style={styles.container}>
       
      <Video
        ref={video}
        style={type=='audio'?styles.audio:styles.video}
        source={{
          uri: audioUri,
        }}
        useNativeControls
        resizeMode="contain"
     
      
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      {type=="audio"? <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>:null}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 300,
    height:300,
    borderRadius:10
  },
  audio: {
    alignSelf: 'center',
    width: 320,
    height: 50,
    borderRadius:10
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
