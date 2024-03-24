import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Apps/Screens/Home';
import Itemlist from './Apps/Screens/Itemlist';
import Postdetails from './Apps/Screens/Postdetails';


const Stack = createStackNavigator();
export default function Stacknav() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='home' component={Home}
           options={{
            headerShown:false
           }}
        
        />
        <Stack.Screen name='Itemlist' component={Itemlist}
          options={({route})=>({title :route.params.category , headerStyle:{backgroundColor:'#000'},headerTintColor:'#fff'
        
        })}/>

        <Stack.Screen name='post-detail' component={Postdetails}
          options={{ headerStyle:{backgroundColor:'#000'},headerTintColor:'#fff', headerTitle:'Details'
        
        }}
        
        />
    </Stack.Navigator>
)}