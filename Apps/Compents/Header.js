import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
    const { user } = useUser();
    const [searchQuery, setSearchQuery] = useState('');


    const handleSearch = (text) => {
        setSearchQuery(text);
        console.log('Search query:', text);
    };

    // Function to clear search input
    const clearSearch = () => {
        setSearchQuery('');
    };

    return (
        <View style={{padding:5,backgroundColor:'white'}}>
            <View style={{ padding: 10, borderWidth: 1, borderColor: '#5DA9F0', borderRadius: 30, marginTop: 15, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
                <Ionicons name="search" size={24} color="black" style={{ marginHorizontal: 5 }} />
                <TextInput
                    style={{ flex: 1, fontSize: 15 ,marginHorizontal:5}}
                    placeholder={searchQuery ? '' : 'Search'}
                    onChangeText={handleSearch}
                    value={searchQuery}
                    accessibilityLabel="Search Input"
                />
            </View>
        </View>
    );
}
