import React from 'react';
import { useSearchParams } from 'react-router-dom';
import HomeScreen from 'screens/HomeScreen';

type Props = {};

const Home = (props: Props) => {
  const [params] = useSearchParams();

  return (
    <HomeScreen
      state={params.get('state')?.toString()}
      city={params.get('city')?.toString()}
    ></HomeScreen>
  );
};

export default Home;
