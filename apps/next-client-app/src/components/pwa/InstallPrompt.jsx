'use client';
import React, { useState, useEffect } from "react";
import { Button } from "@common-templates/shared/components/ui/button";
import { useStore } from "@/store/useStore";
import { useCurrentDevice } from "@/lib/hooks/useCurrentDevice";

function InstallPrompt() {
  const [isStandalone, setIsStandalone] = useState(false);
  const [displayGuidePlatform, setDisplayGuidePlatform] = useState(null);
  const { beforeInstallPromptPWA, setBeforeInstallPromptPWA } = useStore();
  const currentDevice = useCurrentDevice();

  if (typeof window !== "undefined") {
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log(e)
      setBeforeInstallPromptPWA(e);
    });
  }

  useEffect(() => {
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches );
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  const handleClick = async () => {
    if (beforeInstallPromptPWA) {
      beforeInstallPromptPWA.prompt();
      const { outcome } = await beforeInstallPromptPWA.userChoice;
      if (outcome === 'accepted') {
        setBeforeInstallPromptPWA(null);
      }
      return;
    }
    if (currentDevice !== 'mobile') return;
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      setDisplayGuidePlatform('iOS');
      return;
    }
    setDisplayGuidePlatform('Android');
  }

  if (beforeInstallPromptPWA || currentDevice === 'mobile') {
    return (
      <div className="mt-20 w-[400px] flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4 text-center">
          Установка PWA
        </h3>
        <Button
          onClick={handleClick}
        >
          Добавить на главный экран
        </Button>
        {displayGuidePlatform === 'iOS' && (
          <IOSInstallationGuide />
        )}
        {displayGuidePlatform === 'Android' && (
          <AndroidInstallationGuide />
        )}
      </div>
    );
  }
  return null;
}

const IOSInstallationGuide = () => {
  return (
    <p className="mt-4">
      Чтобы установить приложение на ваше устройство нажмите кнопку 'Поделиться'
      <span role="img" aria-label="share icon">
            {' '}
        ⎋{' '}
          </span>
      и после нажмите 'Добавить на Экран Домой'
      <span role="img" aria-label="plus icon">
            {' '}
        ➕{' '}
          </span>
      .
    </p>
  );
}

const AndroidInstallationGuide = () => (
  <p className="mt-4">

  </p>
);

export default InstallPrompt