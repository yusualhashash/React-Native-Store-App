import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
import { app } from '../../firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import Latest from '../Compents/Latest';
import { useNavigation } from '@react-navigation/native';

export default function Myproduct() {


    const db=getFirestore(app);
    const {user}=useUser();
    const[postlist,setPostlist]=useState([]);
    const navigation=useNavigation();



    useEffect(()=>{

        user&&getuserpost();


    },[user])

    useEffect(()=>{
        navigation.addListener('focus',(e)=>{
            getuserpost();
        })

    },[navigation])


    const getuserpost = async () => {
        try {
            const q = query(
                collection(db, 'UserPost'), 
                where('userEmail', '==', user?.primaryEmailAddress?.emailAddress)
            );
            
            const snapshot = await getDocs(q);
            const newPostList = [];
            snapshot.forEach(doc => {
                newPostList.push(doc.data());
            });
            setPostlist(newPostList);
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    };



  return (
    <View className=" flex-1 p-2.5 bg-white">
      <Latest latestList={postlist} />
    </View>
  )
}