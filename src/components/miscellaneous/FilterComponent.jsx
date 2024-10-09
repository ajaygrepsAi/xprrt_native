import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {Slider} from 'react-native-awesome-slider';
import {Picker} from '@react-native-picker/picker';
import {GetAsyncData} from '../../../utils/common';
import CheckBox from '@react-native-community/checkbox';
const FilterComponent = ({
  stateValue,
  setStateValue,
  genderValue,
  setGenderValue,
  languageValue,
  setLanguageValue,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  categoryValue,
  setCategoryValue,
  userdata,
  selectedId, setSelectedId
}) => {
  const progress = useSharedValue(30);
  const min = useSharedValue(0);
  const max = useSharedValue(20);
  const [userData, setUserdata] = useState([]);
 

  // console.log("userdata---value in filter category -h---",userData?.professional?.main_category)

  const [categoryData, setCategoyData] = useState([]);
  const [isSelected, setSelection] = useState(false);

  const fetchCategory = async () => {
    const category = await GetAsyncData('categories');
    const userdata = await GetAsyncData('user');
    if (category) {
      setCategoyData(category?.list);
      setUserdata(userdata);
    }

    if (userdata) {
      setCategoryValue(userData?.professional?.main_category);
    }
  };

  const handleCheckboxToggle = itemId => {
    if (selectedId.includes(itemId)) {
      setSelectedId(prevIds => prevIds.filter(id => id !== itemId)); // Deselect if already selected
    } else {
      setSelectedId(prevIds => [...prevIds, itemId]); // Select if not already selected
    }
  };

  const childCategory = categoryData.filter(
    item => item.name === categoryValue,
  );
  const childHeaders = childCategory[0]?.child?.map(item => item.name);

  // console.log('category----', childHeaders);
  console.log(selectedId, 'selectedid----');

  const handleBox = (e) => {
    setSelection(true);
    setCategoryValue(e)
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <View className="p-2">
      <View
        className="relative rounded-xl bg-slate-50"
        style={{width: '100%', height: 60}}>
        {
          isSelected ? <Text style={{position: 'absolute', left: 330, top: 13, zIndex: 1}} className="text-lg font-semibold text-red-900" onPress={()=>setSelection(!isSelected)}>
          X
        </Text>:<></>
        }

        <Picker
          mode="dropdown"
          selectedValue={categoryValue}
          onValueChange={handleBox}
          // onFocus={handleBox}
          style={{height: 50, width: '100%', zIndex: 0, paddingLeft: 30}}>
          {categoryData.map((item, index) => (
            <Picker.Item label={item.name} value={item.name} key={item.id} />
          ))}
        </Picker>
      </View>

      {isSelected && categoryValue ? (
        childCategory[0]?.child?.map((item, index) =>
          item.child.map((item, index) => (
            <View>
              <View style={styles.container}>
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    value={selectedId.includes(item.id)}
                    onValueChange={() => handleCheckboxToggle(item.id)}
                    style={styles.checkbox}
                    key={item.id}
                  />
                  <Text style={styles.label}>{item.name}</Text>
                </View>
              </View>
            </View>
          )),
        )
      ) : (
        <Text></Text>
      )}

      <View className="flex-row justify-between mt-3">
        <View
          style={{width: '35%', height: '100%'}}
          className=" rounded-xl bg-gray-50">
          <TextInput
            className="text-lg p-2 "
            onChangeText={e => setStateValue(e)}
            placeholder="City"
          />
        </View>
        <View className=" rounded-xl bg-gray-50" style={{width: '40%'}}>
          <Picker
            selectedValue={genderValue}
            onValueChange={e => setGenderValue(e)}
            style={{height: 50, width: '100%'}}>
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value=" " />
          </Picker>
        </View>
      </View>

      <View
        className=" rounded-xl bg-slate-50 mt-3"
        style={{width: '100%', height: 60}}>
        <Picker
          selectedValue={languageValue}
          onValueChange={e => setLanguageValue(e)}
          style={{height: 50, width: '100%'}}>
          <Picker.Item label="Select Language" value="" />
          <Picker.Item label="Hindi" value="hindi" />
          <Picker.Item label="English" value="english" />
          <Picker.Item label="Other" value=" " />
        </Picker>
      </View>
      <View style={{height: 30}} className="mt-5">
        <Text className="text-lg text-slate-950">Exp</Text>
        <Slider
          style={{height: 30, width: '80%', marginTop: 15}}
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          onValueChange={value => setMaxValue(value)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});

export default FilterComponent;
