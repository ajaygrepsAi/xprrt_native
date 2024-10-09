
import React, { useState } from 'react'
import { Text,View ,TouchableOpacity,Image, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
const OnboardGrandChildItem = ({item ,categoryValue, setCategoryValue}) => {
    const [isSelected, setIsSelected] = useState(false);
   const {width,height} = Dimensions.get('window')
   
   
    const handleClick = () => {

        setIsSelected(prev => {
          const newIsSelected = !prev;
          if (newIsSelected) {
            setCategoryValue(prevValue => [...prevValue, item.id]); 
          } else {
            setCategoryValue(prevValue => prevValue.filter(id => id !== item.id)); 
          }
    
          return newIsSelected;
        });
      };
    



    console.log(categoryValue,"categoryvalue")


  return (
 
    <View className="p-2 bg-purple-100">
    <TouchableOpacity onPress={handleClick}>
      <View style={{ width: 180, height: 180, position: 'relative' }}>
        <Image 
          source={{ uri: item?.icon ? item?.icon : "https://via.placeholder.com/100" }} 
          style={{ width: '100%', height: '100%', borderRadius: 20 }}
        />
        {isSelected && (
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)']}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Selected</Text>
          </LinearGradient>
        )}
      </View>
      <View>
        <Text className="text-sm  font-extrabold text-slate-950">{item.name}</Text>
      </View>
    </TouchableOpacity>
  </View>
  )
}

export default OnboardGrandChildItem