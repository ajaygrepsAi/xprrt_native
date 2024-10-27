import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Pressable, Dimensions,Alert} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {HttpRequest} from '../../data/Httprequest';
import {API, DEVICE} from '../../constants/constant';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {
  GetAsyncData,
  RemoveAsyncData,
  StoreAsyncData,
} from '../../utils/common';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAuth} from './AuthContext';
const OTPpage = () => {
  const [otpValue, setOtpValue] = useState();
  const [getNumber, setGetNumber] = useState();
  const [countStart,setCountStart] = useState(false)
  const [timerKey, setTimerKey] = useState(0);
  console.log(otpValue, 'otpValue-------');
  const {login} = useAuth();
  const router = useRoute()
  const {height} = Dimensions.get("window")
  const navigation = useNavigation();

  const fetchCategoriesData = async () => {
    try {
      const response = await HttpRequest({
        url: API.CATEGORY,
        method: 'GET',
      });

      if (response && response?.data) {
        // console.log('response----data----in categories----', response?.data);
        await StoreAsyncData('categories', response?.data);
        // setCategories(response?.data);
        
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchUserData = async () => {
    const response = await HttpRequest({
      url: API.PROFILE,
      method: 'GET',
    });

    if (response && response?.data) {
      console.log(
        'response value of api---profile--message--',
        response.message,
      );
      fetchCategoriesData()
      await StoreAsyncData('user', response?.data);
      setTimeout(()=>{
        if (response?.data.categories && response?.data.categories.length > 0) {
          navigation.replace('home');
          console.log(' have any value data ');
        } else {
          navigation.replace('onboardxprrt');
          console.log('not have any value ');
        }
        console.log(
          'response value of api---profile- response?.data---',
          response?.data,
        );
      },1000)
    } else {
      console.log('not have any user profile dat value ');
    }
  };

  const handleVerify = async () => {
    const response = await HttpRequest({
      url: API.VERIFY,
      method: 'POST',
      params: {
        mobile: getNumber,
        otp: otpValue,
        device_id: '',
        device_type: DEVICE.WEB,
      },
    });

    if (response) {
      console.log('response -----otp have value ', response.message);
      await StoreAsyncData('token', response?.data?.token);
      await login(response?.data?.token);
      fetchUserData();
      // navigation.navigate("personal")
    } else {
      console.log(
        'response -not have error ----otp have value ',
        response.message,
      );
    }
  };

  const reSendOtp = async () => {
    try {
      const response = await HttpRequest({
        url: API.LOGIN,
        method: 'POST',
        params: {
          mobile: getNumber,
          country_code: '91',
          type: 'user',
        },
      });
      if (response) {
        console.log('otp send successfully');
        setCountStart(true)
        setTimerKey(prevKey => prevKey + 1);
      } else {
        console.log('otp not send ');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const findNumberData = async () => {
      const number = await GetAsyncData('number');
      if (number) {
        console.log('number-----value ', number);
        setGetNumber(number);
      } else {
        console.log('not have any number-----value  ');
      }
    };

    findNumberData();


    if(router?.params?.startTimer){
      setCountStart(true)
    }
  }, []);

 
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      
      if (e.data.action.type === 'GO_BACK' || e.data.action.type === 'POP') {
        e.preventDefault();
        // Alert.alert(
        //   'Are you sure you want to leave this page?',
        //   'You will lose any unsaved changes.',
        //   [
        //     { text: 'Cancel', style: 'cancel', onPress: () => {} },
        //     { 
        //       text: 'Leave', 
        //       style: 'destructive', 
        //       onPress: () => navigation.dispatch(e.data.action) 
        //     },
        //   ]
        // );
      }
    });
  
    return unsubscribe; 
  }, [navigation]);

  

  return (
    <View className="flex font-semibold bg-white" style={{height:height}}>
      <Text  className=" p-5 font-extrabold text-left text-neutral-950 mt-10 "
        style={{fontSize: 30}}>
        OTP Verification
      </Text>
      <View
        style={{width: 60, top: -6, left: 25, borderColor: '#6C63FF'}}
        className="border-2"></View>
      <Text className=" font-semibold  p-5" style={{fontSize:15}}>
        Please enter the 4-digit code sent to your number <Text className="text-slate-800">+91{getNumber}</Text>  for verifcation
      </Text>

      <View className="flex-row justify-center">
       <View>
     {
      countStart ? 
      <CountdownCircleTimer
      key={timerKey} 
      className="ms-1"
      isPlaying
      duration={120}
      colors={['#004777', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[7, 5, 2, 0]}
      size={100}>
      {({remainingTime}) => <>

      <View>
        <Text className="text-red-600 " style={{fontSize:10,marginLeft:1}} >Remaining</Text>
        <Text className="text-lg font-semibold text-green-900 ms-3" style={{marginLeft:16}}>{remainingTime}</Text>
        <Text className="text-red-600" style={{marginLeft:6,fontSize:10}}>Seconds</Text>
      </View>
     
      </>} 
    </CountdownCircleTimer> : <></>
     }
       </View>
      </View>

      <View
        className="flex justify-center items-center"
        style={{width: 300, height: 250, marginLeft: 40,top:-50}}>
        <OtpInput numberOfDigits={4} onTextChange={text => setOtpValue(text)} />
      </View>

      <TouchableOpacity
        className="rounded-lg "
        style={{width: '85%', marginLeft: 35,height:54,backgroundColor:"#6C63FF",top:-110}}
        onPress={handleVerify}>
        <Text className="p-3  font-bold text-center text-white" style={{fontSize:18}}>
          Verify
        </Text>
      </TouchableOpacity>
      <View className="flex-row justify-around">

        <TouchableOpacity onPress={reSendOtp} className="p-3" style={{top:-100,left:-10}}>
          <Text className="font-semibold " > Didnt receive any code? Resend otp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPpage;






 {/* {
            isPlaying ? <>
            <View>
            <Text className="text-red-600">Remaining</Text>
            <Text className="text-lg font-semibold text-green-900 ms-3" style={{marginLeft:18}}>{remainingTime}</Text>
            <Text className="text-red-600" style={{marginLeft:6}}>Seconds</Text>
          </View>
          
          </> : <>
          <View>
            <Text>To Late</Text>
          </View>
          </>
          } */}




           // useEffect(() => {
  //   const unsubscribe = navigation.addListener('beforeRemove', (e) => {
  //     if (e.data.action.type === 'POP' && e.data.stateKey === 'OtpScreen') {
  //       e.preventDefault(); // Prevent going back
  //     }
  //   });

  //   return unsubscribe; // Correctly returning the unsubscribe function
  // }, [navigation]);