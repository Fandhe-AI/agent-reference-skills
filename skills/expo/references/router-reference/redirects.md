---
source: https://docs.expo.dev/router/reference/redirects/
---

# Redirects

Redirect a request to a different URL based on in-app criteria. Expo Router supports a number of redirection patterns.

## Signature / Usage

Using the `Redirect` component to redirect immediately from a screen:

```tsx
import { View, Text } from 'react-native';
import { Redirect } from 'expo-router';

export default function Page() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <View>
      <Text>Welcome Back!</Text>
    </View>
  );
}
```

Using the `useRouter` hook to redirect imperatively:

```tsx
import { Text } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';

function MyScreen() {
  const router = useRouter();

  useFocusEffect(() => {
    // Call the replace method to redirect to a new route without adding to the history.
    // We do this in a useFocusEffect to ensure the redirect happens every time the screen
    // is focused.
    router.replace('/profile/settings');
  });

  return <Text>My Screen</Text>;
}
```

## Notes

- `router.replace` redirects without adding to the history.
- Source: https://docs.expo.dev/router/reference/redirects/ (unversioned guide, fetched 2026-10-17, modificationDate July 10, 2024).

## Related

- [Router API](./router-api.md)
- [Focus handling](./focus-handling.md)
