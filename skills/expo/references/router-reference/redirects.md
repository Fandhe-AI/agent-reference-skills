---
source: https://docs.expo.dev/router/reference/redirects/
---

# Redirects and rewrites

Redirect or rewrite an incoming request to a different URL, in the app and on the server. Expo Router supports a number of redirection patterns.

## Signature / Usage

### In-app redirects

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

### Server redirects

Use the `redirects` option of the `expo-router` config plugin in app config to redirect routes that no longer exist in the **app** directory. The server matches each rule against the request URL (not the screen name) and responds with a redirect status code and a `Location` header.

```json app.json
{
  "plugins": [
    [
      "expo-router",
      {
        "redirects": [
          {
            "source": "/redirect/from/here",
            "destination": "/to/this/route"
          },
          {
            "source": "/or/redirect/from/here",
            "destination": "https://to.this.site"
          }
        ]
      }
    ]
  ]
}
```

Set `permanent` to `true` when the resource has a new permanent URL (default `false`):

```json app.json
{
  "plugins": [
    [
      "expo-router",
      {
        "redirects": [
          {
            "source": "/old-pricing",
            "destination": "/pricing",
            "permanent": true
          }
        ]
      }
    ]
  ]
}
```

Dynamic segments use the dynamic route syntax. A segment name that appears in both `source` and `destination` keeps its value; a segment that only appears in `source` becomes a query parameter of the destination:

```json app.json
{
  "plugins": [
    [
      "expo-router",
      {
        "redirects": [
          {
            "source": "/redirect/[fruit]/[vegetable]/[meat]",
            "destination": "/target/[vegetable]/[fruit]"
          }
        ]
      }
    ]
  ]
}
```

With the rule above, `/redirect/apple/carrot/beef` redirects to `/target/carrot/apple?meat=beef`. A catch-all segment matches the rest of the path:

```json app.json
{
  "plugins": [
    [
      "expo-router",
      {
        "redirects": [
          {
            "source": "/redirect/docs/[...path]",
            "destination": "/guides/[...path]"
          }
        ]
      }
    ]
  ]
}
```

With the rule above, `/redirect/docs/router/intro` redirects to `/guides/router/intro`. To redirect only some HTTP methods, list them in `methods`:

```json app.json
{
  "plugins": [
    [
      "expo-router",
      {
        "redirects": [
          {
            "source": "/redirect/[slug]",
            "destination": "/target/[slug]",
            "methods": ["POST"]
          }
        ]
      }
    ]
  ]
}
```

### Server rewrites

Use the `rewrites` option to serve one route at another URL. The server handles a request for `source` as if the client had requested `destination`; the browser URL does not change and no redirect status code is sent.

```json app.json
{
  "plugins": [
    [
      "expo-router",
      {
        "rewrites": [
          {
            "source": "/rewrite/from/here",
            "destination": "/to/this/route"
          }
        ]
      }
    ]
  ]
}
```

## Options / Props

| Name | Description |
| --- | --- |
| `source` | URL path to match (not the route file on disk); no `/index` suffix for a directory route and no `+api` for an API route. May use dynamic route syntax |
| `destination` | URL path (or, for redirects only, an external URL) to send the request to |
| `permanent` | Redirects only. `false` (default): temporary; `true`: permanent, clients can cache it |
| `methods` | Redirects only. HTTP methods to redirect: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`, `HEAD`. Screen requests use `GET` |

Status codes for redirects:

| Request method | `permanent: false` (default) | `permanent: true` |
| --- | --- | --- |
| `GET`, `HEAD` | 302 | 301 |
| Other methods | 307 | 308 |

## Notes

- `router.replace` redirects without adding to the history.
- Rewrites only work with `web.output: "server"`; static output does not support them. An external URL is not a valid rewrite `destination`; the other rules for redirects also apply to rewrites.
- For redirects that depend on request properties such as headers or cookies, use middleware (see the middleware page in `router-web`).
- Server rules in the app: the app reads `redirects` and `rewrites` from the app config at runtime on Android, iOS, and web, and applies them to the initial URL, incoming deep links, and every navigation call (`router.push()`, `Link` press). It treats a rewrite rule as a redirect rule (the URL changes), ignores `permanent` and `methods`, opens an external `destination` with the device's URL handler, and drops a dynamic segment that only appears in `source` instead of adding it as a query parameter.
- Source: https://docs.expo.dev/router/reference/redirects/ (docs/pages/router/reference/redirects.mdx at tag expo@58.0.25).

## Related

- [Router API](./router-api.md)
- [Focus handling](./focus-handling.md)
