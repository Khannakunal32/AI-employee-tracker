import 'react-native-get-random-values';
import * as React from 'react';
import { WebView } from 'react-native-webview';

export default function CwebView(props) {
  return (

    <WebView androidHardwareAccelerationDisabled 
    javaScriptEnabled={true}
    domStorageEnabled={true}
    mediaPlaybackRequiresUserAction
    allowsBackForwardNavigationGestures
    allowsInlineMediaPlayback={true}
    allowsFullscreenVideo
    source={{ uri: props.webLink }}
    />
    
  );
}