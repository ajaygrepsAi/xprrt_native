/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
// import { PaperProvider } from 'react-native-paper';
// import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import {name as appName} from './app.json';


// const theme = {
//     ...DefaultTheme,
//     colors: {
//       ...DefaultTheme.colors,
//       primary: 'tomato',
//       secondary: 'yellow',
//     },
//   };

// export default function Main() {

//     return (
//       <PaperProvider theme={theme}>
//         <App />
//       </PaperProvider>
//     );
//   }

AppRegistry.registerComponent(appName, () => App);
