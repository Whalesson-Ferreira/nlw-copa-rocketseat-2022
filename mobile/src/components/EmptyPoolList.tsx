import { useNavigation } from '@react-navigation/native';
import { Row, Text, Pressable } from 'native-base';

import { PoolsNavigationProp } from '../routes/pools.routes';

export function EmptyPoolList() {
  const navigation = useNavigation<PoolsNavigationProp>();

  return (
    <Row flexWrap="wrap" justifyContent="center">
      <Text color="white" fontSize="sm" textAlign="center">
        Você ainda não está participando de {'\n'} nenhum bolão, que tal
      </Text>

      <Pressable onPress={() => navigation.navigate('find')}>
        <Text textDecorationLine="underline" color="yellow.500" textDecoration="underline">
          buscar um por código
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center" mx={1}>
        ou
      </Text>

      <Pressable onPress={() => navigation.jumpTo('new')}>
        <Text textDecorationLine="underline" color="yellow.500">
          criar um novo
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center">
        ?
      </Text>
    </Row>
  );
}
