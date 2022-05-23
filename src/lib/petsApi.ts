import { Client } from '@petfinder/petfinder-js';
const client = new Client({
  apiKey: '0cUc47mpmZ5pi7XQi5pJqwPF9gDXDizg1radIEUKGqsDCyAJoX',
  secret: 'qIBNoCGgMrMmJQbnKFpXiBeG8LzywG62tSEqLHAB',
});

export type Pet = {
  id: number;
  name: string;
  animal: string;
  city: string;
  state: string;
  description: string;
  breed: string;
  images: string[];
  url: string;
};

export type PetResponse = {
  numberOfresults: number;
  startIndex: number;
  endIndex: number;
  hasNext: boolean;
  pets: Pet[];
};

export type BreedResponse = {
  animal: string;
  breeds: string[];
};

export type AnimalResponse = {
  animals: string[];
};

export interface Breeds {
  primary: string;
  secondary?: any;
  mixed: boolean;
  unknown: boolean;
}

export interface Colors {
  primary: string;
  secondary?: any;
  tertiary?: any;
}

export interface Photo {
  small: string;
  medium: string;
  large: string;
  full: string;
}

export interface Video {
  embed: string;
}

export interface Attributes {
  spayed_neutered: boolean;
  house_trained: boolean;
  declawed: boolean;
  special_needs: boolean;
  shots_current: boolean;
}

export interface Environment {
  children: boolean;
  dogs: boolean;
  cats: boolean;
}

export interface Address {
  address1?: any;
  address2?: any;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface Contact {
  email: string;
  phone: string;
  address: Address;
}

export interface Self {
  href: string;
}

export interface Type {
  href: string;
}

export interface Organization {
  href: string;
}

export interface Links {
  self: Self;
  type: Type;
  organization: Organization;
}

export interface Animal {
  id: number;
  organization_id: string;
  url: string;
  type: string;
  species: string;
  breeds: Breeds;
  colors: Colors;
  age: string;
  gender: string;
  size: string;
  coat: string;
  name: string;
  description: string;
  photos: Photo[];
  videos: Video[];
  status: string;
  attributes: Attributes;
  environment: Environment;
  tags: string[];
  contact: Contact;
  published_at: Date;
  distance?: any;
  _links: Links;
}

type Pagination = {
  count_per_page: number;
  current_page: number;
  total_count: number;
  total_pages: number;
  _links: {
    next: {
      href: string;
    };
  };
};

type ApiResponse<T> = {
  pagination: Pagination;
  animals: T;
};

export const requestBreedList = async (animal: string) => {
  const res = await fetch(
    `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );
  const json = (await res.json()) as BreedResponse;
  return json.breeds;
};

export const requestAnimalList = async () => {
  const res = await fetch(`https://pets-v2.dev-apis.com/animals`);
  const json = (await res.json()) as AnimalResponse;
  return json.animals;
};

export const fetchPets = async (
  animal: string,
  location: string,
  breed: string,
  limit: number = 10
): Promise<PetResponse> => {
  const searchParams = {
    type: animal,
    location,
    breed,
    limit,
  };

  const response = await client.animal.search({
    ...removeEmpty(searchParams),
  });

  const data = response.data as ApiResponse<Animal[]>;

  return {
    numberOfresults: data.pagination.total_count,
    startIndex: data.pagination.current_page,
    endIndex: data.pagination.current_page + data.pagination.count_per_page,
    hasNext: data.pagination._links?.next !== undefined,
    pets: data.animals.map(
      ({ id, name, type, description, photos, breeds, contact, url }) => ({
        id,
        name,
        animal: type,
        description,
        images: photos.map(({ large }) => large),
        breed: breeds.primary,
        city: contact.address.city,
        state: contact.address.state,
        url: url,
      })
    ),
  };
};

export const fetchPetById = async (id: number): Promise<Pet> => {
  const response = await client.animal.show(id);

  const data = response.data.animal as Animal;
  console.log(data);
  return {
    id: data.id,
    name: data.name,
    animal: data.type,
    description: data.description,
    images: data.photos.map(({ large }) => large),
    breed: data.breeds.primary,
    city: data.contact.address.city,
    state: data.contact.address.state,
    url: data.url,
  };
};

/**
 * omits null, undefined or empty values from an object
 * needed since petfinder api doesnt handle undefined query strings ;(
 * @param obj
 * @returns
 */
function removeEmpty(obj: object): any {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v !== null && v !== '' && v !== undefined)
      .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
  );
}
