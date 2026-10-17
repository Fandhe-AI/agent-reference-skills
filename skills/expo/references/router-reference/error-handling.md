---
source: https://docs.expo.dev/router/error-handling/
---

# Error handling and loading states

How to handle unmatched routes, errors, and loading states in your app when using Expo Router.

## Signature / Usage

```tsx
// src/app/+not-found.tsx
import { Unmatched } from 'expo-router';
export default Unmatched;
```

This renders the default `Unmatched`. You can export any component you want to render instead. A link to `/` is recommended so users can navigate back to the home screen.

### Route priority (web)

1. Static files in the **public** directory.
2. Standard and dynamic routes in the app directory.
3. API routes in the app directory.
4. Not-found routes are served last with a 404 status code.

### ErrorBoundary

Export a nested `ErrorBoundary` component from any route to intercept and format component-level errors using React Error Boundaries. It receives `error` and `retry` props.

```tsx
// src/app/home.tsx
import { View, Text } from 'react-native';
import { type ErrorBoundaryProps } from 'expo-router';

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Text>{error.message}</Text>
      <Text onPress={retry}>Try Again?</Text>
    </View>
  );
}

export default function Page() { ... }
```

When `ErrorBoundary` is not present, the error is thrown to the nearest parent's `ErrorBoundary`.

### Error boundaries for screens in a layout

A screen error boundary keeps navigator UI, such as headers and tab bars, mounted when a screen throws. Configure it on a layout:

```tsx
// src/app/_layout.tsx
import { Stack, type ErrorBoundaryProps } from 'expo-router';
import { Text } from 'react-native';

function ScreenErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return <Text onPress={retry}>Try again: {error.message}</Text>;
}

// Configure the boundary for screens in this layout and nested layouts.
export const unstable_settings = {
  screenErrorBoundary: ScreenErrorBoundary,
};

export default function Layout() {
  return <Stack />;
}
```

Alternatively, configure the boundary on the navigator (this prop overrides `unstable_settings.screenErrorBoundary` for the same screens):

```tsx
export default function Layout() {
  return <Stack unstable_screenErrorBoundary={ScreenErrorBoundary} />;
}
```

Order in which error boundaries are applied:

1. `ErrorBoundary` exported from the screen
2. Navigator-level prop (for example, `Stack`)
3. `unstable_settings.screenErrorBoundary` declared in the **_layout.tsx** file

### SuspenseFallback

Expo Router wraps each route in a React Suspense boundary. Export a `SuspenseFallback` component from a layout file to customize the loading UI shown while any child route is suspended. It receives `route` and `params` props.

```tsx
// src/app/(app)/_layout.tsx
import { ActivityIndicator, Text, View } from 'react-native';
import { Stack, type SuspenseFallbackProps } from 'expo-router';

export function SuspenseFallback({ params }: SuspenseFallbackProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading profile {params.id}...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default function AppLayout() {
  return <Stack />;
}
```

## Notes

- Native apps don't have a server so there are technically no 404s; unmatched-route handling is done automatically for each app and can be customized.
- Nested layouts inherit `unstable_settings.screenErrorBoundary` unless they define their own screen error boundary. Set `screenErrorBoundary` to `null` in a nested layout to stop inheriting it.
- Custom suspense fallbacks are available in SDK 56 and later.
- In SDK 58 and later, async routes are enabled by default on web and use the default loading fallback instead of custom `SuspenseFallback` exports. To use custom fallbacks on web, set `asyncRoutes: { web: false }` in the `expo-router` config plugin in the app config. This restores synchronous route loading and custom fallback support. Native defaults are unchanged.
- When multiple parent layouts define a fallback, the nearest parent takes precedence.
- Async routes do not support custom Suspense fallbacks.
- Original docs: React Native LogBox needs to be presented less aggressively to develop with errors; currently it shows for `console.error` and `console.warn`.
- Source: https://docs.expo.dev/router/error-handling/ (unversioned guide, fetched 2026-10-17, modificationDate September 18, 2026).

## Related

- [Router API](./router-api.md)
- [Redirects](./redirects.md)
