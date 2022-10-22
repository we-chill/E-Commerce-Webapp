import React, { useEffect, useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductModal from './ProductModal';

export default {
  title: 'Components/ProductModal',
  component: ProductModal,
  decorators: [
    (Story) => {
      const [isLoaded, setIsLoaded] = useState(false);
      useEffect(() => {
        const script = document.createElement('script');
        script.onload = () => {
          setIsLoaded(true);
        };
        script.src = 'https://unpkg.com/boxicons@2.1.3/dist/boxicons.js';
        document.body.appendChild(script);
        return () => {
          // clean up effects of script here
        };
      }, []);

      return isLoaded ? <Story /> : <div>Loading...</div>;
    },
  ],
} as ComponentMeta<typeof ProductModal>;

const Template: ComponentStory<typeof ProductModal> = (args) => (
  <div className="w-screen h-screen bg-neutral-300 flex justify-center items-center">
    <ProductModal {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  product: {
    id: 1,
    name: 'Product Name',
    price: 100,

    title: 'Title here',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to ",
    technicalInformation:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",

    rating: 4,
  },
};
