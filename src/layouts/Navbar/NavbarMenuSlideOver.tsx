import { Link, SlideOver } from '@/components';
import { LinkProps } from '@/components/Link/Link';
import useStore from '@/store';
import { notifyUpcoming } from '@/utils';

const NavbarMenuSlideOver = () => {
  const { isOpen, setIsOpen } = useStore((state) => state.navbarSlideOver);

  const closeNavbarSlideOver = () => {
    setIsOpen(false);
  };

  const onLickClick = (shouldNotifyUpcoming = false) => {
    closeNavbarSlideOver();
    shouldNotifyUpcoming && notifyUpcoming();
  };

  const sharedLinkProps: Omit<LinkProps, 'href'> = {
    className: 'text-[32px]',
  };
  const linkHome = (
    <Link href="/" {...sharedLinkProps} onClick={onLickClick}>
      Home
    </Link>
  );
  const linkAboutUs = (
    <Link href="/" {...sharedLinkProps} onClick={() => onLickClick(true)}>
      About us
    </Link>
  );
  const linkBlog = (
    <Link href="/" {...sharedLinkProps} onClick={() => onLickClick(true)}>
      Blog
    </Link>
  );
  const linkContact = (
    <Link href="/" {...sharedLinkProps} onClick={() => onLickClick(true)}>
      Contact
    </Link>
  );
  const linkReturn = (
    <Link href="/doi-tra" {...sharedLinkProps} onClick={() => closeNavbarSlideOver()}>
      Policy
    </Link>
  );

  return (
    <SlideOver isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col gap-4">
        {linkHome}
        {linkAboutUs}
        {linkBlog}
        {linkContact}
        {linkReturn}
      </div>
    </SlideOver>
  );
};

export default NavbarMenuSlideOver;
