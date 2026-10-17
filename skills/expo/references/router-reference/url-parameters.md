---
source: https://docs.expo.dev/router/reference/url-parameters/
---

# Using URL parameters

URL parameters include **route parameters** (dynamic segments such as `/profile/[user]`, used to match a route) and **search parameters** (query params such as `/profile?extra=info`, serializable fields commonly used to pass data between pages). Expo Router provides hooks for accessing and modifying them.

## Signature / Usage

```tsx
// src/app/[user].tsx
import { Text, View } from 'react-native';
import { useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';

const friends = ['charlie', 'james']

export default function Route() {
  const glob = useGlobalSearchParams();
  const local = useLocalSearchParams();

  console.log("Local:", local.user, "Global:", glob.user);

  return (
    <View>
      <Text>User: {local.user}</Text>
      {friends.map(friend => (
        <Link key={friend} href={`/${friend}`}>
          Visit {friend}
        </Link>
      ))}
    </View>
  );
}
```

Statically-typed params via generics:

```tsx
const { user } = useLocalSearchParams<{ user: string }>();
// Given the URL: `/evanbacon`
// The following is returned: { user: "evanbacon" }

const { user, query } = useLocalSearchParams<{ user: string; query?: string }>();
// Given the URL: `/evanbacon?query=hello`
// The following is returned: { user: "evanbacon", query: "hello" }
```

With rest syntax (`...`), route parameters are returned as a string array; search parameters remain individual strings:

```tsx
// src/app/[...everything].tsx
const { everything } = useLocalSearchParams<{
  everything: string[];
  query?: string;
  query2?: string;
}>();
// Given the URL: `/evanbacon/123?query=hello&query2=world`
// The following is returned: { everything: ["evanbacon", "123"], query: "hello", query2: "world" }
```

Updating URL parameters with `router.setParams` (does not push anything new to the history stack):

```tsx
import { useLocalSearchParams, router } from 'expo-router';
import { Text } from 'react-native';

export default function User() {
  const params = useLocalSearchParams<{ user: string }>();

  return (
    <>
      <Text>User: {params.user}</Text>
      <Text onPress={() => router.setParams({ user: 'evan' })}>Go to Evan</Text>
    </>
  );
}
```

Hash support: the URL hash is treated as a special search parameter named `#`:

```tsx
// Access the hash
const { '#': hash } = useLocalSearchParams<{ '#': string }>();

router.setParams({ '#': 'my-hash' });
router.push('/#my-hash');
// <Link href="/#my-hash">Link with a hash</Link>
```

## Options / Props

| Hook | Description |
| --- | --- |
| `useLocalSearchParams` | Returns the URL parameters for the current component. Only updates when the global URL conforms to the route. |
| `useGlobalSearchParams` | Returns the global URL parameters regardless of the component. Updates on every URL param change and might cause components to update extraneously in the background. |

## Notes

- In apps with nested navigators, multiple pages are mounted at the same time (a stack keeps the previous and current page in memory). Both hooks are typed and accessed the same way; they differ in update frequency.
- Example result (`/[user]` pushes `charlie`): the first screen logs `Local: evanbacon Global: charlie`. `useGlobalSearchParams` re-renders background screens when route parameters change (in stack order) and can cause performance issues if overused; `useLocalSearchParams` stays the same, which is useful for data fetching so the previous screen's data remains available when navigating back.
- When a `[user]` route matches, the `user` route parameter is passed to the component and is never nullish. Optional search parameters can be `undefined`.
- Whenever a route parameter changes, the component re-mounts.
- Reserved parameters used internally by Expo Router and React Navigation; avoid them as your own parameter names: `screen`, `params`, `initial`, `state`.
- Source: https://docs.expo.dev/router/reference/url-parameters/ (unversioned guide, fetched 2026-10-17, modificationDate May 18, 2026).

## Related

- [Typed routes](./typed-routes.md)
- [Router API](./router-api.md)
