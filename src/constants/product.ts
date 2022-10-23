import { Product } from '@/types';

export const EMPTY_PRODUCT: Product = {
  id: -1,
  name: '',
  price: 0,
};

export const MOCK_100_PRODUCTS: Product[] = Array.apply(0, Array(100)).map(
  (_, index) =>
    ({
      id: index,
      name: 'Product name #' + index,
      price: (index % 12) + 3,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to ",
      technicalInformation:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
      rating: 4,
    } as Product)
);
