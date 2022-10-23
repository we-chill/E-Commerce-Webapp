import { AnchorHTMLAttributes, FC, HTMLAttributeAnchorTarget, ReactNode } from 'react';

import clsx from 'clsx';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

export interface LinkProps extends NextLinkProps, Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'download'> {
  className?: string;
  target?: HTMLAttributeAnchorTarget;
  disabled?: boolean;
  children?: ReactNode;
}

const Link: FC<LinkProps> = ({
  href,
  children,
  passHref = false,
  scroll = true,
  shallow = false,
  className,
  target,
  disabled = false,
  ...props
}) => {
  return disabled ? (
    <div {...props} className={clsx(className, 'inline')}>
      {children}
    </div>
  ) : (
    <NextLink href={href} passHref={passHref} scroll={scroll} shallow={shallow}>
      <a {...props} target={target} className={className}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
