---
source: https://docs.expo.dev/push-notifications/receiving-notifications/
---

# Handle incoming notifications

The `expo-notifications` library contains event listeners that handle how the app responds when receiving a notification.

## Signature / Usage

`addNotificationReceivedListener` and `addNotificationResponseReceivedListener` receive an object when a notification is received or interacted with. They let you add behavior when notifications arrive while the app is open and foregrounded, and when the app is backgrounded or closed and the user taps the notification.

```js
useEffect(() => {
  registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  const notificationListener = Notifications.addNotificationReceivedListener(notification => {
    console.log(notification);
  });

  const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
    console.log(response);
  });

  return () => {
    notificationListener.remove();
    responseListener.remove();
  };
}, []);
```

Custom data is available at `notification.request.content.data`:

```json
{
  "senderId": "user123",
  "senderName": "John Doe",
  "messageId": "msg789",
  "conversationId": "conversation-456",
  "messageType": "text",
  "timestamp": 1724766427
}
```

### Foreground notification handler

```jsx
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
```

Options set via `handleNotification()`: `shouldPlaySound`, `shouldSetBadge`, `shouldShowBanner`, `shouldShowList`.

Disable the handler (SDK 58 and later):

```jsx
Notifications.setNotificationHandler(null);
```

## Notes

- Android `notification` object (from `addNotificationReceivedListener`): `request.trigger.remoteMessage` holds the FCM message (`notification`, `data`, `from`, `messageId`, `priority`, `ttl`, `collapseKey`, ...), `request.trigger.channelId` / `type: "push"`, `request.content` holds `title`, `body`, `subtitle`, `sound`, `badge`, `data`, and `request.identifier`; `date` is the top-level timestamp. The `data` entries in `remoteMessage.data` include Expo-added keys such as `channelId`, `scopeKey`, `experienceId`, `projectId`, and the user payload is delivered as a JSON string in `data.body`, which is parsed into `request.content.data`.
- iOS `notification` object: `request.trigger` has `class: "UNPushNotificationTrigger"`, `type: "push"`, and `payload` with `aps` (`alert`, `badge`, `sound`, `thread-id`, `category`) plus the user `body` object; `request.content` has `title`, `subtitle`, `body`, `sound`, `badge`, `data`, `categoryIdentifier`, `threadIdentifier`, `interruptionLevel`, `attachments`, `targetContentIdentifier`, `summaryArgument`, `summaryArgumentCount`, `launchImageName`. See the Notifications API `Notification` type for the full definition.
- Foreground behavior changed in SDK 58. SDK 57 and earlier: a foreground notification is not shown at all by default; set a handler with `setNotificationHandler` to show it, and a handler that does not respond within 3 seconds drops the notification. SDK 58 and later: a notification that arrives while the app is foregrounded is shown by default (plays a sound, shows a banner, appears in the notification list, sets the app badge); a notification whose handler does not respond within 3 seconds is shown the same way.
- `setNotificationHandler(null)` (SDK 58+): on Android the notification is then not shown while the app is in the foreground. On iOS the decision goes to the `UNUserNotificationCenterDelegate` that another library sets; if no library sets one, the notification is not shown.
- Closed notification behavior: on Android, OS-level settings usually around performance and battery optimization can prevent notifications from being delivered when the app is closed (for example, the **Deep Clear** option on OnePlus devices using Android 9 and lower).
- Page modificationDate: August 19, 2026 (unversioned guide, fetched 2026-10-17).
- Distance line: APNs / `UNUserNotificationCenterDelegate` behavior is covered by `apple-app-services`; Android notification channels and FCM message handling by `android-platform-core`.

## Related

- [What you need to know about notifications](./what-you-need-to-know.md)
- [Notifications](./notifications.md)
- [Expo push notifications setup](./push-notifications-setup.md)
