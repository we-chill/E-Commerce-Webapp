import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductCard from './ProductCard';

export default {
  title: 'Components/ProductCard',
  component: ProductCard,
} as ComponentMeta<typeof ProductCard>;

const Template: ComponentStory<typeof ProductCard> = (args) => (
  <div className="w-screen h-screen bg-neutral-300 flex justify-center items-center">
    <ProductCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  id: 1,
  name: 'Product Name',
  price: 100,

  title: 'Title here',
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to ",
  technicalInformation:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",

  rating: 4,
};
