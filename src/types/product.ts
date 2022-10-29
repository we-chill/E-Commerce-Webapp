export type Product = {
  id: number;
  name: string;
  price: number;

  title?: string;
  description?: string;
  technicalInformation?: string;

  rating?: number;
};

export type ProductInCart = Pick<Product, 'id' | 'name' | 'title' | 'price'> & {
  count: number;
};
