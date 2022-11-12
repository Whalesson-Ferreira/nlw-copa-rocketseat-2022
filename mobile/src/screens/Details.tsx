import { useState, useEffect } from 'react';
import { Share } from 'react-native';
import { HStack, Text, useToast, VStack } from 'native-base';
import { useRoute } from '@react-navigation/native';

import { api } from '../services/api';

import { Header } from '../components/Header';
import { PoolHeader } from '../components/PoolHeader';
import { PoolCardProps } from '../components/PoolCard';
import { Loading } from '../components/Loading';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';
import { Option } from '../components/Option';
import { Guesses } from '../components/Guesses';
import { EmptyRakingList } from '../components/EmptyRakingList';

interface RouteParams {
  id: string
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps);
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses');

  const toast = useToast();
  const route = useRoute();
  const { id } = route.params as RouteParams;

  async function fetchPoolsDetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${id}`);

      setPoolDetails(response.data.pool);
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Não foi possível carregar os detalhes do bolão',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: poolDetails.code,
      // message: `Participe do meu bolão o código ${poolDetails.code}`,
    });
  }

  useEffect(() => {
    fetchPoolsDetails();
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg='gray.900'>
      <Header
        title={poolDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      <PoolHeader
        data={poolDetails}
      />
      {
        poolDetails?._count?.participants > 0
          ?
          <VStack px={5} flex={1}>
            <HStack bgColor='gray.800' p={1} rounded='sm' mb={5}>
              <Option
                title='Seus palpites'
                isSelected={optionSelected === 'guesses'}
                onPress={() => setOptionSelected('guesses')}
              />
              <Option
                title='Ranking do grupo'
                isSelected={optionSelected === 'ranking'}
                onPress={() => setOptionSelected('ranking')}
              />
            </HStack>

            {
              optionSelected === 'guesses'
                ?
                <Guesses
                  poolId={poolDetails.id}
                />
                :
                // <Text color='white' textAlign='center'>Exibir o ranking</Text>
                <EmptyRakingList />

            }

          </VStack>
          :
          <EmptyMyPoolList
            code={poolDetails.code}
            onShare={handleCodeShare}
          />
      }

    </VStack>
  );
}
