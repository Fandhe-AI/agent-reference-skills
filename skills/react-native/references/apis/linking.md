---
source: https://reactnative.dev/docs/0.87/linking
---

# Linking

`Linking` gives you a general interface to interact with both incoming and outgoing app links (URL schemes, deep links, Universal Links, Android intents).

## Signature / Usage

```tsx
const supported = await Linking.canOpenURL(url);

if (supported) {
  // Opening the link with some app, if the URL scheme is "http" the web link should be opened
  // by some browser in the mobile
  await Linking.openURL(url);
} else {
  Alert.alert(`Don't know how to open this URL: ${url}`);
}
```

Handling deep links (two ways):

- If the app is already open, it is foregrounded and a Linking `'url'` event is fired: `Linking.addEventListener('url', callback)` calls `callback({url})` with the linked URL.
- If the app is not already open, it is opened and the URL is passed in as the initial URL: `Linking.getInitialURL()` returns a Promise that resolves to the URL, if there is one.

```tsx
const initialUrl = await Linking.getInitialURL();
```

### Methods

| Method | Platform | Signature | Description |
| --- | --- | --- | --- |
| `addEventListener()` | All | `static addEventListener(type: 'url', handler: (event: {url: string}) => void): EventSubscription;` | Add a handler by listening to the `url` event type. |
| `canOpenURL()` | All | `static canOpenURL(url: string): Promise<boolean>;` | Whether an installed app can handle a given URL. `url` (string, required). |
| `getInitialURL()` | All | `static getInitialURL(): Promise<string \| null>;` | If the app launch was triggered by an app link, gives the link URL, otherwise `null`. |
| `openSettings()` | All | `static openSettings(): Promise<void>;` | Open the Settings app and display the app's custom settings, if it has any. |
| `openURL()` | All | `static openURL(url: string): Promise<any>;` | Try to open the given `url` with any of the installed apps. `url` (string, required). |
| `sendIntent()` | Android | `static sendIntent(action: string, extras?: Array<{key: string; value: string \| number \| boolean}>): Promise<void>;` | Launch an Android intent with extras. `action` required. |

Built-in URL schemes (non-exhaustive, both iOS and Android): `mailto` (open mail app, e.g. `mailto: hello@world.dev`), `tel` (e.g. `tel:+123456789`), `sms` (e.g. `sms:+123456789`), `https` / `http` (open web browser app).

## Notes

- A custom URL scheme isn't the only way to open the app. For links that may be opened on desktop, use standard `https` links that can be configured to open the app on mobile: **Deep Links** on Android, **Universal Links** on iOS.
- Enabling deep links applies only to projects with native code exposed. With the managed Expo workflow, see the Expo documentation's Linking guide.
- Android: follow "Enabling Deep Links for App Content - Add Intent Filters for Your Deep Links" (developer.android.com). To receive the intent in an existing instance of `MainActivity`, set `launchMode` to `singleTask` in `AndroidManifest.xml`:

```xml
<activity
  android:name=".MainActivity"
  android:launchMode="singleTask">
```

- iOS (Objective-C `AppDelegate.mm`): add the `LinkingIOS` folder into your header search paths (step 3 of linking-libraries-ios) and, to listen to incoming app links during execution, forward to `RCTLinkingManager`:

```objc
// iOS 9.x or newer
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}
```

- iOS Universal Links (Objective-C):

```objc
- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}
```

- iOS (Swift `AppDelegate.swift`):

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
  return RCTLinkingManager.application(app, open: url, options: options)
}
```

```swift
func application(
  _ application: UIApplication,
  continue userActivity: NSUserActivity,
  restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    return RCTLinkingManager.application(
      application,
      continue: userActivity,
      restorationHandler: restorationHandler
    )
  }
```

- `canOpenURL()`: for web URLs the protocol (`"http://"`, `"https://"`) must be set. The Promise rejects on Android if it was impossible to check, or when targeting Android 11 (SDK 30) without the relevant intent queries in `AndroidManifest.xml`; on iOS it rejects if the scheme is not in the `LSApplicationQueriesSchemes` key of `Info.plist`.
- iOS 9+ limitations of `canOpenURL()`: if the app is linked against an earlier iOS version but runs on iOS 9.0+, it can be called up to 50 times, after which calls resolve to `false` (reset on reinstall/upgrade). The app also needs `LSApplicationQueriesSchemes` in `Info.plist` or it always resolves to `false`.
- Android 11 (SDK 30): specify intents for the schemes you handle in `AndroidManifest.xml`, e.g. for `https`:

```xml
<manifest ...>
  <queries>
    <intent>
      <action android:name="android.intent.action.VIEW" />
      <data android:scheme="https"/>
    </intent>
  </queries>
</manifest>
```

- `getInitialURL()` may return `null` when Remote JS Debugging is active; disable the debugger to ensure it gets passed.
- `openURL()` fails if the system doesn't know how to open the URL; for non-http(s) URLs check `canOpenURL()` first. It may behave differently in a simulator, e.g. `"tel:"` links cannot be handled in the iOS simulator. Location examples: `"geo:37.484847,-122.148386"` on Android or `"https://maps.apple.com/?ll=37.484847,-122.148386"` on iOS.
- 0.88: iOS SceneDelegate support. `RCTReactNativeFactory` gains SceneDelegate entry points (`startReactNativeWithModuleName:inWindow:connectionOptions:` and `startReactNativeWithModuleName:inWindow:initialProperties:connectionOptions:`). Migration includes forwarding the scene's URL and user-activity callbacks to `RCTLinkingManager`. At launch, React Native forwards only the first URL context or user activity from the scene's connection options. Support in 0.88 is limited to a single scene (0.88 release blog).
- Android intent example: `Linking.sendIntent('android.intent.action.POWER_USAGE_SUMMARY')`, or with extras `[{key: 'android.provider.extra.APP_PACKAGE', value: 'com.facebook.katana'}]` for `android.settings.APP_NOTIFICATION_SETTINGS`.
- Distinct from `react-router` / `tanstack-router` (web routers); this is the native app-link API.

## Related

- [AppState](./appstate.md)
- [Platform](./platform.md)
