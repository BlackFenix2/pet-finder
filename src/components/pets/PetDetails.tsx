import { Box, Button, Heading, Link, Stack, Text } from '@chakra-ui/react';
import BackgroundOverlay from 'components/BackgroundOverlay';
import ImageCarousel from 'components/ImageCarousel';
import { Pet } from 'lib/petsApi';
import React from 'react';
import QrCode from './QrCode';

type Props = {
  pet: Pet;
};

const PetDetails: React.FC<Props> = ({ pet }) => {
  return (
    <Box marginX={3} marginY={10}>
      <BackgroundOverlay>
        <Stack alignItems="center">
          <ImageCarousel images={pet.images} />
          <Heading as="h1">{pet.name}</Heading>
          <Heading
            as="h2"
            size={'md'}
          >{`${pet.animal} - ${pet.breed} - ${pet.city},${pet.state}`}</Heading>
          <Button colorScheme={'red'} as={Link} href={pet.url} isExternal>
            Adopt {pet.name}
          </Button>
          <Text>{pet.description}</Text>
          <QrCode value={pet.url} />
        </Stack>
      </BackgroundOverlay>
    </Box>
  );
};

export default PetDetails;
