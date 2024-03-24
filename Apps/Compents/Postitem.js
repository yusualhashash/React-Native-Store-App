import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Postitem({ item }) {
  const navigation = useNavigation();

  const navigateToPostDetail = () => {
    navigation.push('post-detail', { post: item });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    });

    return unsubscribe;
  }, [navigation]);

  const firstImage = Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : null;

  return (
    <View ClassName="flex-1 bg-white">
    <TouchableOpacity
      style={{
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        margin: 4,
        padding: 2,
        borderColor: '#3182CE',

      }}
      onPress={navigateToPostDetail}
    >
      {firstImage && (
        <Image
          style={{
            width: '100%',
            height: 120,
            borderRadius: 8,
            marginBottom: 2,
          }}
          source={{ uri: firstImage }}
        />
      )}
      <View >
      <Text style={{ fontWeight: 'bold', marginLeft:10, marginRight:10, backgroundColor:'#589AD8', borderRadius:25, fontSize: 14, textAlign:'center'}}>{item.kind}</Text>
        <Text style={{ fontWeight: 'bold',marginLeft:3,marginRight:3, marginTop:3, fontSize: 13 }}>{item.title}</Text>
        <Text style={{ color: '#3182CE' ,marginLeft:3,marginRight:3 }}>{item.price}</Text>
      </View>
    </TouchableOpacity>
    </View>
  );
}
