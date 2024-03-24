import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Postitem from './Postitem';

export default function Latest({ latestList, heading }) {
  let numColumns = 2;

  if (latestList.length === 2 || latestList.length === 4) {
    numColumns = 2;
  } else if (latestList.length > 2) {
    numColumns = 2;
  } else {
    numColumns = 1;
  }


  

  return (
   
    <View  style={styles.container}>
        <Text style={{marginTop:-20 ,fontSize: 20, fontWeight: 'bold',}}>{heading}</Text>
      <FlatList
        numColumns={numColumns}
        data={latestList}
        key={numColumns}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => console.log('Item pressed:', item)}
          >
            <Postitem item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20, // Add bottom margin to create space for the last post
    backgroundColor:'white',
  },
  heading: {
    fontSize: 20,
    marginTop:-20,
    fontWeight: 'bold',
  },
  itemContainer: {
    flex: 1,
    width: '50%',
  },
});
