import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import React from 'react';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View className=" flex-1 bg-white">
      <Image 
        source={require('./../../assets/Images/login.png')} 
        style={{ width: '100%', height: 370, marginTop:40, resizeMode: 'cover' }}
      />
      <View style={{ padding: 5, marginTop: 75,marginLeft:10,marginRight:10, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 7 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}> IDLIP ONLINE STORE</Text>
        <Text style={{ fontSize: 17, color: '#8088A0', marginTop: 5, textAlign: 'center' }}>Buy Sell MarketPlace where you can sell old item and make real money</Text>
        <TouchableOpacity 
          onPress={onPress} 
          style={{ padding: 15, marginBottom:10, backgroundColor: '#336E96', borderRadius: 30, marginTop: 24 }}
          activeOpacity={0.8}
        > 
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 17 }}> Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
