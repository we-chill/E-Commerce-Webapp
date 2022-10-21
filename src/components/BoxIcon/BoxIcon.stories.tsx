import React, { useEffect, useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import BoxIcon from './BoxIcon';

export default {
  title: 'Components/BoxIcon',
  component: BoxIcon,
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
} as ComponentMeta<typeof BoxIcon>;

const Template: ComponentStory<typeof BoxIcon> = (args) => <BoxIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'rocket',
};
