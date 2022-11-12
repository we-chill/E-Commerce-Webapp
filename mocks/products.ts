import { Product, ProductInCart } from '@/types';
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

const MOCK_NUM_OF_PRODUCTS_IN_CART = 12;
const MOCK_PRODUCTS_IN_CART: ProductInCart[] = MOCK_PRODUCTS.slice(0, MOCK_NUM_OF_PRODUCTS_IN_CART).map((product) => ({
  ...product,
  count: faker.datatype.number({
    min: 1,
    max: 10,
  }),
}));

const MOCK_TOTAL_PRICE = MOCK_PRODUCTS_IN_CART.reduce(
  (prevTotal, product) => prevTotal + product.count * product.price,
  0
);

const makeItemListAndQuantity = () => {
  const itemListAndQuantity: {
    [id: Product['id']]: ProductInCart;
  } = {};
  MOCK_PRODUCTS_IN_CART.forEach((product) => {
    itemListAndQuantity[product.id] = product;
  });
  return itemListAndQuantity;
};

const MOCK_ITEM_LIST_AND_QUANTITY = makeItemListAndQuantity();

export { MOCK_PRODUCTS, MOCK_PRODUCTS_IN_CART, MOCK_TOTAL_PRICE, MOCK_ITEM_LIST_AND_QUANTITY };
