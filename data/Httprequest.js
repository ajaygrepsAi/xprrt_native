import { Alert } from "react-native";
import { API } from "../constants/constant";
import { GetAsyncData } from "../utils/common";
import ToastManager, { Toast } from 'toastify-react-native'
export const HttpRequest = async(data)=>{
    try {
    const {params,url,method} = data
    const token  = await GetAsyncData('token')

    const apipath = API.BASE_URL + API.VERSION + url
    let response 

    const headers= {
        "Content-Type":"application/json",
        Authorization : `Bearer ${token}`
    }


    if(method == "POST" || method == "PUT" || method == "DELETE"){
        response = await fetch(apipath,{
            method,
            headers,
            body:JSON.stringify(params)
        })
    }
    else if(method == "GET"){
        const payload = new URLSearchParams(params)
        response = await fetch(apipath + "?" + payload ,{method,headers})
    }

    const responseObj = await response.json()
    if(!response.ok){
        // Alert.alert(responseObj.message);
        Toast.success(responseObj.message)
        
      } else if (response.ok && method != "GET") {
        // Alert.alert(responseObj.message);
        Toast.error(responseObj.message)
        
      }
      return responseObj;
        
    } catch (error) {
        // Toast.error(error.message)
        console.log(error.message)
    }
}

