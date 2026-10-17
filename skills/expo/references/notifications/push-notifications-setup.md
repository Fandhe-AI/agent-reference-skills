---
source: https://docs.expo.dev/push-notifications/push-notifications-setup/
---

# Expo push notifications setup

How to set up push notifications, get credentials for development and production, and send a test push notification. The client needs the user's permission and the app's `ExpoPushToken`.

## Signature / Usage

```sh
npx expo install expo-notifications expo-constants
```

Add the config plugin in app config:

```json
{
  "expo": {
    "plugins": [
      "expo-notifications"
    ]
  }
}
```

Minimal registration code (from the official working example):

```tsx
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    throw new Error('Permission not granted to get push token for push notification!');
  }
  const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
  if (!projectId) {
    throw new Error('Project ID not found');
  }
  return (await Notifications.getExpoPushTokenAsync({ projectId })).data;
}
```

Listeners used in the example component:

```tsx
const notificationListener = Notifications.addNotificationReceivedListener(notification => {
  setNotification(notification);
});
const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
  console.log(response);
});
return () => {
  notificationListener.remove();
  responseListener.remove();
};
```

Build and test:

```sh
eas build
npx expo start
```

Then enter the generated `ExpoPushToken` into the Expo push notifications tool at `https://expo.dev/notifications` and click **Send a Notification**.

## Notes

- Libraries: `expo-notifications` requests permission and obtains the `ExpoPushToken`; `expo-constants` gets the `projectId` from app config.
- `projectId` attributes the Expo push token to the specific project (for EAS projects it is the project UUID). It is set automatically when a development build is created, but the guide recommends setting it manually via `expo-constants`. Attributing the token to the project ID means it doesn't change when a project is transferred between accounts or the account is renamed.
- Test devices: a physical Android or iOS device, an Android Emulator with Google Play services, or an iOS Simulator on Xcode 14 or later (macOS 13+, iOS 16+).
- The guide uses EAS Build because the EAS project also holds the notification credentials; `expo-notifications` can also be used with local builds.
- Android credentials: configure FCM and follow the FCM V1 credentials page.
- iOS credentials: a paid Apple Developer Account is required. Register the iOS device before the first `eas build`. On the first development build, answer yes to "Setup Push Notifications for your project" and "Generating a new Apple Push Notifications service key". Without EAS Build, run `eas credentials` manually.
- To use FCM / APNs directly instead of the Expo push notification service, the `expo-notifications` API is push-service agnostic; see the custom sending page.
- Page modificationDate: July 28, 2026 (unversioned guide, fetched 2026-10-17).
- Distance line: APNs key / entitlement concepts are covered by `apple-app-services`; FCM / Android notification channels by `android-platform-core`.

## Related

- [Obtain Google Service Account Keys using FCM V1](./fcm-credentials.md)
- [Send notifications with the Expo Push Service](./sending-notifications.md)
- [Send notifications with FCM and APNs](./sending-notifications-custom.md)
- [Notifications](./notifications.md)
