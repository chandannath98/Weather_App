import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../src/screens/Home';
import WeatherTimelineScreen from '../src/screens/WeatherTimelineScreen';


const Stack = createStackNavigator();


export default function Router() {
    return (
      <NavigationContainer>
      <Stack.Navigator>


      <Stack.Screen name="Home" component={Home} options={{
        headerShown:false                
        }} />

      <Stack.Screen name="WeatherTimelineScreen" component={WeatherTimelineScreen} options={{
        headerShown:false                
        }} />



        </Stack.Navigator>
        </NavigationContainer>
    )}


