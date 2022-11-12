import { useState } from 'react';
import { Heading, useToast, VStack, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { PoolsNavigationProp } from '../routes/pools.routes';

import { api } from '../services/api';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');

  const toast = useToast();
  const toastId = 'insertCode';
  const navigation = useNavigation<PoolsNavigationProp>();

  async function handleJoinPool() {
    try {
      if (!code.trim()) {
        if (!toast.isActive(toastId)) {
          toast.show({
            id: toastId,
            title: 'Informe o código',
            placement: 'top',
            bgColor: 'red.500',
            duration: 3000
          });
        }
        return;
      }
      setIsLoading(true);
      await api.post('/pools/join', {
        code: code.toUpperCase()
      });
      toast.closeAll();
      toast.show({
        id: toastId,
        title: 'Você entrou no bolão com sucesso',
        placement: 'top',
        bgColor: 'green.500',
        duration: 3000
      });
      navigation.pop();
      // navigate('pools');
      setCode('');
    } catch (error) {
      console.log(error);
      toast.closeAll();
      // setIsLoading(false);
      if (error.response?.data?.message === 'Pool not found.') {
        return toast.show({
          title: 'Bolão não encontrado!',
          placement: 'top',
          bgColor: 'red.500',
          duration: 10000
        });
      }

      if (error.response?.data?.message === 'You already joined this pool.') {
        return toast.show({
          title: 'Você já está nesse bolão!',
          placement: 'top',
          bgColor: 'red.500',
          duration: 3000
        });
      }

      toast.show({
        title: 'Não foi possível encontrar o bolão',
        placement: 'top',
        bgColor: 'red.500',
        duration: 3000
      });

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bg='gray.900'>
      <Header title='Buscar por código' showBackButton />

      <ScrollView
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      >
        <VStack mt={8} mx={5} alignItems='center'>


          <Heading fontFamily='heading' color='white' fontSize='xl' mb={8} textAlign='center'>
            Encontre um bolão através de seu código único
          </Heading>

          <Input
            mb={2}
            placeholder='Qual o código do bolão?'
            onChangeText={setCode}
            value={code}
            autoCapitalize='characters'
          />

          <Button
            title='Buscar bolão'
            isLoading={isLoading}
            onPress={handleJoinPool}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
