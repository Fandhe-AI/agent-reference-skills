---
source: https://docs.expo.dev/push-notifications/what-you-need-to-know/
---

# What you need to know about notifications

Notification types and their behavior on Android and iOS. Expo's notification support builds on the native functionality of each platform; native concepts and behaviors apply.

## Signature / Usage

Delivery behavior when a push notification arrives:

| Notification type | App in foreground | App in background | App terminated |
| --- | --- | --- | --- |
| Notification Message and Notification Message with data payload | delivery runs `NotificationReceivedListener` and JS task | OS shows notification | OS shows notification |
| Headless Background Notification | delivery runs `NotificationReceivedListener` and JS task | delivery runs JS task | delivery runs JS task |

Handlers triggered when the user interacts with the notification (for example, presses an action button):

| App state | iOS Listener(s) triggered | Android Listener(s) triggered |
| --- | --- | --- |
| Foreground | `NotificationResponseReceivedListener` | `NotificationResponseReceivedListener` |
| Background | `NotificationResponseReceivedListener` | `NotificationResponseReceivedListener` and JS task |
| Terminated | `NotificationResponseReceivedListener` | JS task |

"JS task" refers to a task registered with `registerTaskAsync` from `expo-notifications`. Whenever `NotificationResponseReceivedListener` is triggered, the `useLastNotificationResponse` return value also changes.

Example (from the `expo-notifications` API reference): respond to a notification tap by opening a URL stored in the notification's `data`.

```jsx
import * as React from 'react';
import * as Notifications from 'expo-notifications';
import { Linking } from 'react-native';

export default function App() {
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  React.useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content.data.url &&
      lastNotificationResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      Linking.openURL(lastNotificationResponse.notification.request.content.data.url);
    }
  }, [lastNotificationResponse]);
  return (
    // Your app content
  );
}
```

## Notes

- Snippet taken from the expo-notifications API reference; this page itself has no code. The `import * as React from 'react';` line was added because the original snippet calls `React.useEffect` without importing React.
- Remote vs local: push notifications (remote) are sent from a remote server; local notifications (in-app / scheduled) are created and displayed from within the app. `expo-notifications` supports both. A development build is required for push notifications since the capability is not built into Expo Go.
- Application states: Foreground (interface displayed), Background (minimized), Terminated (killed, usually by swiping away in the app switcher). On Android, if the user force-stops the app from device settings, it must be manually reopened for notifications to start working (an Android limitation).
- When the app is in the foreground, the app controls how an incoming notification is handled (present it, show custom in-app UI, or ignore it) via `NotificationHandler` (`setNotificationHandler`).
- When the app is not running or was killed and is launched by tapping a notification, register `NotificationResponseReceivedListener` as early as possible (module top-level) on iOS. Also check `useLastNotificationResponse` or `getLastNotificationResponse` during startup rather than relying on the listener alone; this is also the recommended approach for action buttons that bring the app to the foreground.
- Notification Message: specifies presentational information such as title or body. On Android it corresponds to a request containing `AndroidNotification`; on iOS to a request containing the `aps.alert` dictionary with the `apns-push-type` header set to `alert`. With the Expo Push Service, specifying `title`, `subtitle`, `body`, `icon`, or `channelId` produces a Notification Message.
- Notification Message with data payload: an Android-only term, where the request contains both a `data` field and a `notification` field. On iOS, extra data may be part of a regular Notification Message.
- Headless Background Notification: does not specify title or body; carries JSON data processed by a JavaScript task registered via `registerTaskAsync`. It corresponds to the FCM Data Message on Android and the background notification on iOS. It can run JavaScript even when the app is terminated, but the OS does not guarantee delivery to the app (for example, Android Doze mode, or too many background notifications; Apple recommends not sending more than two or three per hour). With the Expo Push Service, specifying only `data` and `contentAvailable: true` (and other non-interactive fields such as `ttl`) produces one. On iOS it must be configured first (see the Notifications API "Background notification configuration"). Prefer a regular Notification Message if you don't need to run JavaScript in the background.
- Exception: when `title` or `message` is specified inside `data`, `expo-notifications` automatically presents the headless notification on Android, but not on iOS (the docs state a plan to make this consistent in a future release).
- Data-only / "silent" notifications: Android Data Messages have no exact iOS equivalent; the close equivalent is Headless Background Notifications. "Silent notification" is another name for the same.
- Page modificationDate: August 07, 2026 (unversioned guide, fetched 2026-10-17).
- Distance line: APNs payload semantics are covered by `apple-app-services`; FCM message types by `android-platform-core`.

## Related

- [Notifications](./notifications.md)
- [Send notifications with the Expo Push Service](./sending-notifications.md)
- [Handle incoming notifications](./receiving-notifications.md)
- [TaskManager](./task-manager.md)
