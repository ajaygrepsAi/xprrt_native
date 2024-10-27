
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const OnboardChildItem = ({ item, name }) => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window'); 

  const handleChild = () => {
    console.log("onboardChild----data", item.id);
    navigation.navigate('onboardgrandchild', { item: item, id: item.id, name: name });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChild}>
        <View style={[styles.imageContainer, { width: width * 0.4, height: width * 0.4 }]}>
          <Image
            source={{ uri: item?.icon ? item?.icon : "https://via.placeholder.com/100" }}
            style={styles.image}
          />
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
  },
  imageContainer: {
    borderRadius: 16,
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
    borderRadius: 16,
  },
  text: {
    fontSize: 11,
    paddingVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1E293B', 
  },
});

export default OnboardChildItem;
