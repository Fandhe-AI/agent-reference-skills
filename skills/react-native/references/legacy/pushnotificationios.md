---
source: https://reactnative.dev/docs/0.87/pushnotificationios
---

# PushNotificationIOS

Handle notifications for an iOS app, including scheduling and permissions, through the native `RCTPushNotificationManager`.

## Signature / Usage

Configure notifications with Apple and your server, enable remote notifications in the project, then forward registration events in `AppDelegate.m`:

```objectivec
#import <React/RCTPushNotificationManager.h>

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 // This will trigger 'register' events on PushNotificationIOS
 [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 // This will trigger 'registrationError' events on PushNotificationIOS
 [RCTPushNotificationManager didFailToRegisterForRemoteNotificationsWithError:error];
}
```

Implement `UNUserNotificationCenterDelegate` and set the delegate on launch (`center.delegate = self;` with `[UNUserNotificationCenter currentNotificationCenter]`). Foreground notifications:

```objectivec
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  // This will trigger 'notification' and 'localNotification' events on PushNotificationIOS
  [RCTPushNotificationManager didReceiveNotification:notification];
  // Decide if and how the notification will be shown to the user
  completionHandler(UNNotificationPresentationOptionNone);
}
```

Tapped / background notifications:

```objectivec
- (void)  userNotificationCenter:(UNUserNotificationCenter *)center
  didReceiveNotificationResponse:(UNNotificationResponse *)response
           withCompletionHandler:(void (^)(void))completionHandler
{
  // This condition passes if the notification was tapped to launch the app
  if ([response.actionIdentifier isEqualToString:UNNotificationDefaultActionIdentifier]) {
    // Allow the notification to be retrieved on the JS side using getInitialNotification()
    [RCTPushNotificationManager setInitialNotification:response.notification];
  }
  // This will trigger 'notification' and 'localNotification' events on PushNotificationIOS
  [RCTPushNotificationManager didReceiveNotification:response.notification];
  completionHandler();
}
```

## Options / Props

Static methods:

| Name | Signature | Description |
| --- | --- | --- |
| presentLocalNotification | `static presentLocalNotification(details: PresentLocalNotificationDetails)` | Schedules a local notification for immediate presentation. `details`: `alertTitle`, `alertBody`, `userInfo`, `category`, `applicationIconBadgeNumber`, `isSilent`, `soundName`, `alertAction` (DEPRECATED, legacy UILocalNotification). |
| scheduleLocalNotification | `static scheduleLocalNotification(details: ScheduleLocalNotificationDetails)` | Schedules a local notification for future presentation. `details`: as above plus `fireDate` (takes precedence) or `fireIntervalSeconds`; `repeatInterval` is DEPRECATED (use `fireDate` or `fireIntervalSeconds`). |
| cancelAllLocalNotifications | `static cancelAllLocalNotifications()` | Cancels all scheduled local notifications. |
| removeAllDeliveredNotifications | `static removeAllDeliveredNotifications()` | Removes all delivered notifications from Notification Center. |
| getDeliveredNotifications | `static getDeliveredNotifications(callback: (notifications: Object[]) => void)` | Lists notifications displayed in Notification Center (`identifier`, `title`, `body`, `category`, `userInfo`, `thread-id`). |
| removeDeliveredNotifications | `static removeDeliveredNotifications(identifiers: string[])` | Removes specified notifications from Notification Center. |
| setApplicationIconBadgeNumber | `static setApplicationIconBadgeNumber(num: number)` | Sets the app icon badge number. |
| getApplicationIconBadgeNumber | `static getApplicationIconBadgeNumber(callback: (num: number) => void)` | Gets the current badge number. |
| cancelLocalNotifications | `static cancelLocalNotifications(userInfo: Object)` | Cancels scheduled local notifications matching the fields in `userInfo`. |
| getScheduledLocalNotifications | `static getScheduledLocalNotifications(callback: (notifications: ScheduleLocalNotificationDetails[]) => void)` | Lists currently scheduled local notifications. |
| addEventListener | `static addEventListener(type: PushNotificationEventName, handler)` | Attaches a listener. Types: `notification`, `localNotification`, `register` (hex deviceToken string), `registrationError` (`{message: string, code: number, details: any}`). |
| removeEventListener | `static removeEventListener(type: PushNotificationEventName)` | Removes the listener; do this in `componentWillUnmount`. |
| requestPermissions | `static requestPermissions(permissions?: PushNotificationPermissions): Promise<PushNotificationPermissions>` | Prompts for permissions (`alert`, `badge`, `sound`; all by default). Returns a promise resolving to the permission state. |
| abandonPermissions | `static abandonPermissions()` | Unregisters for all remote notifications via APNs; use in rare circumstances only. |
| checkPermissions | `static checkPermissions(callback: (permissions: PushNotificationPermissions) => void)` | Reports enabled permissions (`alert`, `badge`, `sound` booleans). |
| getInitialNotification | `static getInitialNotification(): Promise<PushNotification \| null>` | Notification that launched the app, otherwise `null`. |
| getAuthorizationStatus | `static getAuthorizationStatus(): Promise<number>` | Resolves to the notification authorization status (see UNAuthorizationStatus). |
| finish | `finish(result: string)` | Executes native completion handlers for notifications received via `application:didReceiveRemoteNotification:fetchCompletionHandler:`. |

Instance getters on a received notification:

| Name | Signature | Description |
| --- | --- | --- |
| getMessage | `getMessage(): string \| Object` | Alias for `getAlert`. |
| getSound | `getSound(): string` | Sound string from `aps`; `null` for local notifications. |
| getCategory | `getCategory(): string` | Category string from `aps`. |
| getAlert | `getAlert(): string \| Object` | Main message from `aps`. |
| getContentAvailable | `getContentAvailable(): number` | content-available number from `aps`. |
| getBadgeCount | `getBadgeCount(): number` | Badge count from `aps`. |
| getData | `getData(): Object` | Data object on the notification. |
| getThreadID | `getThreadID()` | Thread ID on the notification. |

## Notes

- Deprecated: "Use one of the community packages instead." (reactnative.directory search: notification)
- Applies to projects with native code only. For the managed Expo workflow, the page points to the Notifications guide in the Expo documentation (see expo).
- If a tapped notification was already handled in `willPresentNotification`, notify `RCTPushNotificationManager` in only one of the two callbacks.
- `finish()` is superseded by `UNUserNotificationCenterDelegate` and is no longer invoked if both `application:didReceiveRemoteNotification:fetchCompletionHandler:` and the newer handlers are implemented; if you still use the old handler you must call it as soon as possible.
- 0.88: React Native 0.88 adds iOS SceneDelegate lifecycle support (`RCTReactNativeFactory` SceneDelegate entry points; a single scene only), which applies to native iOS entry-point code like the `AppDelegate.m` snippets above (0.88 release blog).
- The 0.87 docs show `permissions?: PushNotificationPermissions[]`, but the Flow implementation (Libraries/PushNotificationIOS/PushNotificationIOS.js) takes a permissions object `{alert?, badge?, sound?}` and only requests truthy keys; the array overload in the .d.ts returns void. Example: `PushNotificationIOS.requestPermissions({alert: true, badge: true, sound: false})`.
- iOS-native notification APIs themselves (UserNotifications, APNs): see apple-app-services and apple-uikit.

## Related

- [native-modules-ios.md](./native-modules-ios.md)
- [removed-apis.md](./removed-apis.md)
