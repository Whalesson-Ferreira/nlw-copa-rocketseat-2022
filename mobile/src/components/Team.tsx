import { HStack } from 'native-base';
import CountryFlag from 'react-native-country-flag';

import { Input } from './Input';

interface Props {
  code: string;
  position: 'left' | 'right';
  onChangeText: (value: string) => void;
  points: string;
  isReadOnly: boolean;
}

export function Team({ code, position, points, onChangeText, isReadOnly }: Props) {
  return (
    <HStack alignItems="center">
      {position === 'left' && <CountryFlag isoCode={code} size={25} style={{ marginRight: 12 }} />}

      <Input
        w={10}
        h={9}
        px={3}
        textAlign="center"
        fontSize="xs"
        keyboardType="numeric"
        onChangeText={onChangeText}
        value={points}
        isReadOnly={isReadOnly}
      />

      {position === 'right' && <CountryFlag isoCode={code} size={25} style={{ marginLeft: 12 }} />}
    </HStack>
  );
}
