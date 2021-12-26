/* eslint-disable jsx-quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  BackHandler,
  Platform,
  Alert,
} from 'react-native';

import ProgressBar from 'react-native-progress/Bar';
import {Button} from 'react-native-elements';

import images from './images';

export const config = {apiUrl: 'https://uwandzani.com'};
const App = () => {
  const webViewRef = useRef();

  const [isLoading, setLoad] = useState(true);
  const [isLoadingFirst, setLoadFirst] = useState(true);
  const [isError, setSetError] = useState(false);
  const [isLand, setLand] = useState(
    Dimensions.get('screen').width < Dimensions.get('screen').height,
  );

  const [Dim, setDim] = useState(Dimensions.get('screen'));

  const styleInject = `
    body {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    }

`;

  const JAVASCRIPTTEXT = `
  $(function() {
    const meta = document.createElement('meta');
     meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); 
     meta.setAttribute('name', 'viewport'); 
    document.getElementsByTagName('head')[0].appendChild(meta);
    var styleElement = document.createElement('style');
    styleElement.innerHTML = '${styleInject
      .replace(/\'/g, "\\'")
      .replace(/\n/g, '\\n')}';
    document.head.appendChild(styleElement);
  });
  `;

  const handleBackButton = () => {
    Alert.alert(
      "Fermeture de l'application",
      "Voulez vous fermer l'application?",
      [
        {
          text: 'Non',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Oui',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  useEffect(() => {
    if (Platform.OS == 'android') {
      BackHandler.addEventListener('hardwareBackPress', () =>
        handleBackButton(),
      );
    }
  }, []);

  useEffect(() => {
    if (Platform.OS == 'android') {
      BackHandler.removeEventListener('hardwareBackPress', () =>
        handleBackButton(),
      );
    }
  }, null);

  setTimeout(() => {
    webViewRef && webViewRef.current.injectJavaScript(JAVASCRIPTTEXT);
  }, 500);

  useEffect(() => {
    let W = Dimensions.get('screen').width;
    let H = Dimensions.get('screen').height;
    Dimensions.addEventListener('change', () => {
      setLand(W < H);
      setDim(Dimensions.get('screen'));
      return console.log('  addEventListener ', W > H);
    });
  }, []);

  let W = Dim.width;
  let H = Dim.height;

  return (
    <View style={styles.container}>
      <WebView
        ref={ref => (webViewRef.current = ref)}
        originWhitelist={['*']}
        mixedContentMode="always"
        domStorageEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        source={{uri: `https://uwandzani.com`}}
        onError={() => {}}
        // injectedJavaScriptBeforeContentLoaded={JAVASCRIPTTEXT}
        onLoad={() => {
          setLoad(true);
          setLoadFirst(true);
          // webViewRef && webViewRef.current.injectJavaScript(JAVASCRIPTTEXT);
        }}
        onLoadStart={() => {
          setLoadFirst(false);
          setLoad(true);
        }}
        onError={() => setSetError(true)}
        onHttpError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          setSetError(true);
        }}
        onRenderProcessGone={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          setSetError(true);
        }}
        javaScriptEnabled={true}
        // injectedJavaScript={JAVASCRIPTTEXT}
        onShouldStartLoadWithRequest={request => {
          return request.url.startsWith(config.apiUrl);
        }}
        startInLoadingState={true}
        // renderLoading={() => }
        onLoadEnd={() => {
          setLoadFirst(false);
          setLoad(false);
        }}
      />
      {isLoading && (
        <>
          <View
            style={{
              ...styles.loading,
              width: isLand ? W : H,
              height: !isLand ? W : H,
              opacity: isLoadingFirst ? 1 : 0.8,
            }}></View>
          <View
            style={{
              ...styles.loadingContainer,
              width: isLand ? W : H,
              height: !isLand ? W : H,
            }}>
            <View
              style={{
                backgroundColor: '#fff1dc',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <Image
                style={{
                  ...styles.tinyLogo,
                  width: isLand ? W : H / 2.3,
                  height: isLand ? W : H / 3.2,
                  maxWidth: 280,
                  maxHeight: 200,
                }}
                source={images.logo}
              />
              <ProgressBar color="#ff6600" indeterminate={true} />
            </View>
          </View>
        </>
      )}
      {isError && (
        <>
          <View
            style={{
              ...styles.loading,
              width: isLand ? W : H,
              height: !isLand ? W : H,
              opacity: 1,
            }}></View>
          <View
            style={{
              ...styles.loadingContainer,
              width: isLand ? W : H,
              height: !isLand ? W : H,
            }}>
            <Image
              style={{
                ...styles.tinyLogo,
                width: isLand ? W : H / 2.3,
                height: isLand ? W : H / 3.2,
                maxWidth: 280,
                maxHeight: 200,
              }}
              source={images.logo}
            />
            <Text>Il semble que vous n'êtes pas connecté !</Text>
            <Button
              buttonStyle={{
                backgroundColor: '#ff6600',
                marginTop: 20,
              }}
              titleStyle={{
                color: '#ffff',
                textTransform: 'uppercase',
                paddingLeft: 20,
                paddingRight: 20,
              }}
              title="réessayer"
              onPress={() => {
                webViewRef && webViewRef.current.reload();
                setSetError(false);
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    position: 'relative',
  },
  loading: {
    position: 'absolute',
    backgroundColor: '#fff1dc',
    zIndex: 999,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 150,
  },
  loadingContainer: {
    position: 'absolute',
    zIndex: 9999,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyLogo: {
    margin: 0,
    resizeMode: 'contain',
    opacity: 1,
  },
});

export default App;
