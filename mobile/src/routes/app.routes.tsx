import { Platform } from 'react-native';
import { useTheme } from 'native-base';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { PlusCircle, SoccerBall } from 'phosphor-react-native';

import { New } from '../screens/New';
import { PollsStack } from './pools.routes';

type BottomTabParamList = {
  new: undefined;
  poolsStack: undefined;
}

export type AppNavigationProp = BottomTabNavigationProp<BottomTabParamList>;

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();

export function AppRoutes() {

  const { colors, sizes, fontSizes } = useTheme();

  const size = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
          height: Platform.OS === 'android' ? sizes[18] : sizes[22]
        },
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: {
          position: 'relative',
          top: Platform.OS === 'ios' ? -10 : 0,
        },
        tabBarLabelStyle: {
          fontSize: fontSizes.md,
        },
        unmountOnBlur: true
      }}
    >
      <Screen
        name='new'
        component={New}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />,
          tabBarLabel: 'Novo bolão',
        }}
      />
      <Screen
        name='poolsStack'
        component={PollsStack}
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
          tabBarLabel: 'Meus bolões',
          // tabBarBadge: 4
        }}
      />
    </Navigator>
  );
}
