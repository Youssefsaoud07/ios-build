import 'react-native-gesture-handler';
import React,{useEffect,useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Login from './Screens/Login';
import Register from './Screens/Register';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CheckEmail from './Screens/checkEmail';
import Validate from './Screens/validateScreen';
import Feeds from './Screens/Feeds';
import { Init } from './JS/actions';

const Stack = createStackNavigator();

 function AuthStack() {
  return (
   
    <Stack.Navigator initialRouteName='Login' screenOptions={{
     headerShown:false 
    }} >
      <Stack.Screen  name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Validate" component={CheckEmail} />
    </Stack.Navigator>
   
  );
}

const MyStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Feeds" component={Feeds} />
     
    </Stack.Navigator>
  );
}
const RootNavigation = () => {
  const token = useSelector(state => state.userReducer.authData);
  console.log('tokeeeeeeeeen',token);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(Init());
    setLoading(false);
  }

  useEffect(() => {
    init()
  }, [])

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color='orange' />
      </View>
    )
  }
  
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='black' barStyle="light-content" />
      {
        token === null ?
          <AuthStack /> : <MyStack />
      }
    </NavigationContainer>
  )
}

 

const App = () => {
 

 
  return (
  
        <RootNavigation />
    
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
