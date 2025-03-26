'use client';

import { create } from 'zustand';

export const useStore = create((set, get) => ({
  currentCustomer: {},
  setCurrentCustomer: (data) => {
    set(
      {
        currentCustomer: data
      }
    )
  },
  beforeInstallPromptPWA: null, // Сохраняем событие, позволяющее вынести кнопку "Установить приложение" в интерфейс
  setBeforeInstallPromptPWA: (prompt) => {
    set(
      {
        beforeInstallPromptPWA: prompt
      }
    )
  },
  showWebAuthnRegistrationMessage: false
}));

export function clearCustomerData() {
  useStore.setState({ currentCustomer: {} });
}