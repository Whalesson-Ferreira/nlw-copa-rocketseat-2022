import { Box } from 'native-base';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppNavigationProp } from '../routes/app.routes';

import { Pools } from '../screens/Pools';
import { Find } from '../screens/Find';
import { Details } from '../screens/Details';

type PollsStackParamList = {
  pools: undefined;
  find: undefined;
  details: {
    id: string;
  };
}

export type PoolsNavigationProp = NativeStackNavigationProp<PollsStackParamList> & AppNavigationProp;

const { Navigator, Screen } = createNativeStackNavigator<PollsStackParamList>();

export function PollsStack() {
  return (
    <Box flex={1} bg='gray.900'>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen
          name='pools'
          component={Pools}
        />
        <Screen
          name='find'
          component={Find}
        />
        <Screen
          name='details'
          component={Details}
        />
      </Navigator>
    </Box>
  );
}
