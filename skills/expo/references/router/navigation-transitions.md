---
source: https://docs.expo.dev/router/advanced/navigation-transitions/
---

# Configure navigation transitions

Process navigation inside a React transition so the current screen stays visible while the next screen suspends.

## Signature / Usage

Set the transition mode before the root layout renders:

```tsx
import { router, Stack } from 'expo-router';

router.setTransitionMode('always');

export default function RootLayout() {
  return <Stack />;
}
```

Override the mode for an individual operation with `inTransition`:

```tsx
router.push('/details', { inTransition: true });
router.back({ inTransition: false });
```

Show pending navigation with `unstable_useIsNavigating()`:

```tsx
import { unstable_useIsNavigating } from 'expo-router';
import { ActivityIndicator } from 'react-native';

export function NavigationProgress() {
  const isNavigating = unstable_useIsNavigating();

  return <ActivityIndicator animating={isNavigating} />;
}
```

## Options / Props

| Mode | Behavior |
| --- | --- |
| `preload-only` | Uses transitions for preloading. This is the default. |
| `always` | Uses transitions for all queued navigation operations. |
| `never` | Never uses transitions. Individual operations cannot override this. |

## Notes

- Experimental feature, available in Expo SDK 58 and later.
- The `never` mode cannot be overridden by `inTransition`.
- When Expo Router batches operations, every operation must allow transitions for the batch to use one.
- `unstable_useIsNavigating()` does not report synchronous navigation or native back gestures.
- Expo Router is built on React Navigation; `router` here is not the object of the same name in react-router or tanstack-router.
- Page modification date: September 17, 2026. Source fetched 2026-10-17.

## Related

- [Navigation](./navigation.md)
- [Router settings](./router-settings.md)
