import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoreAsyncData = async(key,data)=>{
      await AsyncStorage.setItem(key,JSON.stringify(data))
}


export const GetAsyncData = async(key)=>{
    const data = await AsyncStorage.getItem(key)
   
    return data !== null ? JSON.parse(data): null
}

export const RemoveAsyncData = async(key)=>{
    await AsyncStorage.removeItem(key)
}


export const getGrandchildNames = (list) => {
    let grandchildNames = [];
  
    function traverse(node, depth) {
      if (depth === 2 && node.name) {
        grandchildNames.push(node.name);
      } else if (Array.isArray(node.child)) {
        node.child.forEach(child => traverse(child, depth + 1));
      }
    }
  
    list?.forEach(item => traverse(item, 0));
  
    return grandchildNames;
  };
  

// export const getGrandchildNames = (list) => {
//     let grandchildNames = [];
  
//     function traverse(node, depth) {
//       if (depth === 2) {
//         if (node.name) grandchildNames.push(node.name);
//       } else if (node.child) {
//         for (let child of node.child) {
//           traverse(child, depth + 1);
//         }
//       }
//     }
  
//     for (let item of list) {
//       traverse(item, 0);
//     }
  
//     return grandchildNames;
//   };