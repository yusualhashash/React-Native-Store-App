import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import post from './../../assets/Images/post.png'
import explore from './../../assets/Images/explore.png'
import favorite from './../../assets/Images/favorite.png'
import logout from './../../assets/Images/logout.png'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'



export default function Profile() {

  const {user}=useUser();
  const navigation=useNavigation();
  const { isLoaded,signOut } = useAuth();

  const menu=[
    {
      id:1,
      name:'My Posts',
      icon:post,
      path:'Myproduct'
    },

    {
      id:2,
      name:'Explore',
      icon:explore,
      path:'Explore'
    },

    {
      id:3,
      name:'My Favorite',
      icon:favorite,
      uri:''
    },

    {
      id:4,
      name:'Logout',
      icon:logout
    },
  ];




  const onMenuPress = (item) => {
    if (item.name === 'Logout') {
      Alert.alert(
        'Are you sure you want to logout?',
        'Do you want to logout?',
        [
          {
            text: 'Yes',
            onPress: () => signOut(),
          },
          {
            text: 'Cancel',
          },
        ]
      );
    }
    item?.path ? navigation.navigate(item.path) : null;
  };
  

  return (
    <GestureHandlerRootView className="flex  items-center  bg-white border-white-500  pt-10 ">
    <View className=" bg-white" >
      <View  className="flex flex-col  items-center m-10">
        <Image className="w-[120px]  h-[120px] rounded-full " source={{uri:user?.imageUrl}}/>
        <Text className=" pt-2 font-bold text-[20px]" >{user?.fullName}</Text>
        <Text className="text-[15px] text-gray-500">{user?.primaryEmailAddress.emailAddress}</Text>
      </View>

      <FlatList

          style={{marginTop:10 }}
          data={menu}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (

            <TouchableOpacity className="flex-1 bg-white border-[1px] border-blue-300 mt-5 items-center rounded-2xl p-1 m-1" 
                onPress={()=>onMenuPress(item)}
            >
              {item.icon &&<Image className="w-[87px] h-[85px] items-center " source={item?.icon} />}
              <Text className="items-center font-bold">{item.name}</Text>
            </TouchableOpacity>
            

          )}
          
      />
      

    </View>
    </GestureHandlerRootView>
  )
}