import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore, orderBy, onSnapshot, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import Latest from '../Compents/Latest';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function Explore() {
    const [exploreData, setExploreData] = useState([]);
    const db = getFirestore(app);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const unsubscribe = getExplorePosts(); 
        return () => unsubscribe(); 
    }, []);

    const getExplorePosts = () => {
        const exploreQuery = query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));


        const unsubscribe = onSnapshot(exploreQuery, (snapshot) => {
            const newData = snapshot.docs.map((doc) => doc.data());
            setExploreData(newData);
        });

        

        return unsubscribe;
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
        getExplorePosts();
    };

 

    return (
        <View style={{ flex: 1 , backgroundColor:'white' }}>

            <View style={{ padding:10, paddingTop: 25 }}>
               
               
                
            <View style={{ padding: 10, margin:3, borderWidth: 1, borderColor: '#5DA9F0', borderRadius: 30, marginTop: 15, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
                
                <Ionicons name="search" size={24} color="black" style={{ marginHorizontal: 5 }} />
                <TextInput
                    style={{ flex: 1, fontSize: 15 ,marginHorizontal:5 }}
                    placeholder={searchQuery ? '' : 'Search'}
                    onChangeText={handleSearch}
                    value={searchQuery}
                    accessibilityLabel="Search Input"
                />
            </View>

            

                <FlatList
                    data={[exploreData]}
                    renderItem={({ item }) => <Latest latestList={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    style={{marginBottom:50, marginTop:5}}
                />


            </View>
        </View>
    );
}