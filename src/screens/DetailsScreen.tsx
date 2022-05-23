import { Box, Spinner } from '@chakra-ui/react';
import AlertBanner from 'components/AlertBanner';
import PetDetails from 'components/pets/PetDetails';
import { fetchPetById, Pet } from 'lib/petsApi';
import React, { useEffect } from 'react';

type Props = {
  id: string;
};

const DetailsScreen = (props: Props) => {
  const [pet, setPet] = React.useState<Pet>();
  const [error, setError] = React.useState<string>();
  useEffect(() => {
    if (props.id) {
      fetchPetById(parseInt(props.id))
        .then((pet) => {
          console.log('pet', pet);
          setPet(pet);
        })
        .catch((err) => {
          setError(err.message);
          console.error(err);
        });
    }
  }, []);
  return (
    <Box>{!pet ? <Spinner>loading...</Spinner> : <PetDetails pet={pet} />}</Box>
  );
};

export default DetailsScreen;
