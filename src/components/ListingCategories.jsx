import React, {useCallback, useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput,
  Image,
  Dimensions
} from 'react-native';
import {GetAsyncData} from '../../utils/common';
import {HttpRequest} from '../../data/Httprequest';
import {API} from '../../constants/constant';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import UserCard from './miscellaneous/UserCard';
import FilterComponent from './miscellaneous/FilterComponent';
import Modal from 'react-native-modal';
import {
  faSolid,
  faBell,
  faBars,
  faPenToSquare,
  faThin,
  faCaretDown,
  faList,
  faLocationDot,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { LazyloadScrollView, LazyloadImage } from 'react-native-lazyload';
import { useNavigation, useRoute,useFocusEffect } from '@react-navigation/native';



const ListingCategories = () => {
  const [userData, setUserdata] = useState([]);
  const [haveValue, setHaveValue] = useState(false);

  const [stateValue, setStateValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [languageValue, setLanguageValue] = useState('');
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(20);
  const [categoryValue, setCategoryValue] = useState('');
  const [selectedId, setSelectedId] = useState([]);
  const [colorChange, setColorChange] = useState(false);
  const [selectedGenderIndex, setSelectedGenderIndex] = useState(null);
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [range, setRange] = useState([0, 30]);
  const [searchTerm, setSearchTerm] = useState("")
  const [isResetting, setIsResetting] = useState(false);
  const route = useRoute()
  const navigation = useNavigation()

  // navigation.goBack(isResetting(true))

 

  const SearchName = route?.params?.searchName
  const SearchID = route?.params?.searchId

  console.log(SearchName,"route.params.searchName")
  console.log(SearchID,"route.params.searchId")
  const {width,height} = Dimensions.get('window')
  
  const handleValuesChange = (values) => {
    console.log(values,"values in handleValuesChange ")
    setRange(values);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const GenderData = ['female', 'male', 'other'];
  const LanguageData = ['english', 'hindi', 'other'];
  const images = [
    { id: '1', uri: 'https://example.com/image1.jpg' },
    { id: '2', uri: 'https://example.com/image2.jpg' },
  ];

  const fetchApiData = async () => {
    let queryParams = {
      page: 0,
      state: stateValue,
      gender: genderValue,
      min_exp: range[0],
      max_exp: range[1],
      language: languageValue,
      limit: 16,
    };

    if (selectedId.length > 0) {
      queryParams['categories[]'] = selectedId;
    }

    const response = await HttpRequest({
      url: API.USERS,
      method: 'GET',
      params: queryParams,
    });

    if (response?.data && response?.data?.list.length > 0) {
      setUserdata(response?.data?.list);
      setHaveValue(true);
    } else {
      setUserdata([]);
      setHaveValue(false);
    }
  };

  useEffect( () => {
       fetchApiData() 
  }, [selectedId]);

  const handleSubmit = async()=>{
    await fetchApiData()
    setModalVisible(!isModalVisible);
  }

  // const exp_max = Math.ceil(maxValue);

  console.log(stateValue, 'stateValue-----');
  console.log(genderValue, 'genderValue----');
  console.log(languageValue, 'genderValue----');
  console.log(categoryValue, 'genderValue----');
  //   console.log(maxValue,"maxvalue")
  // console.log(exp_max, 'minvalue');

  const handleReset = () => {
      setGenderValue('');
      setStateValue('');
      setLanguageValue('');
      setRange([0, 30]);
      setSelectedId([]);
      setIsResetting(true);
  };

  const handleGenderValue = (item, index) => {
    console.log(item, 'iten--value', index, 'index');
    setGenderValue(item);
    // setColorChange(true)
    setSelectedGenderIndex(index);
  };

  const handleLanguageValue = (item, index) => {
    console.log(item, 'iten--value', index, 'index');
    setLanguageValue(item);
    // setColorChange(true)
    setSelectedLanguageIndex(index);
  };

  const handleDebouncedSearch = useCallback((text) => {
    setSearchTerm(text);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setStateValue(searchTerm);
    }, 1500); 

    return () => {
      clearTimeout(handler); 
    };
  }, [searchTerm]);


  console.log(searchTerm,"searchTerm")

  const handleModalValueClear = ()=>{
    handleReset();
    setModalVisible(false);
    
    
  }

  useEffect(() => {
    if (isResetting) {
      if (
        genderValue === '' &&
        stateValue === '' &&
        languageValue === '' &&
        range[0] === 0 &&
        range[1] === 30 &&
        selectedId.length === 0
      ) {
        fetchApiData();
        setIsResetting(false);
      }
    }
  }, [isResetting]);


  console.log(stateValue,"statevalue ")

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="bg-white"   >
        <View className="mt-5 flex-row " >
          <FilterComponent
            stateValue={stateValue}
            setStateValue={setStateValue}
            genderValue={genderValue}
            setGenderValue={setGenderValue}
            languageValue={languageValue}
            setLanguageValue={setLanguageValue}
            minValue={minValue}
            setMinValue={setMinValue}
            maxValue={maxValue}
            setMaxValue={setMaxValue}
            categoryValue={categoryValue}
            setCategoryValue={setCategoryValue}
            userdata={userData}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
          {/* <View>
          <Text>ajay</Text>
        </View> */}

          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="-mt-4">
            {/* <Button title="Show Modal" onPress={toggleModal} /> */}
            <TouchableOpacity
              onPress={toggleModal}
              style={{
                backgroundColor: '#6C63FF',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
                height: 60,
                width: 60,
                left: -15,
                top: -2,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}></Text>
              <FontAwesomeIcon
                icon={faList}
                size={15}
                style={{
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  backgroundColor: 'white',
                }}
              />
            </TouchableOpacity>

            <Modal
              isVisible={isModalVisible}
              onBackdropPress={toggleModal}
              animationIn="slideInUp"
              animationOut="slideOutDown">
              <View>
                <View
                  style={{
                    backgroundColor: 'white',

                    padding: 20,
                    borderRadius: 10,
                    // alignItems: 'center',
                  }}>
                  
                    <TouchableOpacity onPress={toggleModal} className="self-end ">
                      <FontAwesomeIcon icon={faXmark} size={28} />
                    </TouchableOpacity>
                  <Text className="mt-6">Select Experience you need</Text>
                  <View className="mt-2 flex-row justify-between">
                    <Text style={{fontSize: 20, color: '#363C45'}}>
                      Experience
                    </Text>
                    <Text style={{fontSize: 18, color: '#6C63FF'}}>
                      Min:{range[0]}Yrs| Max:{range[1]}Yrs
                    </Text>
                  </View>
                  <MultiSlider
                    values={range}
                    onValuesChangeFinish={handleValuesChange}
                    min={0}
                    max={30}
                    step={1}
                    sliderLength={280}
                    selectedStyle={{backgroundColor: '#6C63FF'}}
                    unselectedStyle={{backgroundColor: '#d3d3d3'}}
                    trackStyle={{height: 6}}
                    markerStyle={{
                      backgroundColor: '#6C63FF',
                      height: 20,
                      width: 20,
                    }}
                  />
                  <Text>Select Gender</Text>
                  <View className="flex-row justify-between">
                    <Text style={{fontSize: 20, color: '#363C45'}}>Gender</Text>
                    <Text style={{fontSize: 18, color: '#6C63FF'}}>
                      {genderValue
                        ? genderValue?.charAt(0).toUpperCase() +
                          genderValue?.slice(1)
                        : 'Male'}
                    </Text>
                  </View>

                  <View className="flex-row  mt-3  justify-between">
                    {Array.from(GenderData).map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        className={`p-2 border-2 rounded-lg ${
                          selectedGenderIndex == index
                            ? 'bg-blue-800'
                            : 'bg-white'
                        } `}
                        style={{
                          height: 40,
                          width: 75,
                          fontSize: 18,
                          borderColor: '#BEC2C7',
                        }}
                        onPress={() => handleGenderValue(item, index)}>
                        <Text
                          style={{fontSize: 14}}
                          className={`text-center  ${
                            selectedGenderIndex == index
                              ? 'text-white'
                              : 'text-slate-900'
                          }`}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text className="mt-5">
                    Select the language you’re comfortable with.
                  </Text>
                  <View className="flex-row justify-between">
                    <Text style={{fontSize: 20, color: '#363C45'}}>
                      Language
                    </Text>
                    <Text style={{fontSize: 18, color: '#6C63FF'}}>
                      {languageValue
                        ? languageValue?.charAt(0).toUpperCase() +
                          languageValue?.slice(1)
                        : 'English'}
                    </Text>
                  </View>

                  <View className="flex-row  mt-2  justify-between">
                    {Array.from(LanguageData).map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        className={`p-2 border-2 rounded-lg ${
                          selectedLanguageIndex == index
                            ? 'bg-blue-800'
                            : 'bg-white'
                        } `}
                        style={{
                          height: 40,
                          width: 75,
                          fontSize: 18,
                          borderColor: '#BEC2C7',
                        }}
                        onPress={() => handleLanguageValue(item, index)}>
                        <Text
                          style={{fontSize: 14}}
                          className={`text-center  ${
                            selectedLanguageIndex == index
                              ? 'text-white'
                              : 'text-slate-900'
                          }`}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text className="mt-5">Select Suitable Location</Text>
                  <View className="flex-row justify-between">
                    <Text style={{fontSize: 20, color: '#363C45'}}>
                      Location
                    </Text>
                    <Text style={{fontSize: 18, color: '#6C63FF'}}>
                      {languageValue
                        ? languageValue?.charAt(0).toUpperCase() +
                          languageValue?.slice(1)
                        : 'Delhi'}
                    </Text>
                  </View>

                  <View className="mt-4 relative">
                    <TextInput
                      placeholder="Enter Location"
                      style={{
                        height: 45,
                        width: '100%',
                        borderColor: '#BEC2C7',
                        fontSize: 16,
                        paddingLeft: 35,
                      }}
                      onChangeText={handleDebouncedSearch}
                      className="bg-white border-2 rounded-lg p-3"
                    />
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      size={18}
                      style={{
                        position: 'absolute',
                        left: 10,
                        top: 14,
                        color: '#BEC2C7',
                      }}
                    />
                  </View>

                  <TouchableOpacity className="border-2 flex justify-center mt-8 rounded-lg" style={{height:50,backgroundColor:"#000000"}} onPress={handleSubmit}>
                    <Text className="text-center text-white" style={{fontSize:17}}>Submit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleModalValueClear}>
                  <Text style={{fontSize: 14, color: '#363C45'}} className="mt-4 text-center">
                      Clear all
                    </Text>
                  </TouchableOpacity>

                  
                </View>
              </View>
            </Modal>
          </View>
        </View>

        {/* <View className="mt-4 p-2">
          <TouchableOpacity
            className="bg-slate-950 rounded-3xl"
            onPress={handleReset}>
            <Text className=" p-2 text-center text-white text-xl font-extrabold">
              Reset
            </Text>
          </TouchableOpacity>
        </View> */}

        {/* <View className="flex-row justify-evenly flex-wrap ">
          {
            SearchName?.map((item)=>(
              <View style={{height:26 ,backgroundColor:"#F1F1F1"}} className="p-2 rounded-lg ">
                <Text style={{fontSize:13,color:"#888888"}} className="">{item}</Text>
              </View>
            ))
          }
        </View> */}
        {/* <View className="flex-row flex-wrap">
  {SearchName.length > 1 ? (
SearchName?.map((item, index) => (
  <View
    key={index}
    style={{
      backgroundColor: "#F1F1F1",
      paddingVertical: 4,
      paddingHorizontal: 6,
      borderRadius: 4,
      
      margin: 2, // Added margin to separate items
      flexBasis: "30%", // Allows two items per row on small screens
    }}
  >
    <Text style={{ fontSize: 13, color: "#888888" }}>{item}</Text>
  </View>
))
  ):
  <>
  <View
    // key={index}
    style={{
      backgroundColor: "#F1F1F1",
      paddingVertical: 6,
      paddingHorizontal: 25,
      borderRadius: 4,
      
      margin: 2, 
      // flexBasis: "30%", 
    }}
  >
    <Text style={{ fontSize: 13, color: "#888888" }}>{SearchName}</Text>
  </View>
  </>
  
  }
</View> */}


<View className="flex-row flex-wrap  p-1 ">
      {Array.isArray(SearchName) && SearchName.length > 1 ? (
        SearchName.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#F1F1F1",
              paddingVertical: 4,
              paddingHorizontal: 6,
              borderRadius: 4,
              margin: 2,
              flexBasis: "30%",
            }}
          >
            <Text style={{ fontSize: 13, color: "#888888" }}>{item}</Text>
          </View>
        ))
      ) : SearchName ? (
        <View
          style={{
            backgroundColor: "#F1F1F1",
            paddingVertical: 6,
            paddingHorizontal: 25,
            borderRadius: 4,
            margin: 2,
          }}
        >
          <Text style={{ fontSize: 13, color: "#888888" }}>{SearchName}</Text>
        </View>
      ) : null}
    </View>


        {Array.isArray(userData) && userData.length > 0 ? (
         <View className="mt-4">
          <Text className="font-semibold" style={{marginLeft:12,fontSize:17,color:"#424242"}}>Here’s a result</Text>
           <FlatList
            data={userData}
            keyExtractor={item => item.id}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <UserCard item={item} />}
          />
         </View>
        ) : (
          <>
            {/* <View>
              <Text>Not have any value </Text>
            </View> */}
            <View style={{width: '100%', height:height}} className="">
        <LottieView
          source={require('../../assests/images/error.json')}
          autoPlay
          loop
          style={{width: 350, height: 270,top:90,left:15}}
        />
      </View>
          </>
        )}
      </View>
      <View className="mt-14"></View>
    </ScrollView>


   
  );
};

export default ListingCategories;
