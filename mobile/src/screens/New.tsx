import { useState } from 'react';
import { Heading, Text, VStack, useToast, ScrollView } from 'native-base';

import Logo from '../assets/logo.svg';

import { api } from '../services/api';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function New() {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const toastId = 'insertPoolName';

  async function handlePoolCreate() {
    if (!title.trim()) {
      if (!toast.isActive(toastId)) {
        toast.show({
          id: toastId,
          title: 'Informe um nome para o seu bolão',
          placement: 'top',
          bgColor: 'red.500',
          duration: 3000
        });
      }
      return;
    }

    try {
      setIsLoading(true);

      await api.post('/pools', {
        title
      });


      toast.show({
        id: 'newPool',
        title: 'Bolão criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
        duration: 3000
      });
      setTitle('');

    } catch (error) {
      console.log(error);
      toast.show({
        id: 'error',
        title: 'Não foi possível criar o bolão',
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
      <Header title='Criar novo bolão' />

      <ScrollView
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      >
        <VStack my={8} mx={5} alignItems='center' >
          <Logo />

          <Heading fontFamily='heading' color='white' fontSize='xl' my={8} textAlign='center'>
            Crie seu próprio bolão da copa e compartilhe entre amigos!
          </Heading>

          <Input
            mb={2}
            placeholder='Qual nome do seu bolão?'
            onChangeText={setTitle}
            value={title}
          />

          <Button
            title='Criar meu bolão'
            onPress={handlePoolCreate}
            isLoading={isLoading}
          />

          <Text color='gray.200' fontSize='sm' textAlign='center' px={10} mt={4}>
            Após criar seu bolão, você receberá um código único
            que poderá usar para convidar outras pessoas.
          </Text>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
