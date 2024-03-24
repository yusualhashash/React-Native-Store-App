import { Text, View, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import Latest from '../Compents/Latest';

export default function Itemlist() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const db = getFirestore(app);
  const [itemlist, setItemlist] = useState([]);
  const [loading,setLoading]=useState(false);
  
  useEffect(() => {
    params && getItemByCategory();
  }, [params]);

  const getItemByCategory = async () => {
    setItemlist([]);
    setLoading(true);
    const q = query(collection(db, 'UserPost'), where('kind', '==', params.category));
    const snapshot = await getDocs(q);
    setLoading(false);
    if (snapshot.empty) {
      Alert.alert(
        'No Items',
        'There are no items available.',
        [
          { text: 'OK', onPress: () => navigation.goBack() } 
        ]
      );
    } else {
      snapshot.forEach((doc) => {
        setItemlist((prevItemlist) => [...prevItemlist, doc.data()]);
        setLoading(false);
      });
    }
  };

  return (
    <View className="p-2 flex-1 bg-white ">
      {loading?
      <ActivityIndicator size={50} color="#3A67A2" className="mt-25"/>

      :
      

        itemlist?.length > 0 ? (
          <Latest latestList={itemlist} />
        ) : null}  
    </View>
  );
}
