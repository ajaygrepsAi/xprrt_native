import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {GetAsyncData} from '../../utils/common';
import {HttpRequest} from '../../data/Httprequest';
import {API} from '../../constants/constant';

import UserCard from './miscellaneous/UserCard';
import FilterComponent from './miscellaneous/FilterComponent';

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

  const fetchApiData = async () => {
    let queryParams = {
      page: 0,
      state: stateValue,
      gender: genderValue,
      min_exp: minValue,
      max_exp: exp_max,
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

  useEffect(() => {
    fetchApiData();
  }, [stateValue, genderValue, languageValue, maxValue, selectedId]);

  const exp_max = Math.ceil(maxValue);

  console.log(stateValue, 'stateValue-----');
  console.log(genderValue, 'genderValue----');
  console.log(languageValue, 'genderValue----');
  console.log(categoryValue, 'genderValue----');
  //   console.log(maxValue,"maxvalue")
  console.log(exp_max, 'minvalue');

  const handleReset = () => {
    setGenderValue('');
    setStateValue('');
    setLanguageValue('');
    setMaxValue(20);
    setMinValue(0);
    setSelectedId([]);
  };

  return (
    <ScrollView>
      <View className="bg-purple-100">
        <View className="mt-8">
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
        </View>
        <View className="mt-4 p-2">
          <TouchableOpacity
            className="bg-slate-950 rounded-3xl"
            onPress={handleReset}>
            <Text className=" p-2 text-center text-white text-xl font-extrabold">
              Reset
            </Text>
          </TouchableOpacity>
        </View>
        {Array.isArray(userData) && userData.length > 0 ? (
          <FlatList
            data={userData}
            keyExtractor={item => item.id}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <UserCard item={item} />}
          />
        ) : (
          <>
            <View>
              <Text>Not have any value </Text>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default ListingCategories;
 