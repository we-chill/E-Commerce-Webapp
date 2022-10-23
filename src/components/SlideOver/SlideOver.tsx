import { FC, Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import BoxIcon from '@/components/BoxIcon';
import clsx from 'clsx';

export interface SlideOver {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: ReactNode;
  containerWidth?: string;
}

const SlideOver: FC<SlideOver> = ({
  isOpen = false,
  setIsOpen,
  children,
  containerWidth = 'w-screen max-w-[23.75rem]',
}) => {
  const buttonClose = (
    <button
      type="button"
      className="p-2 flex justify-center items-center rounded-full cursor-pointer hover:shadow-md"
      onClick={() => setIsOpen(false)}
    >
      <BoxIcon name="x" />
    </button>
  );

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className={clsx(['pointer-events-auto relative ', containerWidth])}>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 flex justify-end">{buttonClose}</div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">{children}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SlideOver;
