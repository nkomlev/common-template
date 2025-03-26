import { useEffect, useState } from 'react';
export const useCurrentDevice = () => {
  const [width, setWidth] = useState(0);
  const [currentDevice, setCurrentDevice] = useState('');

  const handleResize = () => {
    setWidth(document.documentElement.clientWidth);
  };

  useEffect(() => {
    window?.addEventListener('resize', handleResize);
    if (width < 1024) {
      setCurrentDevice('mobile');
    } else {
      setCurrentDevice('desktop');
    }
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setWidth(document.documentElement.clientWidth);
    }
  }, [])

  return currentDevice;
};
