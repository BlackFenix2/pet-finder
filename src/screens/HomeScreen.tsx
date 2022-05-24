import {
  Box,
  Center,
  Spinner,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import AlertBanner from 'components/AlertBanner';
import PetList from 'components/pets/PetList';
import SearchParams from 'components/SearchParams';
import { Pet } from 'lib/petsApi';
import React, { Suspense, useEffect } from 'react';

type Props = {
  state?: string;
  city?: string;
  animal?: string;
  breed?: string;
};

const HomeScreen = (props: Props) => {
  const [pets, setPets] = React.useState<Pet[]>([]);
  const [isloading, setIsLoading] = React.useState<boolean>(false);
  const toast = useToast();
  async function requestPetsSubmit(pets: Pet[]) {
    try {
      setPets(pets);

      if (pets.length === 0) {
        toast({
          title: 'Not Found',
          description: `No pets found`,
          status: 'warning',
          duration: 9000,
          isClosable: true,
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: `Error fetching pets: ${error.message}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });

      setIsLoading(false);
      console.error(error);
    }
  }

  return (
    <Box paddingX={2} paddingY={10}>
      <SearchParams
        defaultValues={{
          state: props.state || 'NY',
          city: props.city || 'Selden',
          animal: props.animal,
          breed: props.breed,
        }}
        onSubmit={requestPetsSubmit}
        onLoad={() => setIsLoading(true)}
        onError={(error) => {
          setIsLoading(false);
          toast({
            title: 'Error',
            description: `Error fetching pets: ${error}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }}
      />
      <Center paddingTop={10} hidden={!isloading}>
        <Spinner>loading...</Spinner>
      </Center>
      <PetList pets={pets} />
    </Box>
  );
};

export default HomeScreen;
