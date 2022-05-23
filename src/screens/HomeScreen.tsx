import { Box, Spinner, useColorModeValue } from '@chakra-ui/react';
import PetList from 'components/pets/PetList';
import SearchParams from 'components/SearchParams';
import { Pet } from 'lib/petsApi';
import React, { Suspense } from 'react';

type Props = {};

const HomeScreen = (props: Props) => {
  const [pets, setPets] = React.useState<Pet[]>([]);

  async function requestPetsSubmit(pets: Pet[]) {
    console.info('requestPetsSubmit');

    setPets(pets);
  }
  return (
    <Box paddingX={2} paddingY={10}>
      <SearchParams onSubmit={requestPetsSubmit} />
      {pets.length > 0 ? (
        <PetList pets={pets} />
      ) : (
        <Spinner>loading...</Spinner>
      )}
    </Box>
  );
};

export default HomeScreen;
