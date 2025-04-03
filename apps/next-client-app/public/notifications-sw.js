self.addEventListener('install', async () => {
  console.log('[Service Worker] installed');
})

self.addEventListener('push', async (event) => {
  console.log('[Service Worker] Push Received.');
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: data.icon || '/icon.png',
      badge: '/badge.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
      },
    }
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
})

self.addEventListener("notificationclick", (event) => {
  console.log("On notification click: ", event.notification.tag);
  event.notification.close();

  // Проверяем открыт ли сервис и переходим, либо открываем в новой вкладке
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === event.notification.data?.link && "focus" in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow(event.notification.data?.link || '/');
      }),
  );
});
