import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsNavigator from './TabsNavigator'; 
import DetailsScreen from '../screens/DetailsScreen'; 

export type RootStackParamsList = {
    TabsStack: undefined;
    Details: undefined;
}

const RootStack = createNativeStackNavigator<RootStackParamsList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="TabsStack" component={TabsNavigator} options={{headerShown: false}} />
      <RootStack.Screen name="Details" component={DetailsScreen} options={{headerShown: false}} />
    </RootStack.Navigator>
  );
}

export default RootNavigator;
