---
source: https://docs.expo.dev/versions/v58.0.0/sdk/widgets/
---

# Widgets

`expo-widgets` creates Android and iOS home screen widgets and iOS Live Activities (and, on Android, custom notifications) using Expo UI components, without writing native code, via `createWidget`, `createLiveActivity`, and `createCustomNotification`. Layouts use Expo UI components and modifiers: Jetpack Compose on Android and SwiftUI on iOS.

## Signature / Usage

```sh
npx expo install expo-widgets
```

```js
import { createWidget, createLiveActivity } from 'expo-widgets';
```

```tsx
import { Text, VStack } from '@expo/ui/swift-ui';
import { containerBackground, font } from '@expo/ui/swift-ui/modifiers';
import { createWidget, type WidgetEnvironment } from 'expo-widgets';
import { PlatformColor } from 'react-native';

type MyWidgetProps = {
  count: number;
};

const MyWidget = (props: MyWidgetProps, environment: WidgetEnvironment) => {
  'widget';
  return (
    <VStack modifiers={[containerBackground(PlatformColor('systemBackground'), 'widget')]}>
      <Text modifiers={[font({ weight: 'bold', size: 16 })]}>Count: {props.count}</Text>
      <Text>Family: {environment.widgetFamily}</Text>
    </VStack>
  );
};

export default createWidget('MyWidget', MyWidget, { count: 0 });
```

The widget name must match `name` in the app config plugin entry. Update it from another file (default import of the `createWidget` return value):

```tsx
import MyWidget from './MyWidget';

MyWidget.updateSnapshot({ count: 5 });

MyWidget.updateTimeline([
  { date: new Date(), props: { count: 1 } },
  { date: new Date(Date.now() + 3600000), props: { count: 2 } },
]);

const entries = await MyWidget.getTimeline();
MyWidget.reload();
```

Config plugin:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-widgets",
        {
          "widgets": [
            {
              "name": "MyWidget",
              "displayName": "My Widget",
              "description": "A sample home screen widget",
              "ios": {
                "supportedFamilies": ["systemSmall", "systemMedium", "systemLarge"]
              }
            }
          ]
        }
      ]
    ]
  }
}
```

Interactive widget (iOS 17+): the value returned by a button's `onPress` becomes the widget's new props.

```tsx
import { Button, Text, VStack } from '@expo/ui/swift-ui';
import { containerBackground } from '@expo/ui/swift-ui/modifiers';
import { createWidget } from 'expo-widgets';
import { PlatformColor } from 'react-native';

const CounterWidget = (props: { count: number }) => {
  'widget';
  return (
    <VStack modifiers={[containerBackground(PlatformColor('systemBackground'), 'widget')]}>
      <Text>Count: {props.count}</Text>
      <Button label="Increment" target="increment" onPress={() => ({ count: props.count + 1 })} />
    </VStack>
  );
};

export default createWidget('CounterWidget', CounterWidget, { count: 0 });
```

Android widget (opt-in with `enableAndroid`; layout built with `@expo/ui/jetpack-compose`):

```tsx
import { Column, Text } from '@expo/ui/jetpack-compose';
import { createWidget } from 'expo-widgets';

type MyWidgetProps = {
  count: number;
};

const MyWidget = (props: MyWidgetProps) => {
  'widget';
  return (
    <Column>
      <Text>Count: {props.count}</Text>
    </Column>
  );
};

export default createWidget('MyWidget', MyWidget, { count: 0 });
```

```json
{
  "expo": {
    "android": {
      "package": "com.example.myapp"
    },
    "plugins": [
      [
        "expo-widgets",
        {
          "enableAndroid": true,
          "widgets": [
            {
              "name": "MyWidget",
              "displayName": "My Widget",
              "description": "A sample home screen widget"
            }
          ]
        }
      ]
    ]
  }
}
```

Mirror interactions into app state while the app is alive: `const subscription = addUserInteractionListener(event => { ... event.source, event.target ... }); subscription.remove();`.

Live Activity:

```tsx
import { Image, Text, VStack } from '@expo/ui/swift-ui';
import { createLiveActivity, type LiveActivityEnvironment } from 'expo-widgets';

const DeliveryActivity = (props: { etaMinutes: number; status: string }, environment: LiveActivityEnvironment) => {
  'widget';
  return {
    banner: (
      <VStack>
        <Text>{props.status}</Text>
        <Text>Estimated arrival: {props.etaMinutes} minutes</Text>
      </VStack>
    ),
    compactLeading: <Image systemName="box.truck.fill" />,
    compactTrailing: <Text>{props.etaMinutes} min</Text>,
    minimal: <Image systemName="box.truck.fill" />,
  };
};

const Factory = createLiveActivity('DeliveryActivity', DeliveryActivity);
const instance = Factory.start({ etaMinutes: 15, status: 'On the way' }, 'myapp://deliveries/12345');
await instance.update({ etaMinutes: 2, status: 'Arriving soon!' });
await instance.end('default', { etaMinutes: 0, status: 'Delivered' }, new Date());
```

Android custom notification:

```tsx
import { Row, Text } from '@expo/ui/jetpack-compose';
import { createCustomNotification } from 'expo-widgets';

const OrderNotification = createCustomNotification('OrderNotification', (props: { status: string }) => {
  'widget';
  return {
    collapsed: (
      <Row>
        <Text>{props.status}</Text>
      </Row>
    ),
  };
});

const order = await OrderNotification.post({ status: 'Preparing' }, { id: 'order-1', ongoing: true });
await order.update({ status: 'Delivered' }, { ongoing: false, timeoutAfter: 15 * 60 * 1000 });
```

## Options / Props

### Config plugin properties

| Name | Default | Description |
| --- | --- | --- |
| bundleIdentifier | `<app bundle identifier>.ExpoWidgetsTarget` | Bundle identifier of the widget extension target. |
| groupIdentifier | `group.<app bundle identifier>` | App group identifier for communication/data sharing between app and widgets (required for widgets). If `ios.bundleIdentifier` is also unset, prebuild fails. |
| enablePushNotifications | `false` | Enables custom notifications on Android (when `enableAndroid` is `true`, adds `POST_NOTIFICATIONS`) and push notifications for Live Activities on iOS (adds `aps-environment`, sets `ExpoWidgets_EnablePushNotifications` in Info.plist). |
| frequentUpdates | `false` | Allows frequent Live Activity updates via remote push; sets `NSSupportsLiveActivitiesFrequentUpdates`. |
| enableAndroid | `false` | Adds an Android home screen widget for each entry in `widgets`. Also requires `android.package` in the app config. |
| widgets | — | Array of widget configurations; each becomes a separate widget kind. |
| widgets[].name | — | Internal identifier; used in the Kotlin class name on Android and as the Swift struct name on iOS (valid Kotlin and Swift identifier, no spaces or special characters). Must match the `name` passed to `createWidget`. |
| widgets[].displayName | — | Name in the widget gallery. |
| widgets[].description | — | Description in the widget gallery. |
| widgets[].ios.supportedFamilies | — | `systemSmall` (2x2), `systemMedium` (4x2), `systemLarge` (4x4), `systemExtraLarge` (iPad only, 6x4), `accessoryCircular`, `accessoryRectangular`, `accessoryInline` (Lock Screen). |
| widgets[].ios.contentMarginsDisabled | `false` | System adds no margins; you specify margins/padding. |
| widgets[].ios.initialLayout | — | Path (relative to project root) to the file registering the widget with `createWidget`, so it appears in the gallery before the app is first opened. |
| widgets[].android | — | Android options for this widget; apply only when `enableAndroid` is `true`. `null` skips this widget on Android. |
| widgets[].android.minWidth | `180` | Default width in dp on Android 11 and lower. |
| widgets[].android.minHeight | `110` | Default height in dp on Android 11 and lower. |
| widgets[].android.targetCellWidth | `4` | Default width in home screen grid cells on Android 12 and later. |
| widgets[].android.targetCellHeight | `2` | Default height in home screen grid cells on Android 12 and later. |
| widgets[].android.resizeMode | `"both"` | Directions users can resize the widget: `none`, `horizontal`, `vertical`, or `both`. |
| widgets[].android.initialLayout | — | Path (relative to project root) to the file registering the widget with `createWidget`, so it can render its layout before the app is first opened. |
| widgets[].ios.configuration | — | Makes the widget configurable: `title`, optional `description`, and `parameters` (map of key to `{ title, type: string \| number \| boolean \| enum, default }`; `enum` adds `values: [{ name, value }]` and optional `dynamic: true`). Values arrive via `environment.configuration`. |

### Widget (createWidget(name, widget, initialProps?): Widget)

| Method | Platforms | Description |
| --- | --- | --- |
| updateSnapshot(props) | Android, iOS | Displays the new props immediately. On iOS, creates a widget timeline with a single entry. |
| updateTimeline(entries: WidgetTimelineEntry[]) | iOS | Schedules updates (`{ date, props }`) and reloads. |
| getTimeline() | iOS | Returns current entries, past and future. |
| reload() | Android, iOS | Forces a refresh of content and timeline. |
| setConfigurationParameterEnum(parameterName, options?: WidgetConfigurationEnum[]) | iOS | Replaces runtime options for a `dynamic` enum parameter (config values stay as fallback). |

### LiveActivityFactory / LiveActivity (iOS)

| Member | Description |
| --- | --- |
| createLiveActivity(name, liveActivity) | Returns `LiveActivityFactory<T>`. |
| start(props, url?, staleDate?) | Starts a Live Activity; returns `LiveActivity<T>`. `url` is opened on tap (deep link). |
| getInstances() | Returns currently active instances of this type (recover after relaunch). |
| instance.update(props, staleDate?) | `Promise<void>`. |
| instance.end(dismissalPolicy?, props?, contentDate?) | `Promise<void>`. Policy: `'default'` \| `'immediate'` \| `after(date)`. A `contentDate` older than a previous update is ignored by the system. |
| instance.getId() | Stable ActivityKit identifier (`string`). |
| instance.getPushToken() | `Promise<string \| null>`; `null` if push is not enabled or the token is not yet available. |
| instance.addPushTokenListener(listener) | `EventSubscription`; event `PushTokenEvent` (`activityId`, `pushToken`). |
| addPushToStartTokenListener(listener) | `EventSubscription`; event `PushToStartTokenEvent` (`activityPushToStartToken`). Start remotely (iOS 17.2+). |

`LiveActivityLayout` regions: `banner` (required), `bannerSmall` (CarPlay/watchOS; falls back to `banner`), `compactLeading`, `compactTrailing`, `minimal`, `expandedLeading`, `expandedTrailing`, `expandedCenter`, `expandedBottom`.

### Environments

| Type | Fields |
| --- | --- |
| WidgetEnvironment<T> | `colorScheme?`, `configuration` (iOS 17+), `date?`, `isLuminanceReduced?` (iOS 16+), `levelOfDetail?` (iOS 26+), `showsWidgetLabel?` (iOS 16+), `widgetContentMargins?` (`{ bottom, leading, top, trailing }`, iOS 17+), `widgetFamily?`, `widgetRenderingMode?` (iOS 16+) |
| LiveActivityEnvironment | `colorScheme`, `activityFamily?` (iOS 18+), `isActivityFullscreen?` (iOS 16.1+), `isActivityUpdateReduced?` (iOS 18+), `isLuminanceReduced?` (iOS 16+), `isStale?` (iOS 16.2+), `levelOfDetail?` (iOS 26+) |
| CustomNotificationEnvironment | `colorScheme`: `'light' \| 'dark'` |

- `WidgetRenderingMode`: `'fullColor'` (home screen, default) | `'accented'` (tinted, iOS 18+, watchOS) | `'vibrant'` (Lock Screen).
- `WidgetFamily`: `'systemSmall'` | `'systemMedium'` | `'systemLarge'` | `'systemExtraLarge'` | `'accessoryCircular'` | `'accessoryRectangular'` | `'accessoryInline'`.
- `LevelOfDetail` (iOS 26+): `'simplified'` | `'default'`.
- `UserInteractionEvent`: `source`, `target`, `timestamp`, `type: 'ExpoWidgetsUserInteraction'`, and Android-only `notificationId?`.
- `WidgetConfigurationEnum`: `name`, `value`, iOS-only `subtitle?`.

### Android custom notifications

`createCustomNotification(name, layout): CustomNotificationFactory<T>` (factory can be created everywhere; methods reject with `UnavailabilityError` off Android). The layout must start with `'widget'` and use `@expo/ui/jetpack-compose`; it returns `CustomNotificationLayout` with `collapsed` (about 64 dp, required), `expanded?` (up to 256 dp; derived from `collapsed` if omitted), `headsUp?` (about 88 dp; reuses `collapsed` if omitted; channel importance decides whether shown).

Factory: `name`, `post(props, options?)` (replaces an active notification with the same `id`), `get(id)`, `getActive()`, `cancelAll()`. `CustomNotification`: `id`, `update(props, options?)`, `getProps()`, `cancel()`. `post` rejects when notifications are disabled, `channelId` / `smallIcon` do not exist, `color` is not `#RRGGBB` / `#AARRGGBB`, the layout has no `collapsed`, or the post is canceled before rendering finishes.

`CustomNotificationOptions`: `alertOnlyOnce` (default `true`), `autoCancel` (opposite of `ongoing`), `channelId` (default low-importance channel `expo_widgets_notifications`, created on first use), `color`, `id` (random UUID by default), `ongoing` (default `false`), `smallIcon`, `text`, `timeoutAfter` (ms), `title`, `url`. `CustomNotificationUpdateOptions` = options without `id`; omitted options keep previous values.

### Constant

`widgetsDirectory: string` — `file://` URL of a directory shared by the app and widgets, for images. `null` only when no app group is configured.

## Notes

- Platforms: Android, iOS. Not available in Expo Go; use development builds. Source package `expo-widgets` (Expo SDK 58 docs, modificationDate October 14, 2026).
- The `'widget'` directive compiles a component into a separate JS bundle running in an isolated runtime inside the widget extension. It can only render Expo UI components and modifiers: `@expo/ui/jetpack-compose` on Android (widgets and custom notifications) and `@expo/ui/swift-ui` on iOS (widgets and Live Activities). `react-native` components are not usable in either case. The layout cannot use React hooks, state, or context, cannot do async work, import other modules, or access app runtime/in-memory state, and cannot reference anything declared outside the component function (even top-level `const`s in the same file; declare constants and helpers inside the function or pass via props). Data comes via props (`updateSnapshot`, `updateTimeline`, Live Activity `start` / `update`) and the `environment` argument; share images by writing them to `widgetsDirectory`.
- `createLiveActivity` registers entirely at runtime; do not add a `widgets[]` entry for it in app config (an entry without `supportedFamilies` generates an invalid widget target that fails the build).
- The top-level `supportedFamilies` and `contentMarginsDisabled` plugin options are deprecated aliases of `ios.supportedFamilies` and `ios.contentMarginsDisabled`.
- Interactive and configurable widgets require iOS 17 or later. `onPress` return value updates the widget without a running app; `addUserInteractionListener` only fires while the app process is alive.
- Remote Live Activity updates (APNs): `apns-push-type: liveactivity`, `apns-topic: <bundle identifier>.push-type.liveactivity`, `apns-priority` 10 (immediate) or 5. The `aps` payload carries `event` (`start` | `update` | `end`), `timestamp` (Unix seconds), and `content-state` = `{ "name": "<createLiveActivity name>", "props": "<JSON string of props>" }`; `start` also takes `attributes-type: "LiveActivityAttributes"`, `attributes`, and `alert`. `end` may set `dismissal-date` (Unix seconds). Include `input-push-token: 1` on iOS 18+ to receive a new per-activity token. Follow Apple's ActivityKit push notification documentation for exact payload shape.
- Uses `@expo/ui` SwiftUI / Jetpack Compose wrappers (see the Expo UI pages here); these are not the native WidgetKit / ActivityKit / Glance APIs. For native references see the apple-swiftui, apple-app-services, and android-platform-core skills (Glance widgets).
- Android widgets are opt-in (`enableAndroid` plus `android.package`); run `npx expo prebuild` and rebuild after changing these options. They share the `createWidget` API with iOS widgets. They support only these `@expo/ui/jetpack-compose` components: `Box`, `Button`, `Checkbox`, `CircularProgressIndicator`, `Column`, `ElevatedButton`, `FilledTonalButton`, `Image`, `LazyColumn`, `LinearProgressIndicator`, `LoadingIndicator`, `OutlinedButton`, `RadioButton`, `Row`, `Spacer`, `Switch`, `Text`, `TextButton` (any other component renders "View not found"), and these modifiers from `@expo/ui/jetpack-compose/modifiers`: `background`, `cornerRadius`, `fillMaxHeight`, `fillMaxSize`, `fillMaxWidth`, `height`, `padding`, `paddingAll`, `size`, `width`, `wrapContentHeight`, `wrapContentWidth` (other modifiers have no effect).
- Timelines (`updateTimeline`, `getTimeline`), configurable widgets, and Live Activities are iOS only. On Android use `updateSnapshot`; the `environment` argument provides only `colorScheme`. To test on a device or emulator, touch and hold the home screen, select Widgets, and add the app's widget.
- On iOS 17 and later every widget needs the `containerBackground` modifier (from `@expo/ui/swift-ui/modifiers`) with the `'widget'` placement on its root view; without it the widget shows the system message "Please adopt containerBackground API" instead of the layout.
- Source: https://docs.expo.dev/versions/v58.0.0/sdk/widgets/ (docs/pages/versions/v58.0.0/sdk/widgets.mdx at tag expo@58.0.25). The generated API data (`docs/public/static/data/v58.0.0/expo-widgets.json`) is identical between tags expo@58.0.12 and expo@58.0.25.

## Related

- [Expo UI SwiftUI](./expo-ui-swift-ui.md)
- [Expo UI Jetpack Compose](./expo-ui-jetpack-compose.md)
