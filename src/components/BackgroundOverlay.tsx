import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const BackgroundOverlay = (props: Props) => {
  const bg = useColorModeValue('red.50', 'red.500');

  return (
    <Box
      backgroundColor={bg}
      paddingX={4}
      paddingY={8}
      boxShadow="md"
      rounded={'md'}
    >
      {props.children}
    </Box>
  );
};

export default BackgroundOverlay;
