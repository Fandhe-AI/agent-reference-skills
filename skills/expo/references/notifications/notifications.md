---
source: https://docs.expo.dev/versions/v58.0.0/sdk/notifications/
---

# Notifications

`expo-notifications` provides an API to fetch push notification tokens and to present, schedule, receive and respond to notifications.

## Signature / Usage

```sh
npx expo install expo-notifications
```

```ts
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Present a local (in-app) notification immediately
Notifications.scheduleNotificationAsync({
  content: {
    title: 'Look at that notification',
    body: "I'm so proud of myself!",
  },
  trigger: null,
});
```

Features: schedule one-off or repeating notifications; get and set the app badge number; obtain a native device push token (FCM on Android, APNs on iOS) or an Expo push token (for the Expo Push Service); listen to incoming notifications and interactions; handle notifications in the foreground; dismiss notifications from the tray; create, update and delete Android notification channels; set custom icon and color on Android.

### Register for push notifications (from the page's example)

```ts
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('myNotificationChannel', {
      name: 'A channel is needed for the permissions prompt to appear',
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
    handleRegistrationError('Permission not granted to get push token for push notification!');
    return;
  }
  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
  if (!projectId) {
    handleRegistrationError('Project ID not found');
  }
  try {
    const pushTokenString = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    return pushTokenString;
  } catch (e: unknown) {
    handleRegistrationError(`${e}`);
  }
}
```

### Handle push notifications with navigation (Expo Router)

```tsx
// app/_layout.tsx
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Slot, router } from 'expo-router';

function useNotificationObserver() {
  useEffect(() => {
    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url;
      if (typeof url === 'string') {
        router.push(url);
        Notifications.clearLastNotificationResponse();
      }
    }

    const response = Notifications.getLastNotificationResponse();
    if (response?.notification) {
      redirect(response.notification);
    }

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      redirect(response.notification);
    });

    return () => {
      subscription.remove();
    };
  }, []);
}

export default function Layout() {
  useNotificationObserver();

  return <Slot />;
}
```

For React Navigation, configure the `linking` prop of `NavigationContainer`: in `getInitialURL` read `Notifications.getLastNotificationResponse()?.notification.request.content.data?.url`, and in `subscribe` add `Notifications.addNotificationResponseReceivedListener` that calls `listener(url)` and then `Notifications.clearLastNotificationResponse()`; remove both subscriptions on cleanup.

### Headless (Background) notifications

To handle notifications while the app is in the background or not running:

1. Add the `expo-task-manager` package.
2. Configure background notifications: on iOS the `remote-notification` value must be in `UIBackgroundModes` in Info.plist. With CNG set `enableBackgroundRemoteNotifications: true` in the config plugin. Without CNG, add to your app target's Info.plist:

```xml
<key>UIBackgroundModes</key>
<array>
  <string>remote-notification</string>
</array>
```

3. In app code, set up a background task with `registerTaskAsync`.

Then send a push notification that contains only the `data` key (no `title`, `body`) and has `contentAvailable: true` for iOS.

### Custom notification sounds

Add the plugin `sounds` array (paths local to the project), build, then provide ONLY the base filename:

```ts
await Notifications.setNotificationChannelAsync('new_emails', {
  name: 'E-mail notifications',
  importance: Notifications.AndroidImportance.HIGH,
  sound: 'mySoundFile.wav', // Provide ONLY the base filename
});

await Notifications.scheduleNotificationAsync({
  content: {
    title: "You've got mail! 📬",
    sound: 'mySoundFile.wav', // Provide ONLY the base filename
  },
  trigger: {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: 2,
    channelId: 'new_emails',
  },
});
```

- Manual Android: on Android 8.0+ the `NotificationChannel` must also be configured with the `sound`, and the notification must use that `channelId`. Place the file in `android/app/src/main/res/raw/` (for example `email_sound.wav`). Set `sound` on the content for Android below 8.0.
- Manual iOS: place the sound file in the Xcode project and set `sound: 'notification.wav'` in `NotificationContentInput`.

## Options / Props

### Configuration

Credentials: follow the push notifications setup guide ([push-notifications-setup.md](./push-notifications-setup.md)).

Use the built-in config plugin in the app config (for EAS Build or `npx expo run:[android|ios]`). These properties cannot be set at runtime and require a new app binary.

| Name | Default | Description |
| --- | --- | --- |
| `icon` | - | Only for: Android. Local path to an image to use as the icon for push notifications. 96x96 all-white png with transparency. |
| `largeIcon` | - | Only for: Android. Local path to an image to use as the large icon for notifications. The image is resized to 64x64 dp and shown next to the notification text. A notification that carries its own image uses that image instead. |
| `color` | `#ffffff` | Only for: Android. Tint color for the push notification image when it appears in the notification tray. |
| `defaultChannel` | - | Only for: Android. Default channel for FCMv1 notifications. |
| `sounds` | - | Array of local paths to sound files (.wav recommended) that can be used as custom notification sounds. Sound will not be played when focus mode does not permit it or silent mode is on. |
| `enableRemoteNotifications` | `true` | Only for: iOS. Whether to enable remote notifications. If `false`, the plugin does not add the APNs entitlement (useful for apps that use only local notifications); remote notifications do not work in this case. |
| `enableBackgroundRemoteNotifications` | `false` | Only for: iOS. Whether to enable background remote notifications; updates the `UIBackgroundModes` key in `Info.plist` to include `remote-notification`. |

```json
{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./local/assets/notification_icon.png",
          "largeIcon": "./local/assets/notification_large_icon.png",
          "color": "#ffffff",
          "defaultChannel": "default",
          "sounds": [
            "./local/assets/notification_sound.wav",
            "./local/assets/notification_sound_other.wav"
          ],
          "enableRemoteNotifications": true,
          "enableBackgroundRemoteNotifications": false
        }
      ]
    ]
  }
}
```

The iOS APNs entitlement is set to `development` when `enableRemoteNotifications` is `true` (default); Xcode changes it to `production` in the archive generated by a release build.

### Permissions

Android:

| Android permission | Description |
| --- | --- |
| `RECEIVE_BOOT_COMPLETED` | Added automatically through the library's AndroidManifest.xml. Used to set up scheduled notifications when the device (re)starts. |
| `SCHEDULE_EXACT_ALARM` | Allows applications to use exact alarm APIs. From Android 12 (API 31), required to schedule a notification at an exact time; add `<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM"/>`. Android 14 (API 34) and later deny it by default for newly installed apps. |
| `USE_EXACT_ALARM` | Like `SCHEDULE_EXACT_ALARM` without a user prompt. On Android 13 (API 33) and later, alarm clock, timer and calendar apps can declare it; Google Play's exact alarm policy restricts it to those app categories. |

- The `delivery: 'alarmClock'` trigger option also requires an exact alarm permission. Check and request with `getExactAlarmPermissionsAsync` / `requestExactAlarmPermissionsAsync`.
- On Android 13, users must opt in via a system permissions prompt, which does not appear until at least one notification channel is created. Call `setNotificationChannelAsync` before `getDevicePushTokenAsync` / `getExpoPushTokenAsync`.

iOS: no usage description is required. Permissions are more granular than on Android, so rely on `NotificationPermissionsStatus`'s `ios.status` field instead of the root `status`. Values under `Notifications.IosAuthorizationStatus`: `NOT_DETERMINED`, `DENIED`, `AUTHORIZED`, `PROVISIONAL`, `EPHEMERAL`.

### Notification channels, categories, icon and color

- Android 8.0 (API 26)+ requires every notification to be assigned to a channel. If none is specified, `expo-notifications` creates a fallback channel named **Miscellaneous**. Channel methods are no-ops on platforms without channels (Android below 8.0 and iOS).
- Notification categories create interactive notifications (buttons or text response). Register with `setNotificationCategoryAsync`, then set `categoryIdentifier` in the content.
- `icon` and `color` are build-time settings via the config plugin (rebuild with `eas build -p android` or `npx expo run:android`). The icon must be all white with a transparent background. A per-notification color can be set via `NotificationContentInput.color`.

### Methods

All methods are supported on Android and iOS unless noted.

#### Fetch tokens

| Method | Returns | Description |
| --- | --- | --- |
| `addPushTokenListener(listener: PushTokenListener)` | `EventSubscription` | Called whenever the push token changes. In rare cases the push service rolls a token while the app is running; the old one becomes invalid. |
| `getDevicePushTokenAsync()` | `Promise<DevicePushToken>` | Returns a native FCM, APNs token or a `PushSubscription` data usable with another push service. |
| `getExpoPushTokenAsync(options?: ExpoPushTokenOptions)` | `Promise<ExpoPushToken>` | Returns an Expo token for the Expo Push Service. Makes requests to Expo's servers and can be rejected (offline, timeout); use try/catch with retry. Requires push notification keys, see the setup guide. |

```ts
const expoPushToken = await Notifications.getExpoPushTokenAsync({
  projectId: 'your-project-id',
});
```

#### Listen to notification events

| Method | Returns | Description |
| --- | --- | --- |
| `addNotificationReceivedListener(listener: (event: Notification) => void)` | `EventSubscription` | Called whenever a notification is received while the app is running. |
| `addNotificationResponseReceivedListener(listener: (event: NotificationResponse) => void)` | `EventSubscription` | Called whenever a user interacts with a notification (for example, taps it). |
| `addNotificationsDroppedListener(listener: () => void)` | `EventSubscription` | Called when notifications were dropped by the server. Applicable only to FCM on Android; corresponds to `onDeletedMessages()`. |
| `useLastNotificationResponse()` | `MaybeNotificationResponse` | React hook. Returns `undefined` until known, `null` if no response yet, or a `NotificationResponse`. Clear with `clearLastNotificationResponseAsync()`. |

```jsx
import * as React from 'react';
import * as Notifications from 'expo-notifications';

React.useEffect(() => {
  const subscription = Notifications.addNotificationReceivedListener(notification => {
    console.log(notification);
  });
  return () => subscription.remove();
}, []);
```

#### Present incoming notifications while the app runs

| Method | Returns | Description |
| --- | --- | --- |
| `setNotificationHandler(handler: NotificationHandler \| null)` | `void` | Sets the callback that decides whether a notification received while the app is running is shown. `handleNotification` must respond within 3 seconds, otherwise the notification is presented. `null` removes the handler: on Android the notification is then not shown in the foreground; on iOS the decision goes to a `UNUserNotificationCenterDelegate` set by another library, and the notification is not shown if there is none. Until a handler is set (or on timeout) the notification is shown with banner, list, sound and the badge from the notification. |

#### Run JavaScript in response to incoming notifications

| Method | Returns | Description |
| --- | --- | --- |
| `registerTaskAsync(taskName: string)` | `Promise<null>` | Registers a `TaskManager` task that runs when a notification is received in foreground, background or terminated state. Only on Android the task also runs in response to a notification action tap when the app is backgrounded or terminated. When terminated, only a Headless Background Notification triggers it. The OS may not deliver (Doze mode on Android; Apple recommends not sending more than two or three per hour). |
| `unregisterTaskAsync(taskName: string)` | `Promise<null>` | Unregisters a task registered with `registerTaskAsync`. |

Define the task with `TaskManager.defineTask` in module scope of a JS module required early (for example `index.ts`). The task callback receives `data` (see `NotificationTaskPayload`), `executionInfo` (includes `taskName`), and `error` (always undefined for push-notification tasks). It may return a `BackgroundNotificationTaskResult` value for the iOS background fetch result. `console.log` may not be visible when debugging background tasks.

```ts
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

TaskManager.defineTask<Notifications.NotificationTaskPayload>(BACKGROUND_NOTIFICATION_TASK, ({ data, executionInfo, error }) => {
  console.log('Received a notification task payload!');
  const isNotificationResponse = 'actionIdentifier' in data;
  if (isNotificationResponse) {
    // Do something with the notification response from user
  } else {
    // Do something with the data from notification that was received
  }
  return Notifications.BackgroundNotificationTaskResult.NoData;
});

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
```

#### Permissions

| Method | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `getExactAlarmPermissionsAsync()` | Android | `Promise<PermissionResponse>` | Checks whether the app can schedule exact alarms. Without it scheduled notifications arrive at an approximate time and `delivery: 'alarmClock'` falls back to `'bestEffort'`. Always granted below Android 12, and on Android 13+ for apps declaring `USE_EXACT_ALARM`. If denied and the app does not declare `SCHEDULE_EXACT_ALARM`, `canAskAgain` is `false`. Always granted on iOS and web. |
| `getPermissionsAsync()` | Android, iOS | `Promise<NotificationPermissionsStatus>` | Checks current notification permission settings; no user-facing effect. |
| `requestExactAlarmPermissionsAsync()` | Android | `Promise<PermissionResponse>` | Opens the system settings screen for exact alarms and resolves when the user returns. Rejects if the app does not declare `android.permission.SCHEDULE_EXACT_ALARM` (declare via the `android.permissions` app config property). If the user revokes the permission there, Android restarts the app and the Promise never resolves; call `getExactAlarmPermissionsAsync` on next launch. |
| `requestPermissionsAsync(permissions?: NotificationPermissionsRequest)` | Android, iOS | `Promise<NotificationPermissionsStatus>` | Prompts for permissions. Defaults to asking for alerts, badge count and sounds. |

```ts
export function requestPermissionsAsync() {
  return Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
    },
  });
}
```

#### Badge

| Method | Returns | Description |
| --- | --- | --- |
| `getBadgeCountAsync()` | `Promise<number>` | Current badge number; `0` means no badge. If the Android launcher does not support badges it always resolves to `0`. |
| `setBadgeCountAsync(badgeCount: number, options?: SetBadgeCountOptions)` | `Promise<boolean>` | Sets the badge; `0` clears it. On iOS requires `allowBadge` permission via `requestPermissionsAsync`, otherwise returns `false`. Resolves `false` on Android launchers without badge support. |

#### Schedule notifications

| Method | Returns | Description |
| --- | --- | --- |
| `cancelAllScheduledNotificationsAsync()` | `Promise<void>` | Cancels all scheduled notifications. |
| `cancelScheduledNotificationAsync(identifier: string)` | `Promise<void>` | Cancels one scheduled notification by the identifier returned from `scheduleNotificationAsync`. |
| `getAllScheduledNotificationsAsync()` | `Promise<NotificationRequest[]>` | Fetches all scheduled notifications. |
| `getNextTriggerDateAsync(trigger: SchedulableNotificationTriggerInput)` | `Promise<number \| null>` | Next trigger date as Unix timestamp in milliseconds; `null` means it will not trigger. |
| `scheduleNotificationAsync(request: NotificationRequestInput)` | `Promise<string>` | Schedules a notification; resolves to its identifier. Scheduling does not by itself decide presentation: while the app is foregrounded, the handler set with `setNotificationHandler` decides. In SDK 58, if no handler is set or it does not respond within 3 seconds, the notification is presented; after `setNotificationHandler(null)` it is not shown in the foreground on Android. When the app is in the background, the OS presents it. |

```ts
Notifications.scheduleNotificationAsync({
  content: {
    title: 'Remember to drink water!',
  },
  trigger: {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: 60 * 20,
    repeats: true,
  },
});
```

```ts
const date = new Date(Date.now() + 60 * 60 * 1000);
date.setMinutes(0);
date.setSeconds(0);

Notifications.scheduleNotificationAsync({
  content: { title: 'Happy new hour!' },
  trigger: {
    type: Notifications.SchedulableTriggerInputTypes.DATE,
    date,
  },
});
```

#### Dismiss notifications

| Method | Returns | Description |
| --- | --- | --- |
| `dismissAllNotificationsAsync()` | `Promise<void>` | Removes all of the app's notifications from the tray / Notification Center. |
| `dismissNotificationAsync(notificationIdentifier: string)` | `Promise<void>` | Removes one notification from the tray. |
| `getPresentedNotificationsAsync()` | `Promise<Notification[]>` | Notifications currently in the tray. Resolves to an empty array on Android below 6.0 (API 23). |

#### Notification channels (Android)

| Method | Returns | Description |
| --- | --- | --- |
| `deleteNotificationChannelAsync(channelId: string)` | `Promise<void>` | Removes the channel (resolves also if none exists). |
| `deleteNotificationChannelGroupAsync(groupId: string)` | `Promise<void>` | Removes the group and all channels belonging to it. |
| `getNotificationChannelAsync(channelId: string)` | `Promise<NotificationChannel \| null>` | One channel, or `null`. Always `null` on platforms without channels. |
| `getNotificationChannelGroupAsync(groupId: string)` | `Promise<NotificationChannelGroup \| null>` | One group, or `null`. |
| `getNotificationChannelGroupsAsync()` | `Promise<NotificationChannelGroup[]>` | All groups; empty array where unsupported. |
| `getNotificationChannelsAsync()` | `Promise<NotificationChannel[]>` | All channels; empty array where unsupported. |
| `setNotificationChannelAsync(channelId: string, channel: NotificationChannelInput)` | `Promise<NotificationChannel \| null>` | Creates or updates a channel (optionally assigns it to a group). After creation only name and description can be modified (Android OS limitation). For some settings to apply on all Android versions, duplicate the configuration on both the notification and its channel (for example custom sound: on the content for below 8.0, on the channel for 8.0+). Resolves `null` where unsupported. |
| `setNotificationChannelGroupAsync(groupId: string, group: NotificationChannelGroupInput)` | `Promise<NotificationChannelGroup \| null>` | Creates or updates a channel group. |

#### Notification categories

| Method | Returns | Description |
| --- | --- | --- |
| `deleteNotificationCategoryAsync(identifier: string)` | `Promise<boolean>` | `true` if deleted, `false` otherwise (for example the category does not exist). |
| `getNotificationCategoriesAsync()` | `Promise<NotificationCategory[]>` | All known categories. |
| `setNotificationCategoryAsync(identifier: string, actions: NotificationAction[], options?: NotificationCategoryOptions)` | `Promise<NotificationCategory>` | Sets a category. Do not use the characters `:` or `-` in the identifier, or categories might not work as expected. |

#### Other methods and constants

| Name | Platforms | Description |
| --- | --- | --- |
| `Notifications.DEFAULT_ACTION_IDENTIFIER` | Android, iOS | Constant, type `'expo.modules.notifications.actions.DEFAULT'`. Equals `NotificationResponse.actionIdentifier` when the user taps the notification. |
| `Notifications.clearLastNotificationResponse()` | Android, iOS | Returns `void`. Clears the most recent notification response (also clears the value returned by `useLastNotificationResponse`). |
| `Notifications.clearLastNotificationResponseAsync()` | Android, iOS | `Promise<void>`. Same as above, asynchronous; resolves if the native call was successful. |
| `Notifications.getLastNotificationResponse()` | Android, iOS | `NotificationResponse \| null`. Most recent response. |
| `Notifications.getLastNotificationResponseAsync()` | Android, iOS | `Promise<NotificationResponse \| null>`. Most recent response, asynchronous. |
| `Notifications.subscribeToTopicAsync(topic: string)` | Android | `Promise<null>`. Subscribes the device to a push topic. |
| `Notifications.unsubscribeFromTopicAsync(topic: string)` | Android | `Promise<null>`. Unsubscribes the device from a topic. |
| `Notifications.unregisterForNotificationsAsync()` | Android, iOS | `Promise<void>`. |

### Interfaces

#### Content, requests and responses

| Name | Fields |
| --- | --- |
| `Notification` | `date: number`, `request: NotificationRequest` |
| `NotificationRequest` | `content: NotificationContent`, `identifier: string`, `trigger: NotificationTrigger` |
| `NotificationRequestInput` | `content: NotificationContentInput`, `identifier?: string`, `trigger: NotificationTriggerInput` |
| `NotificationResponse` | `actionIdentifier: string`, `notification: Notification`, `userText?: string` |
| `NotificationHandler` | `handleNotification: (notification: Notification) => Promise<NotificationBehavior>`; `handleError?: (notificationId: string, error: NotificationHandlingError) => void`; `handleSuccess?: (notificationId: string) => void` |
| `NotificationBehavior` | `shouldPlaySound: boolean`, `shouldSetBadge: boolean` (iOS), `shouldShowBanner: boolean`, `shouldShowList: boolean`, `priority?: AndroidNotificationPriority`, `shouldShowAlert?: boolean` (Deprecated: specify `shouldShowBanner` and / or `shouldShowList` instead) |
| `NotificationAction` | `buttonTitle: string`, `identifier: string`, `options?: { isAuthenticationRequired: boolean, isDestructive: boolean, opensAppToForeground: boolean }`, `textInput?: { placeholder: string, submitButtonTitle: string }` |
| `NotificationCategory` | `actions: NotificationAction[]`, `identifier: string`, `options?: NotificationCategoryOptions` |
| `ExpoPushToken` | `data: string`, `type: 'expo'` |
| `NativeDevicePushToken` | `data: string`, `type: 'ios' \| 'android'` |
| `ImplicitlySupportedDevicePushToken` | `data: any`, `type: Exclude<Platform.OS, ExplicitlySupportedDevicePushToken['type']>` |
| `EventSubscription` | method `remove(): void` removes the listener |
| `NotificationPermissionsRequest` | `android?: object` (all permissions granted by default on Android), `ios?: IosNotificationPermissionsRequest` |
| `NotificationPermissionsStatus` | extends `PermissionResponse`; `android?: { importance: number, interruptionFilter: number }`; `ios?: { alertStyle: IosAlertStyle, allowsAlert, allowsAnnouncements, allowsBadge, allowsCriticalAlerts, allowsDisplayInCarPlay, allowsDisplayInNotificationCenter, allowsDisplayOnLockScreen (boolean \| null each), allowsPreviews: IosAllowsPreviews \| null, allowsSound, providesAppNotificationSettings (boolean \| null), status: IosAuthorizationStatus }` |
| `PermissionResponse` | `canAskAgain: boolean`, `expires: PermissionExpiration`, `granted: boolean`, `status: PermissionStatus` |
| `IosNotificationPermissionsRequest` | all optional booleans: `allowAlert`, `allowBadge`, `allowCriticalAlerts`, `allowDisplayInCarPlay`, `allowProvisional`, `allowSound`, `provideAppNotificationSettings` |

#### ExpoPushTokenOptions

| Name | Type | Description |
| --- | --- | --- |
| `applicationId` | `string` | App the token is attributed to. Defaults to `Application.applicationId` from `expo-application`. |
| `baseUrl` | `string` | Endpoint URL override. |
| `development` | `boolean` | iOS only. Whether the token is for the sandbox APNs service. Defaults to `Application.getIosPushNotificationServiceEnvironmentAsync()` from `expo-application`, or `false`. |
| `deviceId` | `string` | - |
| `devicePushToken` | `DevicePushToken` | Device push token to register at the backend. Defaults to a token from `getDevicePushTokenAsync()`. |
| `projectId` | `string` | Project the token is attributed to. Defaults to `Constants.expoConfig.extra.eas.projectId` from `expo-constants`. Automatically set with EAS Build, but setting it manually is recommended (copy the value from app.json `extra.eas.projectId`). |
| `type` | `string` | Request body override. |
| `url` | `string` | Request URL override. |

#### NotificationContentInput

| Name | Type | Description |
| --- | --- | --- |
| `attachments` | `NotificationContentAttachmentIos[]` | iOS. Visual and audio attachments. |
| `autoDismiss` | `boolean` | Android. If `false`, the notification is not dismissed when clicked (Android `setAutoCancel`). |
| `badge` | `number` | Application badge number associated with the notification. |
| `body` | `string \| null` | Main content. |
| `categoryIdentifier` | `string` | iOS. Category identifier. |
| `color` | `string` | Android. Accent color (`#AARRGGBB` or `#RRGGBB`). |
| `data` | `Record<string, unknown>` | Data associated with the notification, not displayed. |
| `interruptionLevel` | `InterruptionLevel` | iOS. Importance and delivery timing. |
| `launchImageName` | `string` | Image or storyboard used when the app launches because of the notification. |
| `priority` | `string` | Android. Relative priority. |
| `sound` | `boolean \| 'default' \| 'defaultCritical' \| 'defaultRingtone' \| string` | Optional. `false` for silent. On Android 8+, control sounds via notification channels. `defaultCritical` and `defaultRingtone` are iOS only, `defaultCritical` requires the critical alerts entitlement. On iOS a custom filename including extension can be given if the file is in the plugin `sounds` array. |
| `sticky` | `boolean` | Android. If `true`, the notification cannot be dismissed by swipe (Android `isOngoing`; Firebase `sticky`). Defaults to `false`. |
| `subtitle` | `string \| null` | Android: `subText`. iOS: `subtitle`. |
| `threadIdentifier` | `string` | Groups related notifications (Android group key; iOS `threadIdentifier`). |
| `title` | `string \| null` | Notification title. |
| `vibrate` | `number[]` | Android. Vibration pattern. |

#### NotificationContent (output), NotificationContentAndroid, NotificationContentIos

`NotificationContent` = `NotificationContentIos | NotificationContentAndroid` extended by: `body: string | null`, `categoryIdentifier: string | null`, `data?: Record<string, unknown>`, `sound: 'default' | 'defaultCritical' | 'custom' | 'defaultRingtone' | null`, `subtitle: string | null`, `title: string | null`.

| Type | Fields |
| --- | --- |
| `NotificationContentAndroid` | `badge?: number`, `color?: string`, `priority?: AndroidNotificationPriority`, `threadIdentifier: string \| null`, `vibrationPattern?: number[]` |
| `NotificationContentIos` | `attachments`, `badge: number \| null`, `interruptionLevel?`, `launchImageName: string \| null`, `summaryArgument?: string \| null`, `summaryArgumentCount?: number`, `targetContentIdentifier?: string`, `threadIdentifier: string \| null` |
| `NotificationContentAttachmentIos` | `hideThumbnail?`, `identifier: string \| null`, `thumbnailClipArea?: { height, width, x, y }`, `thumbnailTime?: number`, `type: string \| null`, `typeHint?: string`, `url: string \| null` |

#### Channels (Android)

| Type | Fields |
| --- | --- |
| `NotificationChannel` | `audioAttributes: AudioAttributes`, `bypassDnd: boolean`, `description: string \| null`, `enableLights: boolean`, `enableVibrate: boolean`, `groupId?: string \| null`, `id: string`, `importance: AndroidImportance`, `lightColor: string`, `lockscreenVisibility: AndroidNotificationVisibility`, `name: string \| null`, `showBadge: boolean`, `sound: 'default' \| 'custom' \| null`, `vibrationPattern: number[] \| null` |
| `NotificationChannelInput` | `RequiredBy<Omit<NotificationChannel, 'id' \| 'audioAttributes' \| 'sound'> & { audioAttributes: AudioAttributesInput, sound: string \| null }, 'name' \| 'importance'>` |
| `NotificationChannelGroup` | `channels: NotificationChannel[]`, `description?: string \| null`, `id: string`, `isBlocked?: boolean`, `name: string \| null` |
| `NotificationChannelGroupInput` | `description?: string \| null`, `name: string \| null` |
| `AudioAttributes` | `contentType: AndroidAudioContentType`, `flags: { enforceAudibility: boolean, requestHardwareAudioVideoSynchronization: boolean }`, `usage: AndroidAudioUsage` |
| `AudioAttributesInput` | `Partial<AudioAttributes>` |
| `NotificationChannelManager` / `NotificationChannelGroupManager` | Extend `ProxyNativeModule`; optional members mirror the channel / channel group methods above. |

#### Triggers

| Type | Platforms | Fields / description |
| --- | --- | --- |
| `NotificationTrigger` | Android, iOS | Union: `PushNotificationTrigger \| LocationNotificationTrigger \| NotificationTriggerInput \| UnknownNotificationTrigger` |
| `NotificationTriggerInput` | Android, iOS | Union: `null \| ChannelAwareTriggerInput \| SchedulableNotificationTriggerInput`. `null` delivers immediately. |
| `ChannelAwareTriggerInput` | Android, iOS | `channelId: string`. Delivers immediately. |
| `SchedulableNotificationTriggerInput` | Android, iOS | Union of `CalendarTriggerInput \| TimeIntervalTriggerInput \| DailyTriggerInput \| WeeklyTriggerInput \| MonthlyTriggerInput \| YearlyTriggerInput \| DateTriggerInput`. A `number` (Unix timestamp) or `Date` is processed as `SchedulableTriggerInputTypes.DATE`. Object date components are validated (for example minute and second between 0 and 59). |
| `TimeIntervalTriggerInput` | Android, iOS | `type: TIME_INTERVAL`, `seconds: number`, `repeats?: boolean`, `channelId?: string`. On iOS, when `repeats` is `true` the interval must be 60 seconds or greater, otherwise the notification will not trigger. |
| `DailyTriggerInput` | Android, iOS | `type: DAILY`, `hour`, `minute`, `channelId?`, `delivery?` (default `'bestEffort'`) |
| `WeeklyTriggerInput` | Android, iOS | `type: WEEKLY`, `weekday` (1 through 7, 1 = Sunday), `hour`, `minute`, `channelId?`, `delivery?` |
| `MonthlyTriggerInput` | Android, iOS | `type: MONTHLY`, `day`, `hour`, `minute`, `channelId?`, `delivery?`. Ranges follow JavaScript `Date` (January is 0). |
| `YearlyTriggerInput` | Android, iOS | `type: YEARLY`, `day`, `month`, `hour`, `minute`, `channelId?`, `delivery?`. Ranges follow JavaScript `Date`. |
| `DateTriggerInput` | Android, iOS | `type: DATE`, `date: Date \| number`, `channelId?`, `delivery?`. `repeats` is ignored. |
| `CalendarTriggerInput` | iOS | `type: CALENDAR`, optional `year`, `month`, `day`, `hour`, `minute`, `second`, `seconds`, `weekday`, `weekdayOrdinal`, `weekOfMonth`, `weekOfYear`, `timezone`, `repeats`, `channelId`. Corresponds to `UNCalendarNotificationTrigger`. |
| `NotificationDelivery` | Android | `'bestEffort'` (default; `setExactAndAllowWhileIdle()`, some OEMs defer by minutes; without exact alarm permission may be later) or `'alarmClock'` (`setAlarmClock()`; not deferred for battery optimization; status bar shows an alarm icon until delivered; requires `SCHEDULE_EXACT_ALARM` or `USE_EXACT_ALARM` on Android 12+, otherwise scheduled as `'bestEffort'`). |
| Output triggers | - | `TimeIntervalNotificationTrigger` (`type: 'timeInterval'`, `seconds`, `repeats`), `DailyNotificationTrigger` / `WeeklyNotificationTrigger` / `MonthlyNotificationTrigger` / `YearlyNotificationTrigger` (Android; iOS uses `CalendarNotificationTrigger`), `CalendarNotificationTrigger` (iOS, `type: 'calendar'`, `dateComponents`, `repeats`), `LocationNotificationTrigger` (iOS, `type: 'location'`, `region: CircularRegion \| BeaconRegion`, `repeats`), `PushNotificationTrigger` (`type: 'push'`, `payload?` iOS, `remoteMessage?: FirebaseRemoteMessage` Android), `UnknownNotificationTrigger` (`type: 'unknown'`). |
| `Region` / `CircularRegion` / `BeaconRegion` | iOS | `Region`: `identifier`, `notifyOnEntry`, `notifyOnExit`, `type`. `CircularRegion`: `center: { latitude, longitude }`, `radius` (meters), `type: 'circular'`. `BeaconRegion`: `beaconIdentityConstraint?`, `major`, `minor`, `notifyEntryStateOnDisplay`, `type: 'beacon'`, `uuid?`. |

#### Other types

| Type | Description |
| --- | --- |
| `DevicePushToken` | Union `ExplicitlySupportedDevicePushToken \| ImplicitlySupportedDevicePushToken`; an object of `type: Platform.OS` and `data: any` (a string on native devices, usable with FCM or APNs). `ExplicitlySupportedDevicePushToken` = `NativeDevicePushToken`. |
| `PushTokenListener(token)` | `(token: DevicePushToken) => void`. Do not call `getDevicePushTokenAsync` inside it (triggers the listener, may loop infinitely). |
| `InterruptionLevel` (iOS) | `'passive'` (added to the list without lighting up the screen or sound), `'active'` (immediately, screen, can play sound), `'timeSensitive'` (also breaks through system notification controls), `'critical'` (also bypasses the mute switch). |
| `NotificationCategoryOptions` (iOS) | `allowAnnouncement?` (Deprecated: ignored by iOS, will be removed), `allowInCarPlay?` (apps must be approved for CarPlay; default `false`), `categorySummaryFormat?`, `customDismissAction?` (default `false`), `intentIdentifiers?` (default `[]`), `previewPlaceholder?`, `showSubtitle?` (default `false`), `showTitle?` (default `false`). |
| `NotificationTaskPayload` | `NotificationResponse` or `{ aps?: Record<string, unknown> (iOS), data: { dataString: string }, notification: Record<string, unknown> \| null }`. `notification` is `null` for headless background notifications. |
| `NotificationHandlingError` | `NotificationTimeoutError \| Error` |
| `NativeNotificationPermissionsRequest` | `IosNotificationPermissionsRequest \| object` |
| `PermissionExpiration` | `'never' \| number`. Currently all permissions are granted permanently. |
| `FirebaseRemoteMessage` | Android/iOS shape of the FCM `RemoteMessage`: `collapseKey`, `data: Record<string, string>`, `from`, `messageId`, `messageType`, `notification: FirebaseRemoteMessageNotification \| null`, `originalPriority`, `priority`, `sentTime`, `to`, `ttl`. |
| `Subscription` | `EventSubscription`. Marked "Deprecated: use the `EventSubscription` type instead" in the source. |

### Enums

| Enum | Members |
| --- | --- |
| `AndroidAudioContentType` | `UNKNOWN = 0`, `SPEECH = 1`, `MUSIC = 2`, `MOVIE = 3`, `SONIFICATION = 4` |
| `AndroidAudioUsage` | `UNKNOWN = 0`, `MEDIA = 1`, `VOICE_COMMUNICATION = 2`, `VOICE_COMMUNICATION_SIGNALLING = 3`, `ALARM = 4`, `NOTIFICATION = 5`, `NOTIFICATION_RINGTONE = 6`, `NOTIFICATION_COMMUNICATION_REQUEST = 7`, `NOTIFICATION_COMMUNICATION_INSTANT = 8`, `NOTIFICATION_COMMUNICATION_DELAYED = 9`, `NOTIFICATION_EVENT = 10`, `ASSISTANCE_ACCESSIBILITY = 11`, `ASSISTANCE_NAVIGATION_GUIDANCE = 12`, `ASSISTANCE_SONIFICATION = 13`, `GAME = 14` |
| `AndroidImportance` | `UNKNOWN = 0`, `UNSPECIFIED = 1` (use `DEFAULT` instead; present for compatibility), `NONE = 2`, `MIN = 3`, `LOW = 4`, `DEFAULT = 5`, `HIGH = 6`, `MAX = 7` |
| `AndroidNotificationPriority` | `DEFAULT = "default"`, `HIGH = "high"`, `LOW = "low"`, `MAX = "max"`, `MIN = "min"` |
| `AndroidNotificationVisibility` | `UNKNOWN = 0`, `PUBLIC = 1`, `PRIVATE = 2`, `SECRET = 3` |
| `BackgroundNotificationTaskResult` (iOS) | `NewData = 0`, `NoData = 1`, `Failed = 2` (corresponds to `UIBackgroundFetchResult`) |
| `IosAlertStyle` | `NONE = 0`, `BANNER = 1`, `ALERT = 2` |
| `IosAllowsPreviews` | `NEVER = 0`, `ALWAYS = 1`, `WHEN_AUTHENTICATED = 2` |
| `IosAuthorizationStatus` | `NOT_DETERMINED = 0`, `DENIED = 1`, `AUTHORIZED = 2`, `PROVISIONAL = 3`, `EPHEMERAL = 4` |
| `PermissionStatus` | `DENIED = "denied"`, `GRANTED = "granted"`, `UNDETERMINED = "undetermined"` |
| `SchedulableTriggerInputTypes` | `CALENDAR = "calendar"`, `DAILY = "daily"`, `DATE = "date"`, `MONTHLY = "monthly"`, `TIME_INTERVAL = "timeInterval"`, `WEEKLY = "weekly"`, `YEARLY = "yearly"` |

## Notes

- Platforms (frontmatter): android, ios. Source code: `https://github.com/expo/expo/tree/sdk-58/packages/expo-notifications`. Page modificationDate: October 09, 2026.
- Push notifications (remote notifications) are unavailable in Expo Go on Android from SDK 53; a development build is required. Local notifications remain available in Expo Go.
- Push notifications work on physical devices, Android emulators with Google Play services, and iOS simulators on Xcode 14 or later (macOS 13+, iOS 16+).
- Known issue: when launching the app from a push notification in Android development builds, the splash screen may fail to display correctly about 70% of the time (icon missing, fade animation not run, only the background color flashes). It affects only debug builds; test in release mode (`npx expo run:android --variant release`).
- For bare React Native apps, install `expo` first and see the installation instructions in the `expo-notifications` repository.
- Deprecated per the source: `NotificationBehavior.shouldShowAlert` (use `shouldShowBanner` / `shouldShowList`) and `NotificationCategoryOptions.allowAnnouncement` (ignored by iOS). The source also prints "Deprecated: Use `clearLastNotificationResponse` instead." under `clearLastNotificationResponse()` and "Deprecated: Use `getLastNotificationResponse` instead." under `getLastNotificationResponse()` (self-referential, likely a doc generation artifact; the page's own Expo Router example uses the synchronous forms), and "Deprecated: use the `EventSubscription` type instead" next to the `Subscription` type.
- The upstream example returns `BackgroundNotificationResult.NoData`, which is not exported; the actual enum is `BackgroundNotificationTaskResult` (NewData = 0, NoData = 1, Failed = 2).
- The upstream manual step names `ios/project-name/Supporting/Expo.plist`, but the same page (and TaskManager docs) state `UIBackgroundModes` must be in the app's Info.plist, which is where iOS reads it.
- The registration example follows the error handling of the Push notifications setup guide (`handleRegistrationError` throws); the SDK reference page snippet instead returns the stringified error as the token.
- The listener snippet adds the `react` and `expo-notifications` imports, which the original snippet omits.
- The official type table renders `sound` as `... | string & undefined`; any custom sound filename string (for example `mySoundFile.wav`) is accepted.
- The official scheduleNotificationAsync note ("For the notification to be presented you have to set a notification handler") predates the SDK 58 default; in SDK 58 a foreground notification is presented by default when no handler is set (see receiving-notifications.md).
- This page covers the Expo `expo-notifications` JS API and the Expo Push Service token flow. APNs and FCM native APIs are covered by apple-app-services and android-platform-core; this page is only the Expo wrapper over them.

## Related

- [Expo push notifications: Overview](./push-overview.md)
- [Expo push notifications setup](./push-notifications-setup.md)
- [Send notifications with the Expo Push Service](./sending-notifications.md)
- [Handle incoming notifications](./receiving-notifications.md)
- [TaskManager](./task-manager.md)
