import { Link as ReactLink } from 'react-router-dom';

import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';

type CommonProps = {
  to: string;
  children: React.ReactNode;
};

type Props = LinkProps & CommonProps;

const Link = (props: Props) => {
  return (
    <ChakraLink as={ReactLink} to={props.to}>
      {props.children}
    </ChakraLink>
  );
};

export default Link;
