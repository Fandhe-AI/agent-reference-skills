---
source: https://docs.expo.dev/router/basics/navigation/
---

# Navigating between pages in Expo Router

Every page has a URL, so pages are reached with `Link`, the imperative `useRouter` API, or `Redirect`, using the same URL patterns as the web.

## Signature / Usage

```tsx
import { useRouter } from 'expo-router';
import { Button } from 'react-native';

export default function Home() {
  const router = useRouter();

  return <Button title="Go to About" onPress={() => router.navigate('/about')} />;
}
```

Link (`href` is the same route as in `router.navigate`; `asChild` for full layout control):

```tsx
import { Pressable, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <Link href="/other" asChild>
      <Pressable>
        <Text>Home</Text>
      </Pressable>
    </Link>
  );
}
```

Relative routes (`./` current directory, `../` parent; resolved relative to the current rendered screen):

```tsx
<Link href="./article">Go to article</Link>
```

```ts
router.navigate('./article');
```

Dynamic routes and params (file `src/app/user/[id].tsx`):

```tsx
<Link href="/user/bacon">View user (id inline)</Link>
<Link
  href={{
    pathname: '/user/[id]',
    params: { id: 'bacon' }
  }}
>
  View user (id in params in href)
</Link>
```

Query parameters, reading and updating without navigating:

```tsx
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function Users() {
  const { id, limit } = useLocalSearchParams();

  return (
    <View>
      <Link href="/users?limit=20">View users</Link>
      <Pressable onPress={() => router.setParams({ limit: 50 })}>
        <Text>View more users</Text>
      </Pressable>
    </View>
  );
}
```

Redirect (like `replace`; navigates without rendering the current page):

```tsx
import { Redirect } from 'expo-router';

export default function Page() {
  return <Redirect href="/about" />;
}
```

Prefetching:

```tsx
<Link href="/about" prefetch />
```

Anchor routes (deep links keep back navigation working):

```tsx
export const unstable_settings = {
  // Ensure any route can link back to `/`
  anchor: 'index',
};
```

```tsx
<Link href="/stack/second" withAnchor>
  Go to second
</Link>
```

Deep links: define a `scheme` in app config; with scheme `myapp`, `about.tsx` is `myapp://about` and `users/[username].tsx` is `myapp://users/evanbacon`.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `router.navigate` | function | Pushes a new page or unwinds to an existing route on the stack (usual choice) |
| `router.push` | function | Explicitly pushes a new page |
| `router.back` | function | Goes back to the previous page |
| `router.replace` | function | Replaces the current page on the stack |
| `router.setParams` | function | Updates query parameters without navigating |
| `Link` `asChild` | boolean | Pass behavior to a child such as `Pressable` instead of rendering `<Text>` |
| `Link` `prefetch` | boolean | Prefetch the target screen when the link renders |
| `Link` `withAnchor` | boolean | Force the anchor route to load when navigating into another stack in-app |

## Notes

- The query-parameter snippet wraps the original separate fragments (`<Link>`, `useLocalSearchParams()`, `router.setParams`) in one component with imports so it reads as valid code.
- Expo Router apps default to stack navigation.
- `Link` renders its children inside `<Text>` by default; non-text children such as `View` may lay out unexpectedly.
- A preloaded (prefetched) screen in a stack navigator cannot use the imperative `router` API, cannot update options with `useNavigation().setOptions()`, and cannot listen to navigator events (focus, tabPress, ...). The navigation object updates once navigated to; check `navigation.isFocused()` before dispatching or setting options.
- `anchor` is only considered for deep links, not in-app navigation, unless `withAnchor` is set. A missing back button when testing deep links is often fixed by setting an `anchor`.
- Some parameters are reserved for internal use by Expo Router and React Navigation (see URL parameters guide).
- Parameters not matching a dynamic segment name are equivalent to query parameters.
- Expo Router is file-based and built on React Navigation; its `Link` and `useRouter` differ from the same-named APIs in react-router and tanstack-router.

## Related

- [Navigation layouts](./navigation-layouts.md)
- [Common navigation patterns](./common-navigation-patterns.md)
- [Protected routes](./protected-routes.md)
