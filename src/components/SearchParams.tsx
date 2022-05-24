import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { ICity, IState } from 'country-state-city/dist/lib/interface';
import { getCities, getStates } from 'lib/countryState';
import {
  fetchPets,
  Pet,
  requestAnimalList,
  requestBreedList,
} from 'lib/petsApi';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import BackgroundOverlay from './BackgroundOverlay';

type Props = {
  onSubmit: (pets: Pet[]) => void;
  onLoad: () => void;
  onError: (error: string) => void;
  defaultValues?: {
    state?: string;
    city?: string;
    animal?: string;
    breed?: string;
  };
};

type FormData = {
  state: string;
  city: string;
  animal: string;
  breed: string;
};

const SearchParams = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    resetField,
  } = useForm<FormData>({
    defaultValues: props.defaultValues,
  });

  const color = useColorModeValue('white', 'gray.800');

  const [stateList, setStateList] = React.useState<IState[]>([]);
  const [cityList, setCityList] = React.useState<ICity[]>([]);

  const [animalList, setAnimalList] = React.useState<string[]>([]);
  const [breedList, setBreedList] = React.useState<string[]>([]);

  useEffect(() => {
    requestAnimalList().then((animalList) => {
      setAnimalList(animalList);
    });
    setStateList(getStates());
  }, []);

  const resetCityList = (state: string) => {
    if (stateList.find((item) => item.isoCode === state)) {
      setCityList(getCities(state));
    }
  };

  const resetBreedList = (animal: string) => {
    if (animal) {
      requestBreedList(animal).then((breedList) => {
        setBreedList(breedList);
      });
    }
  };

  const onSubmit = async (data: FormData) => {
    props.onLoad();
    try {
      const { state, city, animal, breed } = data;
      const location = `${city}, ${state}`;
      const result = await fetchPets(animal, location, breed);

      props.onSubmit(result.pets);
    } catch (err: any) {
      props.onError(err);
    }
  };

  return (
    <Flex flexDirection={'column'} justifyContent="center">
      <Box width="400px" alignSelf={'center'}>
        <BackgroundOverlay>
          <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel htmlFor="state">State</FormLabel>

              <Input
                {...register('state', {
                  required: { value: true, message: 'state is required' },
                })}
                list="state-list"
                onChange={(e) => {
                  register('state').onChange(e);
                  resetField('city');
                  resetCityList(e.target.value);
                }}
                backgroundColor={color}
              />

              <datalist id="state-list">
                {stateList.map((state) => (
                  <option value={state.isoCode} key={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </datalist>
              {errors?.state && (
                <Text color="red" fontWeight={'bold'}>
                  {errors.state.message}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="city">City</FormLabel>
              <Input
                {...register('city', {
                  required: { value: true, message: 'city is required' },
                })}
                list="city-list"
                backgroundColor={color}
              />
              <datalist id="city-list">
                {cityList.map((city) => (
                  <option value={city.name} key={city.name}>
                    {city.name}
                  </option>
                ))}
              </datalist>
              {errors?.city && (
                <Text color="red" fontWeight={'bold'}>
                  {errors.city.message}
                </Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="animal">Animal</FormLabel>
              <Select
                // value={animal}
                backgroundColor={color}
                {...register('animal')}
                onChange={(e) => {
                  register('animal').onChange(e);
                  resetField('breed');
                  resetBreedList(e.target.value);
                }}
                onBlur={(e) => {
                  register('animal').onBlur(e);
                  resetField('breed');
                  resetBreedList(e.target.value);
                }}
              >
                <option></option>
                {animalList.map((animal) => (
                  <option key={animal} value={animal}>
                    {animal}
                  </option>
                ))}
              </Select>
              {errors?.animal && (
                <Text color="red" fontWeight={'bold'}>
                  {errors.animal.message}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="breed">Breed</FormLabel>
              <Select
                // value={breed}
                backgroundColor={color}
                {...register('breed')}
                onChange={(e) => {
                  register('breed').onChange(e);
                }}
                onBlur={(e) => {
                  register('breed').onBlur(e);
                }}
              >
                <option></option>
                {breedList.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </Select>
              {errors?.breed && (
                <Text color="red" fontWeight={'bold'}>
                  {errors.breed.message}
                </Text>
              )}
            </FormControl>
            <Button colorScheme={'red'} type="submit">
              Submit
            </Button>
          </VStack>
        </BackgroundOverlay>
      </Box>
    </Flex>
  );
};

export default SearchParams;
