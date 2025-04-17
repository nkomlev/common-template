'use client';
import React, { useState, useEffect } from 'react';
import { subscribeUser, unsubscribeUser, sendNotification } from "@/server/functions/webPush";
import { InputWithTitle } from "@common-templates/shared/components/ui/input";
import { Button } from "@common-templates/shared/components/ui/button";
import { useStore } from "@/store/useStore";
import GroupSelect from "@/components/groupSelect/GroupSelect";

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/\\-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
function PushNotificationManager() {
  const { currentCustomer } = useStore();
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/notifications-sw.js', {
      scope: '/',
      updateViaCache: 'none',
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      ),
    });
    setSubscription(sub);
    await subscribeUser(JSON.stringify(sub));
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message, selectedGroup);
      setMessage('');
    }
  }

  if (!currentCustomer.id) return null;

  if (!isSupported) {
    return <p>
      Пуш уведомления не поддержаны в вашем браузере
    </p>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">
        Пуш уведомления
      </h3>
      {subscription ? (
        <div className="flex flex-col gap-4 max-w-80">
          <p>
            Вы подписаны на уведомления
          </p>
          <Button onClick={unsubscribeFromPush}>
            Отписаться
          </Button>
          <InputWithTitle
            title="Текст уведомления"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <GroupSelect
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />
          <Button onClick={sendTestNotification}>
            Отправить уведомление
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-80">
          <p>
            Вы не подписаны на уведомления
          </p>
          <Button onClick={subscribeToPush}>
            Подписаться
          </Button>
        </div>
      )}
    </div>
  );
}

export default PushNotificationManager