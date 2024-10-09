import React, {useEffect, useState} from 'react';
import {Dimensions, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {HttpRequest} from '../../data/Httprequest';
import {API} from '../../constants/constant';
import {getGrandchildNames, StoreAsyncData} from '../../utils/common';
import ProfileImage from './ProfileImage';
import XprrtLogo from './XprrtLogo';
import Carousel from 'react-native-reanimated-carousel';
import ParentCategories from './miscellaneous/ParentCategories';
import ChildCategories from './miscellaneous/ChildCategories';
import SecondChildCategories from './miscellaneous/SecondChildCategories';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const {width,height} = Dimensions.get('window');
  const [searchValue , setSearchValue] = useState('')
  const [isValue,setIsValue] = useState(false)

  const fetchCategoriesData = async () => {
    try {
      const response = await HttpRequest({
        url: API.CATEGORY,
        method: 'GET',
      });

      if (response && response?.data) {
        // console.log('response----data----in categories----', response?.data);
        await StoreAsyncData('categories', response?.data);
        setCategories(response?.data);
        
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  let dataname = getGrandchildNames(categories?.list)

  // console.log(dataname,"dtaname------")

  const filteredData = dataname.filter(item => 
    item.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchValue = (item)=>{
    console.log(item,"item name in handlesearch value ")
    setSearchValue(item)
  }
  const handleSearchInput = (e)=>{
    setSearchValue(e)
    
    if(e.trim().length === 0 ){
      setIsValue(false)
      console.log(isValue,"if-----condition")
   }else{
    setIsValue(true)
    console.log(isValue,"inelse")
   }
  }

  


  useEffect(() => {
    fetchCategoriesData();
   
  }, []);

  // console.log(searchValue,"searchvalue ------")
  return (
    <ScrollView>
      <View className="flex-1 bg-purple-100" style={{width:width}}>
      <View className="p-3 mt-3">
        <View className="flex-row    justify-between ">
          <XprrtLogo />
          <Text className="mt-1 text-lg font-extrabold text-slate-950">HomePage</Text>
          <ProfileImage />
        </View>
        <View className=" rounded-3xl mt-10 bg-gray-100  ">
          <TextInput className="text-lg " value={searchValue} placeholder='Search Your Services' style={{height:70}} onChangeText={handleSearchInput}/>
          {/* <Pressable className="rounded-full border-2 p-2" style={{width:40}}>
            <Text className="">Click</Text>
          </Pressable> */}
        </View>
        <View className="flex-row flex-wrap p-2 rounded-2xl border-gray-100 bg-gray-50 mt-3"  style={isValue ? {width:"100%",display:"block"}:{width:"100%",display:"none"}}>
        {
          isValue ? filteredData?.map((item,index)=>(
            <TouchableOpacity onPress={()=>handleSearchValue(item)}>
              <Text key={index} className="flex  p-3 mt-2 rounded-3xl font-semibold text-slate-950 bg-gray-200" style={{marginLeft:15}}>{item.toLowerCase()}</Text>
            </TouchableOpacity>            
          ))
            
          :<Text></Text>
        }
        </View>

        {/* couresel ------ */}
        <ScrollView
         style={{ width: '100%'  }}
         contentContainerStyle={{ flexGrow:1 }}
         showsVerticalScrollIndicator={false}
        >
          <View style={{width: '100%', height: 300}} className="mt-6">
            <ParentCategories
              data={categories}
              heading="services we provide"
              subheading="Popular Service recommendations for you"
            />
          </View>
          <View style={{width: '100%', height: 300}} className="">
            <ChildCategories
              data={categories}
              heading="Graphics & Design"
              subheading="impeccable services provided by us"
            />
          </View>
          <View style={{width: '100%', height: 300}} className="">
            <SecondChildCategories
              data={categories}
              heading="Programming Services"
              subheading="impeccable services provided by us"
            />
          </View>
        </ScrollView>
      </View>
    </View>
    </ScrollView>
  );
};

export default HomePage;
