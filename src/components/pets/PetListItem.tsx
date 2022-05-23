import { Heading, Image, Text } from '@chakra-ui/react';
import Card from 'components/Card';
import { Pet } from 'lib/petsApi';
import { Link } from 'react-router-dom';

type Props = {
  pet: Pet;
};

const PetItem: React.FC<Props> = ({ pet }) => (
  <Card rounded={'none'}>
    <Link to={`details/${pet.id}`}>
      <Image
        boxSize={'sm'}
        src={pet.images[0]}
        fallbackSrc={
          'https://www.sotera.com/media/catalog/product/placeholder/default/Image_not_Available.png'
        }
      ></Image>
      <Heading as="h1">{pet.name}</Heading>
      <Text>{`${pet.animal} - ${pet.breed} - ${pet.city},${pet.state}`}</Text>
    </Link>
  </Card>
);

export default PetItem;
