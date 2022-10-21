import React, { useEffect, useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './IconButton';

export default {
  title: 'Components/IconButton',
  component: Button,
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
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'button',
  boxiconName: 'cog',
  disabled: false,
};
