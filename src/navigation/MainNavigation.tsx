import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainNavigation, ScreenNames} from './ScreenNamenType';
import ListingScreen from '../screens/ListingScreen';
import DetailScreen from '../screens/DetailScreen';

const MainStack = createNativeStackNavigator<MainNavigation>();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      initialRouteName={ScreenNames.ListingScreen}
      screenOptions={{
        headerShown: false,
        headerTintColor: '#fff',
        headerStyle: {backgroundColor: '#fff'},
      }}>
      <MainStack.Screen
        name={ScreenNames.ListingScreen}
        component={ListingScreen}
      />
      <MainStack.Screen
        name={ScreenNames.DetailScreen}
        component={DetailScreen}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
