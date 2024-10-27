import React, {useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {HttpRequest} from '../../data/Httprequest';
import {API} from '../../constants/constant';
import {useNavigation} from '@react-navigation/native';
import {StoreAsyncData} from '../../utils/common';
import {useAuth} from './AuthContext';
import {
  faSolid,
  faBell,
  faBars,
  faPenToSquare,
  faThin,
  faCaretDown,
  faHashtag,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
const LoginPage = () => {
  const [number, setNumber] = useState();
  const navigatation = useNavigation();
  const {login} = useAuth();
  const {height} = Dimensions.get("window")


  console.log(number, 'number----');
  const handleLogin = async () => {
    const response = await HttpRequest({
      url: API.LOGIN,
      method: 'POST',
      params: {
        mobile: number,
        country_code: '91',
        type: 'user',
      },
    });

    if (response) {
      await StoreAsyncData('number', number);
      setTimeout(() => {
        navigatation.navigate('otp', {startTimer: true});
      }, 1000);
      console.log('otp send successfully');
    } else {
      console.log('not work');
    }
  };

  useEffect(() => {
    const unsubscribe = navigatation.addListener('beforeRemove', e => {
      // Prevent back navigation
      if (e.data.action.type === 'GO_BACK' || e.data.action.type === 'POP') {
        e.preventDefault();
        // Alert.alert(
        //   'Are you sure you want to leave this page?',
        //   'You will lose any unsaved changes.',
        //   [
        //     { text: 'Cancel', style: 'cancel', onPress: () => {} },
        //     { text: 'Leave', style: 'destructive', onPress: () => navigatation.dispatch(e.data.action) },
        //   ]
        // );
      }
    });

    return unsubscribe; 
  }, [navigatation]);

  return (
    <View className="flex font-semibold bg-white" style={{height:height}}>
      <Text
        className=" p-7 font-extrabold text-left text-neutral-950 mt-10 "
        style={{fontSize: 30}}>
        Sign in to Continue
      </Text>
      <View
        style={{width: 60, top: -6, left: 35, borderColor: '#6C63FF'}}
        className="border-2"></View>
      <View style={{width: '100%', height: 280}}>
        <LottieView
          source={require('../../assests/images/signup.json')}
          autoPlay
          loop
          style={{width: 350, height: 270}}
        />
      </View>
      <Text
        className=" p-5  text-left  mt-2"
        style={{fontSize: 18,color:"#252525"}}>
        We Will send you One Time Password (OTP) in this Mobile Number{' '}
      </Text>
      <View
        className="rounded-lg"
        style={{width: '85%', marginLeft: 25}}>
        <TextInput
          inputMode="numeric"
          maxLength={10}
          placeholder="Enter Your Number"
          className=" p-4  rounded-lg"
          onChangeText={(text) => setNumber(text)}
          style={{height:51,backgroundColor:"#C4C4C433",fontSize:16}}
        />
        <FontAwesomeIcon icon={faPhone} size={15} style={{top:-35,left:275,}}/>
      </View>
      <TouchableOpacity
        className="rounded-lg "
        style={{width: '85%', marginLeft: 25,height:54,backgroundColor:"#6C63FF"}}
        onPress={handleLogin}>
        <Text className="text-center  p-3 text-white font-semibold" style={{fontSize:18}}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;
