---
source: https://docs.expo.dev/router/reference/focus-handling/
---

# Handle screen focus

Run effects, render UI, and respond to navigation events when an Expo Router screen is focused.

## Signature / Usage

| If you want to | Use |
| --- | --- |
| Start and clean up work while a screen is focused | `useFocusEffect` |
| Update the UI when focus changes | `useIsFocused` |
| Listen for a specific focus or blur event | `useNavigation().addListener` |

Run an effect while focused. Wrap the callback in `useCallback` so the effect does not run on every render.

```tsx
// src/app/profile.tsx
import { useCallback } from 'react';
import { useFocusEffect } from 'expo-router';

export default function Profile() {
  useFocusEffect(
    useCallback(() => {
      const subscription = subscribeToProfileUpdates();

      return () => subscription.unsubscribe();
    }, [])
  );

  return null;
}
```

The callback runs when the screen comes into focus. While the screen remains focused, it also runs again if any of its dependencies change. Return a cleanup function to stop the work when the screen loses focus, the dependencies change, or the component unmounts.

`useFocusEffect` accepts only one argument. Put dependencies in the `useCallback` dependency array:

```tsx
useFocusEffect(
  useCallback(() => {
    const subscription = subscribeToProfileUpdates(profileId);
    return () => subscription.unsubscribe();
  }, [profileId])
);
```

Render based on focus. `useIsFocused` returns a boolean and re-renders the component when focus changes:

```tsx
import { useIsFocused } from 'expo-router';

export default function Profile() {
  const isFocused = useIsFocused();

  return <ProfileContent showLiveStatus={isFocused} />;
}
```

Listen for focus and blur events. Subscribe in an effect and remove both listeners in its cleanup:

```tsx
import { useEffect } from 'react';
import { useNavigation } from 'expo-router';

export default function Profile() {
  const navigation = useNavigation();

  useEffect(() => {
    const removeFocusListener = navigation.addListener('focus', recordProfileView);
    const removeBlurListener = navigation.addListener('blur', pauseProfileUpdates);

    return () => {
      removeFocusListener();
      removeBlurListener();
    };
  }, [navigation]);

  return null;
}
```

## Notes

- Prefer `useFocusEffect` whenever possible. Use `useNavigation().addListener` only when you cannot express the work as an effect tied to screen focus.
- Source: https://docs.expo.dev/router/reference/focus-handling/ (unversioned guide, fetched 2026-10-17, modificationDate October 12, 2026).

## Related

- [Router API](./router-api.md)
- [Redirects](./redirects.md)
