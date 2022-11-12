import { useEffect, useLayoutEffect, useState } from 'react';
import { Button, HStack, Text, useTheme, useToast, VStack } from 'native-base';
import { X, Check } from 'phosphor-react-native';
import { getName } from 'country-list';
import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';

import { Team } from './Team';
import { api } from '../services/api';

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export interface GameProps {
  id: string;
  date: string;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  guess: null | GuessProps;
};

interface Props {
  data: GameProps;
  poolId: string;
};

export function Game({
  data,
  poolId,
}: Props) {
  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [secondTeamPoints, setSecondTeamPoints] = useState('');
  const [confirmingGuess, setConfirmingGuess] = useState(null as boolean);

  const [timeHasRunOut, setTimeHasRunOut] = useState(false);

  const { colors, sizes } = useTheme();
  const toast = useToast();
  const toastId = 'insertPoints';

  const when = dayjs(data.date).locale(ptBR).format('DD [de] MMMM [de] YYYY [às] HH:mm[h]');

  const gameDateInMilliseconds = new Date(data.date).valueOf();

  async function handleGuessConfirm() {
    const gameId = data.id;
    try {
      if (gameDateInMilliseconds < new Date().valueOf()) {
        if (!toast.isActive(toastId)) {
          toast.show({
            id: toastId,
            title: 'O tempo do palpite esgotou',
            placement: 'top',
            bgColor: 'red.500',
            duration: 2000
          });
        }
        setTimeHasRunOut(true);
        setFirstTeamPoints('');
        setSecondTeamPoints('');
        return;
      }

      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        if (!toast.isActive(toastId)) {
          toast.show({
            id: toastId,
            title: 'Informe o placar do palpite',
            placement: 'top',
            bgColor: 'red.500',
            duration: 3000
          });
        }
        return;
      }

      const firstTeamPointsIsIntegerNumber = Number(firstTeamPoints) && Number.isInteger(firstTeamPoints);
      const secondTeamPointsIsIntegerNumber = Number(secondTeamPoints) && Number.isInteger(secondTeamPoints);
      if (!firstTeamPointsIsIntegerNumber || !secondTeamPointsIsIntegerNumber) {
        if (!toast.isActive(toastId)) {
          toast.show({
            id: toastId,
            title: 'O placar do palpite precisa ser número inteiro',
            placement: 'top',
            bgColor: 'red.500',
            duration: 3000
          });
        }
        return;
      }

      setConfirmingGuess(true);
      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });
      setConfirmingGuess(false);
      toast.show({
        title: 'Palpite realizado com sucesso',
        placement: 'top',
        bgColor: 'green.500',
        duration: 3000
      });

    } catch (error) {
      console.log(error);
      setConfirmingGuess(false);
      toast.show({
        title: 'Não foi possível enviar o palpite',
        placement: 'top',
        bgColor: 'red.500',
        duration: 3000
      });
    }
  }

  useLayoutEffect(() => {
    if (gameDateInMilliseconds < new Date().valueOf()) {
      setTimeHasRunOut(true);
    }
  }, []);

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >

      <Text color="gray.100" fontFamily="heading" fontSize="sm" textAlign='center'>
        {getName(data.firstTeamCountryCode)} vs. {getName(data.secondTeamCountryCode)}
      </Text>

      <Text color="gray.200" fontSize="xs">
        {when}
      </Text>

      <HStack mt={4} w="full" justifyContent="space-between" alignItems="center">
        <Team
          code={data.firstTeamCountryCode}
          position="right"
          onChangeText={setFirstTeamPoints}
          points={String(data.guess ? data.guess.firstTeamPoints : firstTeamPoints)}
          isReadOnly={!!data.guess || confirmingGuess === false || timeHasRunOut}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={data.secondTeamCountryCode}
          position="left"
          onChangeText={setSecondTeamPoints}
          points={String(data.guess ? data.guess.secondTeamPoints : secondTeamPoints)}
          isReadOnly={!!data.guess || confirmingGuess === false || timeHasRunOut}
        />
      </HStack>

      {
        !data.guess &&
        confirmingGuess !== false &&
        <Button
          size="xs"
          w="full"
          bgColor={
            timeHasRunOut
              ? 'gray.300'
              : 'green.500'
          }
          mt={4}
          onPress={
            timeHasRunOut
              ? () => { }
              : handleGuessConfirm

          }
          isLoading={confirmingGuess}
        >
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              {
                timeHasRunOut
                  ? 'TEMPO ESGOTADO'
                  : 'CONFIRMAR PALPITE'
              }
            </Text>

            {
              !timeHasRunOut &&
              < Check color={colors.white} size={sizes[4]} />
            }
          </HStack>
        </Button>
      }
    </VStack>
  );
}
