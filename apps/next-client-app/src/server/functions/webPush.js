'use server';

import webpush from 'web-push';
import prisma from "../../../../../prisma";
import {cookies} from "next/headers";

webpush.setVapidDetails(
  'mailto:test@example.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

let subscription = null;

export async function subscribeUser(sub) {
  try {
    subscription = sub;
    delete sub.expirationTime;

    const currentCustomerId = Number((await cookies()).get('customerId').value)

    const existSubForCurrentUser = await prisma.pushSubscription.findFirst({
      where: {
        customerId: currentCustomerId
      }
    });

    if (existSubForCurrentUser) {
      await prisma.pushSubscription.update({
        where: {
          id: existSubForCurrentUser.id
        },
        data: sub
      });
    } else {
      sub.customer = {
        connect: {
          id: currentCustomerId
        }
      }
      await prisma.pushSubscription.create({
        data: sub
      });
    }

    console.log('Saved push subscription for user: ', currentCustomerId);

    return { success: true };
  } catch (e) {
    console.log('Web-push subscribe user error: ', e);
    return { success: false };
  }

}

export async function unsubscribeUser() {
  try {
    const currentCustomerId = Number((await cookies()).get('customerId').value)

    const existSubForCurrentUser = await prisma.pushSubscription.findFirst({
      where: {
        customerId: currentCustomerId
      }
    });

    if (existSubForCurrentUser) {
      await prisma.pushSubscription.delete({
        where: {
          id: existSubForCurrentUser.id
        }
      });
      subscription = null;
    }
    console.log('Deleted push subscription for user: ', currentCustomerId);
    return { success: true };
  } catch (e) {
    console.log('Web-push unsubscribe user error: ', e);
    return { success: false };
  }
}

export async function sendNotification(message, notificationGroup = '') {
  try {
    let subscriptions

    if (notificationGroup && notificationGroup !== 'All') {
      const { customers } = await prisma.notificationGroup.findFirst({
        where: {
          name: notificationGroup
        },
        select: {
          customers: {
            select: {
              id: true
            }
          }
        }
      }) || { customers: [] };

      subscriptions = await prisma.pushSubscription.findMany({
        where: {
          customerId: {
            in: customers.map(e => e.id)
          }
        }
      })
    } else {
      subscriptions = await prisma.pushSubscription.findMany();
    }

    if (!subscriptions) {
      console.log('No subscriptions');
      return { success: true, message: 'No subscriptions to send' };
    }

    for (let sub of subscriptions) {
      await webpush.sendNotification(
        sub,
        JSON.stringify({
          title: 'Test Notification',
          body: message,
          icon: '/icon.png',
          link: 'http://localhost:3000'
        })
      );
    }
    console.log(`Notification sent to ${subscriptions.length} customers`)
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, error: 'UNEXPECTED_ERROR', message: 'Failed to send notification' };
  }
}