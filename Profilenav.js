import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Apps/Screens/Profile';
import Myproduct from './Apps/Screens/Myproduct';
import Postdetails from './Apps/Screens/Postdetails';


const Stack = createStackNavigator();

export default function Profilenav() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="profileTab" component={Profile} 
           options={{headerShown:false}}
        />
        <Stack.Screen name="Myproduct" component={Myproduct} options={{ headerStyle:{backgroundColor:'#000'},headerTintColor:'#fff', headerTitle:'My Posts'}} />
        <Stack.Screen name='post-detail' component={Postdetails} options={{ headerStyle:{backgroundColor:'#000'},headerTintColor:'#fff', headerTitle:'Details'}}/>
    </Stack.Navigator>
  );
}
