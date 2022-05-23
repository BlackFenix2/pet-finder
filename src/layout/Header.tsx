import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from 'ColorModeSwitcher';
import { Link } from 'react-router-dom';

type Props = {};

const Header = (props: Props) => {
  const bg = useColorModeValue('white', 'gray.800');
  return (
    <Box
      as="nav"
      boxShadow="md"
      position={'sticky'}
      backgroundColor={bg}
      top={0}
      zIndex={100}
    >
      <Flex alignItems={'center'}>
        <Link to="/">
          <Image padding={2} src="/adopt-me.png" alt="Adopt logo"></Image>
        </Link>

        <Box marginLeft={'auto'} marginRight={5}>
          <ColorModeSwitcher />
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
