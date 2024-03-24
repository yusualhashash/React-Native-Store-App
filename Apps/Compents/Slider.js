import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Image, View } from 'react-native';

export default function Slider({ SliderList }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % SliderList.length;
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex, SliderList.length]);

  return (
    <View style={{ marginTop: 7,backgroundColor:'white' }}>
      <FlatList
        ref={flatListRef}
        horizontal
        data={SliderList}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <Image
              source={{ uri: item?.image }}
              style={{ borderRadius: 8, marginRight: 1, width: 375, height: 185 }}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled={true}
        snapToInterval={355} 
        snapToAlignment={'center'} 
        onScroll={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / 355);
          setCurrentIndex(index);
        }}
      />
    </View>
  );
}
