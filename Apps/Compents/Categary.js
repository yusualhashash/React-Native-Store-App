import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Categary({categoryList}) {
  const navigation=useNavigation();

  return (
    <View className="mt-3 rounded-xl  bg-white  mb-7">
      <Text className=" font-bold text-[20px]" >Categary</Text>
      <FlatList 

        className="mt-1  "
        data={categoryList}
        numColumns={4}
        renderItem={({item , index})=>(
            <TouchableOpacity 
              
              onPress={()=>navigation.navigate('Itemlist',{
                category:item.name
              })}



 

              className="flex-1 border-[1px] 
              rounded-md m-1 p-1 bg-white-200 bg-white shadow-black   border-blue-300 ">

                <Image source={{uri:item.icon}}
                      className="w-full  rounded-lg h-[60px]"
                />
                
                <Text className="mt-1 text-[12px] bg-white-500 text-black text-center rounded-lg font-bold">{item.name}</Text>
                
            </TouchableOpacity>
        )}
      
      />
    </View>
  )
}