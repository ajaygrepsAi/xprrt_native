import React from 'react';
import {Dimensions, View} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native';
import { StoreAsyncData } from '../../utils/common';

const OnboardingPage = () => {
    const {width,height} =  Dimensions.get("window")

    const navigation = useNavigation()
  const  handleDone = async()=>{

    await StoreAsyncData("onboarded","1")
    navigation.navigate("login")
  }

  const  handleSkip = ()=>{
    navigation.navigate("login")
  }

  return (
    <View style={{width:"100%",height:"100%"}}>
      <Onboarding
      onDone={handleDone}
      onSkip={handleSkip}
      containerStyles={{paddingHrizontal:15}}
        pages={[
          {
            backgroundColor: '#CD5C5C',
            image: <LottieView source={require('../../assests/images/signup.json')} autoPlay loop  style={{width:width * 0.8,height:height * 0.4}}/>  ,
            title: 'XPRRT | Premier Digital Solutions for Your Business Needs',
            subtitle: 'Discover XPRRT, your go-to partner for top-tier digital solutions. From innovative design to cutting-edge tech, we deliver results that drive success.',
          },
          {
            backgroundColor: '#ebe1ab',
            image: <LottieView source={require('../../assests/images/expert.json')} autoPlay loop  style={{width:width * 0.8,height:height * 0.4}}/>  ,
            title: 'XPRRT | Premier Digital Solutions for Your Business Needs',
            subtitle: 'Discover XPRRT, your go-to partner for top-tier digital solutions. From innovative design to cutting-edge tech, we deliver results that drive success.',
          },
          {
            backgroundColor: '#273746',
            image: <LottieView source={require('../../assests/images/expertlottie.json')} autoPlay loop  style={{width:width * 0.8,height:height * 0.4}}/>  ,
            title: 'XPRRT | Premier Digital Solutions for Your Business Needs',
            subtitle: 'Discover XPRRT, your go-to partner for top-tier digital solutions. From innovative design to cutting-edge tech, we deliver results that drive success.',
          },
          {
            backgroundColor: '#baabeb',
            image: <LottieView source={require('../../assests/images/LottieFile.json')} autoPlay loop  style={{width:width * 0.8,height:height * 0.4}}/>  ,
            title: 'XPRRT | Premier Digital Solutions for Your Business Needs',
            subtitle: 'Discover XPRRT, your go-to partner for top-tier digital solutions. From innovative design to cutting-edge tech, we deliver results that drive success.',
          },
       
        ]}
      />
    </View>
  );
};

export default OnboardingPage;
