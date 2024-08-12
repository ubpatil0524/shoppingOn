import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {CompositeScreenProps} from '@react-navigation/native';
import {RootStackScreenProps} from './Rootnavigator';

export type TabsStackParamsList = {
  Home: undefined;
  Cart: undefined;
  Payment: undefined;
  Profile: undefined;
};

const TabsStack = createBottomTabNavigator<TabsStackParamsList>();

export type TabsStackScreenProps<T extends keyof TabsStackParamsList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamsList, T>,
    RootStackScreenProps<'TabsStack'>
  >;

const TabsNavigator = () => {
  return (
    <TabsStack.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Cart':
              iconName = 'shopping-cart';
              break;
            case 'Payment':
              iconName = 'payment';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'home';
              break;
          }
          return <Icons name={iconName} size={28} color={color} />;
        },
      })}>
      <TabsStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <TabsStack.Screen
        name="Cart"
        component={CartScreen}
        options={{headerShown: false}}
      />
      <TabsStack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{headerShown: false}}
      />
      <TabsStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </TabsStack.Navigator>
  );
};

export default TabsNavigator;
