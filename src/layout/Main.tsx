import { Box, Center, Container, Spinner } from '@chakra-ui/react';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('routes/Home'));
const DetailsPage = lazy(() => import('routes/Details'));
const NotFoundPage = lazy(() => import('routes/NotFound'));

type Props = {};

const Main = (props: Props) => {
  return (
    <Box as="main" width="100%" flexGrow={1}>
      <Container maxWidth={{ base: '1050px', '2xl': '1350px' }} height="100%">
        <Suspense
          fallback={
            <Center>
              <Spinner>loading...</Spinner>
            </Center>
          }
        >
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/details/:id" element={<DetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Container>
    </Box>
  );
};

export default Main;
