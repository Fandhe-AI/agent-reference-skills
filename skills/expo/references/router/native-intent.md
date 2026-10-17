---
source: https://docs.expo.dev/router/advanced/native-intent/
---

# Customizing links

Rewrite incoming deep links and react to URL changes with `+native-intent` and `usePathname()` in Expo Router.

## Signature / Usage

Create **src/app/+native-intent.tsx** and export `redirectSystemPath`. It receives an `options` object with `path` and `initial`.

```ts
import ThirdPartyService from 'third-party-sdk';

export function redirectSystemPath({ path, initial }) {
  try {
    if (initial) {
      // While the parameter is called `path` there is no guarantee that this is a path or a valid URL
      const url = new URL(path, 'myapp://app.home');
      // Detection of third-party URLs will change based on the provider
      if (url.hostname === '<third-party-provider-hostname>') {
        return ThirdPartyService.processReferringUrl(url).catch(() => {
          // Something went wrong
          return '/unexpected-error';
        });
      }
      return path;
    }
    return path;
  } catch {
    // Do not crash inside this function! Instead you should redirect users
    // to a custom route to handle unexpected errors, where they are able to report the incident
    return '/unexpected-error';
  }
}
```

Rewrite URLs while the app is open from a `_layout` using `usePathname()`; the location of the `_layout` sets the scope (root layout = global, a directory or group `_layout` = localized):

```tsx
import { Slot, Redirect, usePathname } from 'expo-router';

export default function RootLayout() {
  const pathname = usePathname();

  // isUserAllowed is your own app-defined function
  if (pathname && !isUserAllowed(pathname)) {
    return <Redirect href="/home" />;
  }

  return <Slot />;
}
```

Send navigation events to a third-party service:

```tsx
import { useEffect } from 'react';
import ThirdPartyService from 'third-party-sdk';
import { Slot, usePathname } from 'expo-router';

const thirdParty = new ThirdPartyService();

export default function RootLayout() {
  const pathname = usePathname();

  // Perform the service initiation logic
  useEffect(() => {
    thirdParty.register();
    return () => {
      thirdParty.deregister();
    };
  }, [thirdParty]);

  // Send pathname changes to the third party
  useEffect(() => {
    thirdParty.sendEvent({ pathname });
  }, [pathname]);

  return <Slot />;
}
```

Force a URL to be evaluated by the browser by writing a fully qualified `http`/`https` URL:

```ts
<Link href="https://my-website.com/router/introduction" />
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `path` | string | Incoming value. Despite the name there is no guarantee that it is a path or a valid URL |
| `initial` | boolean | Passed to `redirectSystemPath`; used above to branch on the initial (app closed) launch |

## Notes

- Two scenarios: **App Closed** (incoming deep-link URLs may require rewriting) and **App Open** (URL customization based on business logic; global or localized to a set of routes).
- Incoming URLs can be unique/referred URLs from third-party providers (for example `<my-scheme>://<provider-hostname>/<uuid>`) or stale URLs from previous app versions.
- Web: Expo Router cannot provide a counterpart to `+native-intent` because web routing is resolved before JavaScript runs. Use a **Server Redirect** (server or static output) or a **Client Redirect** in the root `_layout` (client-side rendering only).
- `redirectSystemPath` is native-only and processed outside the app context, so it has no access to user authentication status or the current route state.
- Universal Links and multiple domains need no extra Expo Router configuration; all URLs given to the app are evaluated. Customize the URL scheme(s) via the `scheme` value in app config.
- `legacy_subscribe` is in alpha (available in SDK 52). It is for third-party providers that support React Navigation through `Linking.subscribe` but not Expo Router. Not recommended for new projects; incompatible with server-side routing and static rendering, and hard to manage offline or on poor connections.
- Expo Router is file-based and built on React Navigation, and `+native-intent` is unrelated to router libraries of the same domain. See react-router and tanstack-router for the differently shaped APIs.
- The imports of `usePathname` and `useEffect` are added in the snippets above; the official snippets omit them. `isUserAllowed` is an app-defined placeholder.
- Page modification date: September 25, 2026. Source fetched 2026-10-17.

## Related

- [Notation](./notation.md)
- [Navigation layouts](./navigation-layouts.md)
- [Router settings](./router-settings.md)
