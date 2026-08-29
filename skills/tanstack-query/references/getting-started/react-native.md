---
source: https://tanstack.com/query/latest/docs/framework/react/react-native
---

# React Native

TanStack Query works out of the box with React Native; online-status and app-focus refetching require wiring `onlineManager` and `focusManager` to React Native's own APIs.

## Signature / Usage

```tsx
import NetInfo from '@react-native-community/netinfo'
import { onlineManager } from '@tanstack/react-query'

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected)
  })
})
```

```tsx
import { useEffect } from 'react'
import { AppState, Platform } from 'react-native'
import type { AppStateStatus } from 'react-native'
import { focusManager } from '@tanstack/react-query'

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

useEffect(() => {
  const subscription = AppState.addEventListener('change', onAppStateChange)
  return () => subscription.remove()
}, [])
```

## Notes

- Online status: use `onlineManager.setEventListener` with `@react-native-community/netinfo` or `expo-network`
- App focus: `AppState` "change" events drive `focusManager.setFocused` (there is no `window` focus event in React Native)
- Screen focus (React Navigation): a custom `useRefreshOnFocus` hook using `useFocusEffect` can refetch active stale queries when a screen regains focus
- `useQuery`'s `subscribed` option (combined with React Navigation's `useIsFocused`) lets a query unsubscribe from updates while a screen is out of focus
- Devtools integration options: Rozenite plugin (React Native DevTools), a native macOS app (`rn-better-dev-tools`), a Flipper plugin, and a Reactotron plugin (all 3rd party)

## Related

- [Devtools](./devtools.md)
