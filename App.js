import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import home from './components/home';
import login from './components/login';
import createjoin from './components/createjoin'
import attendance from './components/attendence';
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={home}
          options={{title: ' '}}
        />
        <Stack.Screen name="login" component={login} options={{title:''}}/>
        <Stack.Screen name="createjoin" component={createjoin} options={{title:''}}/>
        <Stack.Screen name="attendance" component={attendance} options={{title:''}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack