import { Flex } from '@chakra-ui/react';
import ErrorBoundary from 'components/ErrorBoundary';
import Header from './Header';
import Main from './Main';

type Props = {};

const Layout = (props: Props) => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Header />
      {/* <ErrorBoundary> */}
      <Main />
      {/* </ErrorBoundary> */}
    </Flex>
  );
};

export default Layout;
