import {
  Box,
  Button,
  Heading,
  Image,
  Link,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import BackgroundOverlay from 'components/BackgroundOverlay';
import ImageCarousel from 'components/ImageCarousel';
import { Pet } from 'lib/petsApi';
import React from 'react';
import QRCode from 'react-qr-code';

type Props = {
  pet: Pet;
};

const PetDetails: React.FC<Props> = ({ pet }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <Button colorScheme={'red'} onClick={onOpen}>
            Adopt {pet.name}
          </Button>
          <Text>{pet.description}</Text>
          <QRCode value="https://bit.ly/pet-adopt" />
        </Stack>
      </BackgroundOverlay>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter={'black'} />
        <ModalContent alignItems={'center'}>
          <ModalHeader>Would you like to adopt {pet.name}!?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Save me from this crappy modal!</ModalBody>

          <ModalFooter alignItems={'center'}>
            <Button
              as={Link}
              href={pet.url}
              isExternal
              colorScheme="red"
              mr={3}
              onClick={onClose}
            >
              Yes
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PetDetails;
