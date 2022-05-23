import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailsScreen from 'screens/DetailsScreen';

const Details = () => {
  const { id } = useParams();

  return <DetailsScreen id={id!}></DetailsScreen>;
};

export default Details;
