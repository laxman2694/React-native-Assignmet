import {Easing,Animated} from 'react-native'
import { createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import Posts from "./Screens/Posts";
import JsonData from './Screens/Posts/JSONObj';
import Asteroid from './Screens/Nasa';
import PostList from './Screens/WooPosts/PostListing.js';
import JSONDetails from './Screens/WooPosts/JsonDetails';
import lazyloading from "./Screens/Posts/lazyloading";
import HomeScreen  from "./Screens/HomeScreen/HomeScreen";
import Details from "./Screens/DetailsScreen/DetailsScreen";
const ModalNavigator = createStackNavigator(
  {
    HomeScreen: {screen:HomeScreen},
    Details: {screen: Details},
   Posts:{screen: Posts},
   PostList: {screen:PostList},
   JSONDetails: {screen:JSONDetails},
   Asteroid: {screen:Asteroid},
   Posts:{screen: Posts},
   JsonData: {screen: JsonData},
   
  },
  {
    headerMode: 'none',
    mode: 'modal',
    //initialRouteName:'Asteroid',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  }
);

const AppContainer = createAppContainer(
  ModalNavigator
  )
  
  export default AppContainer;