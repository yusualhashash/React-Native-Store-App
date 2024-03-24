import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Apps/Screens/Home';
import Explore from './Apps/Screens/Explore';
import Addpost from './Apps/Screens/Addpost';
import Profile from './Apps/Screens/Profile';
import { Ionicons } from '@expo/vector-icons';
import Stacknav from './Stacknav';
import Explorenav from './Explorenav';
import Profilenav from './Profilenav';



const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    
      <Tab.Navigator screenOptions={{headerShown:false}}>


         <Tab.Screen name='Profile' component={Profilenav} options={{
            tabBarLabel :({color})=>(
                <Text style={{color:color , fontSize:12 , marginBottom:5}}> Profile </Text>
            ),

            tabBarIcon:({color, size})=>(
                <Ionicons name="person-circle" size={size} color={color} />
            )
        }}/> 



        <Tab.Screen name='Explore' component={Explorenav} options={{
            tabBarLabel :({color})=>(
                <Text style={{color:color , fontSize:12 , marginBottom:5}}> Search </Text>
            ),

            tabBarIcon:({color, size})=>(
                <Ionicons name="search" size={size} color={color} />
            )
        }}/>



        <Tab.Screen name='Addpost' component={Addpost} options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color , fontSize:12, marginBottom:5}} >Add Post</Text>
            ),

            tabBarIcon:({color,size})=>(
                <Ionicons name="add-circle" size={size} color={color} />
            )
        }}/>
        

        <Tab.Screen name='Home-Nav' component={Stacknav} options={{
            tabBarLabel:({color}) =>(
                <Text style={{color:color ,fontSize:12 ,marginBottom:5 }}>Home</Text>
            ),

            tabBarIcon:({color, size})=>(
                <Ionicons name="home" size={size} color={color} />
            )
        }}/>

       

      </Tab.Navigator>
    
  )
}