import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Explore from './Apps/Screens/Explore';
import Postdetails from './Apps/Screens/Postdetails';


const stack=createStackNavigator();
export default function Explorenav() {
  return (

    <stack.Navigator>
        <stack.Screen name='explore-tab' component={Explore} options={{headerShown:false}}/>
        <stack.Screen name='post-detail' component={Postdetails} options={{ headerStyle:{backgroundColor:'#000'},headerTintColor:'#fff', headerTitle:'Details'}}/>
    </stack.Navigator>

  )
}