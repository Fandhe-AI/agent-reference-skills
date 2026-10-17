---
source: https://docs.expo.dev/versions/v58.0.0/sdk/router/experimental-stack/
---

# Router Experimental Stack

An opt-in sibling to `Stack` built on the `react-native-screens/experimental` stack. Alpha, available for testing only.

## Signature / Usage

```js
import { ExperimentalStack } from 'expo-router';
```

```tsx
import { ExperimentalStack as Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="details" options={{ title: 'Details' }} />
    </Stack>
  );
}
```

## Options / Props

`ExperimentalStack` renders the `react-native-screens/experimental` native stack. Opt-in per navigator: replace `<Stack />` with `<ExperimentalStack />` in the layout you want to migrate. `ExperimentalStack.Screen` and `ExperimentalStack.Protected` compose the same way as with `Stack`.

Sub-components (platforms: Android, iOS):

| Component | Description |
| --- | --- |
| `ExperimentalStack.Screen` | Props are `StackScreenProps` (see Router Stack). |
| `ExperimentalStack.Screen.BackButton` | Configures the back button (`StackScreenBackButtonProps`). Deprecated: use `Stack.Title` instead. If multiple instances are rendered for the same screen, the last one wins. |
| `ExperimentalStack.Screen.Title` | Props are `StackTitleProps`. |

`ExperimentalStackNavigationOptions` (screen options; anything else is dropped with a `__DEV__` warning):

| Name | Type | Description |
| --- | --- | --- |
| `title` | `string` | Screen title. |
| `headerShown` | `boolean` | Show or hide the header. |
| `headerTransparent` | `boolean` | Transparent header. |
| `headerBackVisible` | `boolean` | Back button visibility. |

`ExperimentalStackNavigationEventMap`:

| Event | Data |
| --- | --- |
| `gestureCancel` | `{ data: undefined }` |
| `removePrevented` | `{ data: { action: NavigationAction } }` |
| `transitionEnd` | `{ data: { closing: boolean } }` |
| `transitionStart` | `{ data: { closing: boolean } }` |

Other types: `ExperimentalStackNavigationHelpers` (`NavigationHelpers<ParamListBase, ExperimentalStackNavigationEventMap>`), `ExperimentalStackNavigationProp`. Screen props: `navigation` (`ExperimentalStackNavigationProp`), `route` (`RouteProp`).

## Notes

- `ExperimentalStack` is an alpha API available in Expo SDK 56 and later, for testing only. The API and feature set may change before it is ready for production use. Platforms: ios, android.
- Native-only: on Web it falls back to the standard `Stack`.
- On Android it ships with predictive back gesture support; enable it by setting `android.predictiveBackGestureEnabled` to `true` in app config.
- Known limitations: only `title`, `headerShown`, `headerTransparent`, `headerBackVisible` are supported (other options such as `headerLeft`, `headerRight`, `headerTitle`, `headerStyle`, `headerTintColor`, animation overrides, status bar options log a development warning and have no effect); no `presentation: 'modal'` / `transparentModal`; no sheets (`formSheet`, detents); no custom headers; no `animation` / `animationDuration` / status bar options; on Android it cannot coexist with the standard `Stack` in the same app.
- Source: https://docs.expo.dev/versions/v58.0.0/sdk/router/experimental-stack/ (modificationDate September 16, 2026).

## Related

- [Router Stack](./router-stack.md)
- [Router](./router-api.md)
