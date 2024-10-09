module.exports = {
  presets: ['module:@react-native/babel-preset'],
  
   plugins: [
    "nativewind/babel",
    'react-native-reanimated/plugin',
  ],
};



// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   env: {
//     production: {
//       plugins: ['react-native-paper/babel'],
//     },
//   },
// };