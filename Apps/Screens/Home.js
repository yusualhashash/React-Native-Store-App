import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList } from 'react-native';
import Header from '../Compents/Header';
import Slider from '../Compents/Slider';
import { collection, getDocs, getFirestore, orderBy, onSnapshot, query } from 'firebase/firestore'; // Import onSnapshot and query
import { app } from '../../firebaseConfig';
import Categary from '../Compents/Categary';
import Latest from '../Compents/Latest';

export default function Home() {
    const db = getFirestore(app);
    const flatListRef = useRef(null); // Ref for FlatList
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [SliderList, setSliderList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [latestList, setLatestList] = useState([]);

    useEffect(() => {
        const unsubscribe = fetchData(); // Call fetchData and store unsubscribe function
        return () => unsubscribe(); // Unsubscribe when component unmounts
    }, []);

    const fetchData = () => {
        const slidersQuery = query(collection(db, 'SliderImages'));
        const categoriesQuery = query(collection(db, 'lists'));
        const latestQuery = query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));

        // Subscribe to changes in collections
        const slidersUnsubscribe = onSnapshot(slidersQuery, (snapshot) => {
            const data = snapshot.docs.map((doc) => doc.data());
            setSliderList(data);
        });

        const categoriesUnsubscribe = onSnapshot(categoriesQuery, (snapshot) => {
            const data = snapshot.docs.map((doc) => doc.data());
            setCategoryList(data);
        });

        const latestUnsubscribe = onSnapshot(latestQuery, (snapshot) => {
            const data = snapshot.docs.map((doc) => doc.data());
            setLatestList(data);
        });

        // Return unsubscribe function
        return () => {
            slidersUnsubscribe();
            categoriesUnsubscribe();
            latestUnsubscribe();
        };
    };



    return (
        <View className="p-5 bg-white flex-1 px-2">
            <Header />
            <FlatList
                ref={flatListRef}
                data={[SliderList, categoryList, latestList]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    if (item === SliderList) {
                        return <Slider SliderList={item} />;
                    } else if (item === categoryList) {
                        return <Categary categoryList={item} />;
                    } else if (item === latestList) {
                        return <Latest latestList={item} heading={'New Posts'} />;
                    }
                }}
                horizontal={false}
            />
        </View>
    );
}
