import { SimpleGrid, Stack, Wrap, WrapItem } from '@chakra-ui/react';
import { Pet } from 'lib/petsApi';
import React from 'react';
import PetListItem from './PetListItem';

type Props = {
  pets: Pet[];
};

const PetList = (props: Props) => (
  <Wrap justify="center">
    {props.pets.map((pet) => (
      <WrapItem key={pet.id} maxWidth={350}>
        <PetListItem pet={pet} />
      </WrapItem>
    ))}
  </Wrap>
);

export default React.memo(PetList);
