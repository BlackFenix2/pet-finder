import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  LightMode,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import Card from 'components/Card';
import { Pet } from 'lib/petsApi';
import React, { Suspense, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import { Link } from 'react-router-dom';
import { FaSync, FaBarcode } from 'react-icons/fa';

const QrCode = React.lazy(() => import('./QrCode'));

type Props = {
  pet: Pet;
};

const PetItem: React.FC<Props> = ({ pet }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);
  return (
    <ReactCardFlip isFlipped={isFlipped}>
      <Card rounded={'none'} height="500px" width={'348px'}>
        <Flex direction={'column'} height="100%">
          <Link to={`details/${pet.id}`}>
            <Image
              boxSize={'sm'}
              src={pet.images[0]}
              fallbackSrc={
                'https://www.sotera.com/media/catalog/product/placeholder/default/Image_not_Available.png'
              }
            ></Image>
          </Link>
          <Flex justifyContent={'space-between'}>
            <Box>
              <Heading as="h1">{pet.name}</Heading>
            </Box>
            <Box>
              <IconButton
                icon={<FaSync />}
                aria-label="Card flip button"
                onClick={() => setIsFlipped((state) => !state)}
              />
            </Box>
          </Flex>
          <Text
            marginTop={'auto'}
          >{`${pet.animal} - ${pet.breed} - ${pet.city}, ${pet.state}`}</Text>
        </Flex>
      </Card>
      <Card height="500px" width={'348px'}>
        <Stack justifyContent={'space-between'} height="100%">
          <Center>
            <Text>Scan the QR code below to adopt this pet!</Text>
          </Center>
          <Center>
            <Box padding={4} background="white">
              <Suspense fallback={<Spinner></Spinner>}>
                <QrCode value={pet.url} />
              </Suspense>
            </Box>
          </Center>
          <Button width="100%" onClick={() => setIsFlipped((state) => !state)}>
            Flip back
          </Button>
        </Stack>
      </Card>
    </ReactCardFlip>
  );
};

export default React.memo(PetItem);
