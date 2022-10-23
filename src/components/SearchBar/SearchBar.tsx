import clsx from 'clsx';
import _ from 'lodash';
import React, { FC } from 'react';
import BoxIcon from '../BoxIcon';

export interface SearchBarProps {
  placeholder?: string;

  width?: string;
  height?: string;
  background?: string;
  containerClassName?: string;
  inputClassName?: string;

  onFocus?: () => void;
  onBlur?: () => void;
  onEnter?: (value: string) => void;

  searchTerm?: string;
  defaultValue?: string;

  disabled?: boolean;
  allowClear?: boolean;
}

const SearchBar: FC<SearchBarProps> = (props) => {
  const {
    placeholder = 'Search...',
    width = 'w-full',
    height = 'h-9',
    background = 'bg-white',
    containerClassName,
    inputClassName,
    onEnter,
    ...rest
  } = props;

  return (
    <div
      className={clsx(
        'relative inline-flex items-center justify-center px-2 space-x-2 outline-none rounded-3xl',
        'border border-neutral-5 ring-transparent focus-within:border-neutral-600',
        width,
        height,
        background,
        containerClassName
      )}
    >
      <input
        type="text"
        placeholder={placeholder}
        className={clsx('w-full h-full ml-2 font-normal bg-transparent border-none outline-none', inputClassName)}
        onKeyDown={(e) => {
          e.key === 'Enter' && onEnter?.(_.get(e, 'target.value', ''));
        }}
        {...rest}
      />
      <BoxIcon name="search" />
    </div>
  );
};

export default SearchBar;
