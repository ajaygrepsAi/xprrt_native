
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const OnboardGrandChildItem = ({ item, categoryValue, setCategoryValue }) => {
  const [isSelected, setIsSelected] = useState(false);
  const { width } = Dimensions.get('window'); 

  const handleClick = () => {
    setIsSelected((prev) => {
      const newIsSelected = !prev;
      if (newIsSelected) {
        setCategoryValue((prevValue) => [...prevValue, item.id]);
      } else {
        setCategoryValue((prevValue) => prevValue.filter((id) => id !== item.id));
      }
      return newIsSelected;
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClick}>
        <View style={[styles.imageContainer, { width: width * 0.4, height: width * 0.4 }]}>
          <Image 
            source={{ uri: item?.icon ? item?.icon : 'https://via.placeholder.com/100' }} 
            style={styles.image}
          />
          {isSelected && (
            <LinearGradient
              colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)']}
              style={styles.overlay}
            >
              <Text style={styles.selectedText}>Selected</Text>
            </LinearGradient>
          )}
        </View>
        <View>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  
  },
  imageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    
    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  selectedText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    paddingTop: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1E293B',
  },
});

export default OnboardGrandChildItem;
