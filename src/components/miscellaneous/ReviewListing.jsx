import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Review from './Review';
import StarRating from 'react-native-star-rating-widget';
import { HttpRequest } from '../../../data/Httprequest';
import { API } from '../../../constants/constant';
import ShowReviewData from './ShowReviewData';
import { GetAsyncData } from '../../../utils/common';

const ReviewListing = ({data, id}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewComment, setReviewComment] = useState('');
  const [starRatingValue, setStarRatingValue] = useState();
  const [getReview,setGetReview] = useState([])
  const [getSingleReview,setGetSingleReview] = useState([])
  const [checkRegistrationId,setCheckRegistrationId] = useState("")

  console.log(reviewComment, 'data in reviewlisting---');

  const starValue = Math.ceil(starRatingValue);
  console.log(starValue, 'starRatingValue---');

  const getReviewData = async()=>{
    const userLocalData = await GetAsyncData('user')
      
    if(userLocalData){
     setCheckRegistrationId(userLocalData?.registration_id)
    }

    const response = await HttpRequest({
        url:API.REVIEWS ,
        method:"GET",
        params:{
            "expert_id" : id
        }
    })

    if(response.data){
        console.log("data get successfully in get review data")
        setGetReview(response.data?.list)
        
    }else{
        console.log("data not get ------ in get review data")
    }
  }


  const getSingleReviewData = async()=>{
    const response = await HttpRequest({
        url:API.REVIEWS +"/"+id,
        method:"GET",
        // params:{
        //     "expert_id" : id
        // }
    })

    if(response.data){
        console.log("data get successfully in get review data")
       setGetSingleReview(response?.data)
    }else{
        console.log("data not get ------ in get review data")
    }
  }

  console.log(getReview,"getreview-----------")

  const handleSubmit = async()=>{
    const response = await HttpRequest({
        url:API.REVIEWS +"/" +id,
        method:"POST",
        params:{
            rating:starRatingValue,
            review:reviewComment
        }
    }) 

    if(response?.data){
        console.log("havedata in reviews")
        setModalVisible(!modalVisible)
        getReviewData()
    }else{
        console.log(" Not have data in reviews")   
        setModalVisible(!modalVisible)
    }
  }

  useEffect(()=>{
    getReviewData()
    getSingleReviewData()
  },[])

  return (
    <View>
      <View className="flex-row justify-between mt-4">
        <View>
          <Text className=" flex-1  font-semibold mt-1 " style={{fontSize:20,color: "#363C45"}}>Review</Text>
        </View>

        {
          id == checkRegistrationId ? 
          <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={(e)=>e.preventDefault()}>
          <Text style={styles.textStyle}>write a review</Text>
        </Pressable>:
        <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>write a review</Text>
      </Pressable>
        }
      </View>
      <View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalView}>
              <View className="flex-row justify-between">
                <StarRating
                  rating={starValue || 0}
                  onChange={text => setStarRatingValue(text)}
                  starSize={25}
                  className="flex-1"
                  // value={reviewComment}
                />
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <Text className="text-2xl font-extrabold ">X</Text>
                </Pressable>
              </View>

              <View>
                <TextInput
                  className="border-2 rounded-xl mt-3 text-xl"
                  style={{width: 300,height:120}}
                  onChangeText={text => setReviewComment(text)}
                  value={getSingleReview.review}
                //   placeholder={getSingleReview.review||"not have "}
                />
              </View>
              <TouchableOpacity className="border-2 rounded-2xl mt-3  p-2 bg-blue-950" onPress={handleSubmit} >
                <Text className="p-2 text-xl font-extrabold text-white" > Submit</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
      {/* show all review data  */}
      <ShowReviewData data={data} id={id} getdata={getReview} />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ReviewListing;
