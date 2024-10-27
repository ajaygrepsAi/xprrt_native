import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {HttpRequest} from '../../data/Httprequest';
import {API} from '../../constants/constant';
import {getGrandchildNames, StoreAsyncData} from '../../utils/common';
import ProfileImage from './ProfileImage';
import XprrtLogo from './XprrtLogo';
import Carousel from 'react-native-reanimated-carousel';
import ParentCategories from './miscellaneous/ParentCategories';
import ChildCategories from './miscellaneous/ChildCategories';
import SecondChildCategories from './miscellaneous/SecondChildCategories';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSolid,
  faBell,
  faBars,
  faPenToSquare,
  faMagnifyingGlass,
  faPaperPlane,

} from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const {width, height} = Dimensions.get('window');
  const [searchValue, setSearchValue] = useState('');
  const [isValue, setIsValue] = useState(false);
  const navigatation = useNavigation()
  const [searchId,setSearchId] = useState()

  const fetchCategoriesData = async () => {
    try {
      const response = await HttpRequest({
        url: API.CATEGORY,
        method: 'GET',
      });

      if (response && response?.data) {
        // console.log('response----data----in categories----', response?.data);
        // await StoreAsyncData('categories', response?.data);
        setCategories(response?.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  let dataname = getGrandchildNames(categories?.list);

  const filteredData = dataname.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchValue = (item,id)=> {
    // console.log(item, 'item name in handlesearch value ');
    // console.log(id, 'item id---- in handlesearch value ');
    setSearchId(id)
    setSearchValue(item);
  };

  console.log(searchValue,"searchvalue------data in home page ")
  console.log(searchId, 'searchid in handlesearch value ');

  const handleSearchInput = e => {
    setSearchValue(e);

    if (e.trim().length === 0) {
      setIsValue(false);
      console.log(isValue, 'if-----condition');
    } else {
      setIsValue(true);
      console.log(isValue, 'inelse');
    }
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  const handleAccount = ()=>{
    navigatation.navigate('accounts')
  }


  const handleSearchData= ()=>{
     navigatation.navigate("filterpage",{searchName:searchValue,searchId:searchId})
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-1 bg-white " style={{width: width}}>
        <View className="p-3 mt-3">
          <View className="flex-row    justify-between ">
            <XprrtLogo />
            <Text className="mt-1 text-lg font-extrabold text-slate-950">
              Home
            </Text>
            <TouchableOpacity onPress={handleAccount}>
            <ProfileImage />
            </TouchableOpacity>
          </View>

          <View
            className="rounded-3xl mt-5 bg-white flex-row items-center "
            style={{
              shadowColor: '#4D4D4D',
              shadowOffset: {width: 4, height: 4},
              shadowOpacity: 0.25,
              shadowRadius: 19,
              elevation: 4,
              borderRadius: 24,
              paddingHorizontal: 16,
              position:"relative"
            }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="#000" />
            <TextInput
              className="text-lg ml-3"
              value={searchValue}
              placeholder="Search Your Services"
              style={{
                flex: 1,
                height: 70,
                borderRadius: 24,
              }}
              onChangeText={handleSearchInput}
            />
             <TouchableOpacity style={{position:"absolute",left:330}}  onPress={handleSearchData}>
             <FontAwesomeIcon icon={faPaperPlane} size={20} color="#000"  />
             </TouchableOpacity>
          </View>
          <View
            className="flex-row flex-wrap p-2 rounded-2xl border-gray-100 bg-gray-50 mt-3"
            style={
              isValue
                ? {width: '100%', display: 'block'}
                : {width: '100%', display: 'none'}
            }>
            {isValue ? (
              filteredData?.map((item, index) => (
                <TouchableOpacity key={item?.id} onPress={() => handleSearchValue(item?.name,item?.id)}>
                  <Text
                    key={index}
                    className="flex  p-3 mt-2 rounded-3xl font-semibold text-slate-950 bg-gray-200"
                    style={{marginLeft: 15}}>
                    {item?.name?.toLowerCase()}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text></Text>
            )}
          </View>

          {/* couresel ------ */}
          {/* <View style={{marginTop: 20}}>
            <Carousel
              loop={false}
              width={width}
              height={width / 2}
              autoPlay={false}
              data={[...new Array(1).keys()]}
              scrollAnimationDuration={1000}
              onSnapToItem={index => console.log('current index:', index)}
              renderItem={({index}) => (
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    justifyContent: 'center',
                  }}>
                 
                     <Image source={require('../../assests/images/sonali.png')} width={50}/>
                 
                </View>
              )}
            />
          </View> */}

          <View style={{marginTop: 20}}>
            <Carousel
              loop={true}
              width={width}
              height={width / 2}
              autoPlay={true}
              data={[...new Array(3).keys()]}
              scrollAnimationDuration={1000}
              // onSnapToItem={index => console.log('current index:', index)}
              renderItem={({index}) => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../assests/images/sonali.png')}
                    style={{
                      width: '90%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              )}
            />
          </View>

          {/* coursel */}
          <>
            <View style={{width: '100%'}} className="mt-6">
              <ParentCategories
                data={categories}
                heading="Services We Provide"
                subheading="Popular Service recommendations for you"
              />
            </View>
            <View style={{width: '100%'}} className="">
              <ChildCategories
                data={categories}
                heading="IT & Technology"
                subheading="impeccable services provided by us"
              />
            </View>
            <View style={{width: '100%'}} className="">
              <SecondChildCategories
                data={categories}
                heading="Digital Marketing"
                subheading="impeccable services provided by us"
              />
            </View>
            <View style={{width: '100%',height:30}}>

            </View>
          </>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;
