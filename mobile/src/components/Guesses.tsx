import { useEffect, useState } from 'react';
import { Box, useToast, FlatList, Text, useTheme } from 'native-base';

import { api } from '../services/api';

import { Game, GameProps } from '../components/Game';
import { Loading } from './Loading';

interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);

  const [someGames, setSomeGames] = useState<GameProps[]>([]);

  const [lastGameIndex, setLastGameIndex] = useState(4);
  const [endList, setEndList] = useState(false);

  const { sizes } = useTheme();
  const toast = useToast();

  const renderItem = ({ item }: { item: GameProps }) => (
    <Game
      data={item}
      poolId={poolId}
    />
  );

  const onEndReached = () => {
    const someGamesSize = someGames.length;
    const allGamesSize = games.length;

    if (someGamesSize < allGamesSize) {
      const moreSomeGames: GameProps[] = games.slice(someGamesSize, someGamesSize + 4);

      setSomeGames([...someGames, ...moreSomeGames]);
    }
  };

  async function fetchGames() {
    try {
      setIsLoading(true);
      const response = await api.get(`/pools/${poolId}/games`);
      const games: [] = response.data.games;
      // console.log(games);
      setGames(games);
      // setSomeGames(games.slice(0, 4));

    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Não foi possível carregar os jogos',
        placement: 'top',
        bgColor: 'red.500',
        duration: 3000
      });
    } finally {
      setIsLoading(false);
    }
  }



  useEffect(() => {
    fetchGames();
  }, []);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <FlatList
      keyboardShouldPersistTaps='handled'
      // data={someGames}
      data={games}
      // data={games.slice(0, lastGameIndex < games.length ? lastGameIndex : games.length)}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      // onEndReachedThreshold={0.5}
      // onEndReached={onEndReached}
      // ListFooterComponent={someGames.length < games.length && <Loading />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: sizes[22] }}
      ListEmptyComponent={() => (
        <Text color='white' textAlign='center'>Não há jogos cadastrados</Text>
      )}
    />
  );
} 
