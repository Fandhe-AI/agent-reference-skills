---
source: https://docs.expo.dev/router/reference/typed-routes/
---

# Typed routes

Expo Router supports generating TypeScript types automatically with Expo CLI. This enables `<Link>` and the hooks API to be statically typed. The feature is currently in beta and is not enabled by default. Available when using TypeScript.

## Signature / Usage

Enable it in **app.json** (projects created from the Expo Router quick start are already configured):

```json
{
  "expo": {
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

Run `npx expo customize tsconfig.json` to add the required `includes` fields, then `npx expo start`. You can then use autocomplete in the `<Link>` component's `href` prop.

Statically typed hrefs (`Href<T>`):

```tsx
✅ <Link href="/about" />
✅ <Link href="/user/1" />
✅ <Link href={`/user/${id}`} />
✅ <Link href={("/user" + id) as Href} />
// TypeScript errors if href is not a valid route
❌ <Link href="/usser/1" />
```

Dynamic routes need object hrefs with strictly typed params:

```tsx
✅ <Link href={{ pathname: "/user/[id]", params: { id: 1 }}} />
// TypeScript errors as href is valid, but it should be a HrefObject with params
❌ <Link href="/user/[id]" />
// TypeScript errors as params contain invalid keys
❌ <Link href={{ pathname: "/user/[id]", params: { _id: 1 }}} />
// TypeScript errors as params contain unknown keys
❌ <Link href={{ pathname: "/user/[id]", params: { id: 1, id2: 2 }}} />
```

Statically typed routes do not support relative paths; use absolute paths for all routes. Use `useSegments()` to build tab-relative paths:

```tsx
import { Link, useSegments } from 'expo-router';

export function Button() {
  const [
    // This will be either `(feed)` or `(search)` depending on the current tab.
    first,
  ] = useSegments();

  return <Link href={`/${first}/profile`}>Push profile</Link>;
}
```

Pass the full route to `useSegments` for a specific use:

```tsx
const segments = useSegments<'/(search)/profile'>();
//    ^? segments = ['(search)', 'profile']
```

Imperative navigation is typed too:

```tsx
import { router } from 'expo-router';

router.push('/about');
```

Route parameters: pass a full href to `useLocalSearchParams` / `useGlobalSearchParams`:

```tsx
const {
  profile, // string
  search, // string[]
} = useLocalSearchParams<'/(search)/[profile]/[...search]'>();
```

Query parameters are not represented in the file system; type them manually with a generic. For a combination of route and query parameters, pass the route first, then the query parameters:

```tsx
const { query } = useLocalSearchParams<{ query?: string }>();

const { query, profile, search } = useLocalSearchParams<
  '/[profile]/[...search]',
  { query?: string }
>();
```

## Notes

- A `Route` type is also exported by `expo-router`, matching all valid routes in a project automatically.
- Types are generated when the development server starts. Generated types are untracked by Git (added to the local **.gitignore**). To generate types without the dev server (for example type checking on CI), run `npx expo customize tsconfig.json`.
- With typed routes enabled, Expo CLI generates a git-ignored **expo-env.d.ts** in the project root, updates **.gitignore**, and modifies **tsconfig.json** `includes` to add **expo-env.d.ts** and a hidden **.expo** directory. These entries are required; do not remove, change, or commit **expo-env.d.ts**.
- Global types added: `process.env.NODE_ENV = "development" | "production" | "test"`; importing `.[css|sass|scss]` files; `*.module.[css|sass|scss]` exports as `Record<string, string>`; types for Metro's `require.context` (enabled by `expo/metro-config`, used for static route generation).
- React Native Web augmentations of `react-native` types: web-only styles for `ViewStyle`, `TextStyle`, `ImageStyle`; `tabIndex`, `aria-level`, `lang` on `TextProps`; `hovered` in Pressable's `children` and `style` state callback; `className` elements.
- Source: https://docs.expo.dev/router/reference/typed-routes/ (unversioned guide, fetched 2026-10-17, modificationDate February 28, 2026).

## Related

- [Router API](./router-api.md)
- [Router Link](./router-link.md)
- [URL parameters](./url-parameters.md)
