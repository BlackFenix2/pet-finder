import { State, City } from 'country-state-city';
import { ICity, IState } from 'country-state-city/dist/lib/interface';

const COUNTRY_CODE = 'US';
export const getStates = (): IState[] => State.getStatesOfCountry(COUNTRY_CODE);

export const getCities = (state: string): ICity[] =>
  City.getCitiesOfState(COUNTRY_CODE, state);

export const getCityStateString = (city: ICity, state: IState) => {
  return `${city.name}, ${state.isoCode}`;
};

// export const getCountryStateList = () => {
//   const states = State.getStatesOfCountry(COUNTRY_CODE);
//   let countryStateList: string[] = [];
//   states.forEach((state) => {
//     countryStateList.push(
//       ...City.getCitiesOfState(COUNTRY_CODE, state.isoCode).map(
//         (city) => `${city.name}, ${state.isoCode}`
//       )
//     );
//   });

//   return countryStateList.filter((item, index, array) => {
//     return array.indexOf(item) === index;
//   });
// };
