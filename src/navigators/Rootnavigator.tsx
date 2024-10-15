import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import TabsNavigator, {TabsStackParamsList} from './TabsNavigator';
import DetailsScreen from '../screens/DetailsScreen';
import {NavigatorScreenParams} from '@react-navigation/native';
import {MasonryListItem} from '../data/Collections';

export type RootStackParamsList = {
  TabsStack: NavigatorScreenParams<TabsStackParamsList>;
  Details: {item: MasonryListItem};
};

const RootStack = createNativeStackNavigator<RootStackParamsList>();

export type RootStackScreenProps<T extends keyof RootStackParamsList> =
  NativeStackScreenProps<RootStackParamsList, T>;

const RootNavigator = () => {

  
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="TabsStack"
        component={TabsNavigator}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
