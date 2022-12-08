import { ReactNode } from 'react';
import { toast, ToastOptions } from 'react-toastify';

export const notify = (content: ReactNode, restProps?: ToastOptions) => {
  return toast(content, {
    position: 'bottom-left',
    pauseOnFocusLoss: false,
    draggable: false,
    ...restProps,
  });
};

export const notifyUpcoming = () => {
  notify('Upcoming feature 👋', {
    type: 'default',
  });
};

export const notifyWrongLogin = () => {
  notify('Wrong password or username 👋', {
    type: 'default',
  });
};
