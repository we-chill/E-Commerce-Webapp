import { Product } from '@/types';
import { faker } from '@faker-js/faker';

faker.seed(101);

export const newProduct = (): Product => ({
  id: faker.datatype.number(),
  name: faker.commerce.product(),
  price: faker.datatype.number({
    min: 1,
    max: 100,
  }),
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  technicalInformation: faker.commerce.department(),
  rating: faker.datatype.number({
    min: 0,
    max: 5,
    precision: 1,
  }),
});

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const makeProducts = (length: number) => {
  return range(length).map(() => ({
    ...newProduct(),
  }));
};

const MOCK_PRODUCTS = makeProducts(1000);

export { MOCK_PRODUCTS };
