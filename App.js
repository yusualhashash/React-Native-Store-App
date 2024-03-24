import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Apps/Screens/Login';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './TabNavigation';


export default function App() {
  return (
    <ClerkProvider publishableKey='pk_test_aGFuZHktbGVvcGFyZC0zNC5jbGVyay5hY2NvdW50cy5kZXYk'>
      
    <View  className="flex-1 bg-white" >
      <SignedIn>
       <NavigationContainer>
          <TabNavigation/>
       </NavigationContainer>
      </SignedIn>

      <SignedOut>
        <Login/> 
      </SignedOut>

    </View>

    </ClerkProvider>
  );
}


