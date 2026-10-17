---
source: https://docs.expo.dev/push-notifications/overview/
---

# Expo push notifications: Overview

An overview of the Expo push notification service. Expo handles much of the complexity of communicating with Firebase Cloud Messaging (FCM) or Apple Push Notification Service (APNs), so Android and iOS notifications can be treated in the same way on the front-end and back-end.

## Signature / Usage

Typical flow, using the endpoint documented in the setup guide:

```ts
await fetch('https://exp.host/--/api/v2/push/send', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Accept-encoding': 'gzip, deflate',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ to: expoPushToken, title: 'Original Title', body: 'And here is the body!' }),
});
```

## Notes

- Guide sequence: what you need to know about notifications, set up push notifications and get a push token and credentials, send push notifications by calling the Expo Push Service API from your server, handle incoming notifications.
- A troubleshooting and FAQ page exists in the official docs (`/push-notifications/faq/`); it is not included in this skill.
- Page modificationDate: June 06, 2025 (unversioned guide, fetched 2026-10-17).
- Distance line: APNs and FCM themselves are covered by `apple-app-services` and `android-platform-core`.

## Related

- [What you need to know about notifications](./what-you-need-to-know.md)
- [Expo push notifications setup](./push-notifications-setup.md)
- [Send notifications with the Expo Push Service](./sending-notifications.md)
- [Handle incoming notifications](./receiving-notifications.md)
