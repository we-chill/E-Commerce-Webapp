import { Routes } from '@/constants';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

const MILLISECONDS_BEFORE_SHOWING_HELLO = 1500;
const MILLISECONDS_BEFORE_NAVIGATE_TO_HOME = MILLISECONDS_BEFORE_SHOWING_HELLO + 3000;

const LandingPage = () => {
  const router = useRouter();
  const [haveImagesLoaded, setHaveImagesLoaded] = useState({
    left: false,
    right: false,
  });
  const areAllImagesLoaded = haveImagesLoaded.left && haveImagesLoaded.right;
  const [shouldShowHello, setShouldShowHello] = useState(false);

  const turnOnHelloTextTimer = useRef() as any;
  useEffect(() => {
    if (areAllImagesLoaded) {
      turnOnHelloTextTimer.current = setTimeout(() => setShouldShowHello(true), MILLISECONDS_BEFORE_SHOWING_HELLO);
    }
    return () => {
      clearTimeout(turnOnHelloTextTimer.current);
    };
  }, [areAllImagesLoaded]);

  useEffect(function navigateToHomeAfterWaiting() {
    setTimeout(() => router.replace(Routes.home), MILLISECONDS_BEFORE_NAVIGATE_TO_HOME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flyingHelloText = (
    <div
      className="flying-hello"
      style={{
        transform: `scale(${shouldShowHello ? 1 : 0})`,
        opacity: shouldShowHello ? 1 : 0,
      }}
    >
      <img src="/hello.svg" alt="Hello" />
    </div>
  );

  return (
    <div className="w-screen h-screen flex">
      <div className="relative flex-grow">
        <Image
          src={'/cover-flipped-horizontal.png'}
          layout="fill"
          quality={65}
          onLoadingComplete={() =>
            setHaveImagesLoaded((value) => ({
              ...value,
              left: true,
            }))
          }
        />
        ;
      </div>
      <div className="relative flex-grow">
        <Image
          src={'/cover.png'}
          layout="fill"
          quality={65}
          onLoadingComplete={() =>
            setHaveImagesLoaded((value) => ({
              ...value,
              right: true,
            }))
          }
        />
        ;
      </div>
      {flyingHelloText}
    </div>
  );
};

export default LandingPage;
