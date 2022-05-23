import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from 'layout/Layout';

import { theme } from 'layout/theme';

export const App = () => (
  <ChakraProvider theme={theme} resetCSS>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </ChakraProvider>
);
