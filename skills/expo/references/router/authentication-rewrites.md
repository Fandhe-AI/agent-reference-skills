---
source: https://docs.expo.dev/router/advanced/authentication-rewrites/
---

# Authentication in Expo Router using redirects

Authenticate users with React Context, route groups and a `Redirect` in the group layout. This is the guide for SDK 52 and earlier.

## Signature / Usage

Project structure: `app/_layout.tsx`, `app/sign-in.tsx` (always accessible), `app/(app)/_layout.tsx` (protects child routes), `app/(app)/index.tsx` (requires authorization).

Session context (`ctx.tsx`, mock implementation):

```tsx
import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // Perform sign-in logic here
          setSession('xxx');
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
```

Root layout (the `<Slot />` must be mounted before any navigation events are triggered, otherwise a runtime error is thrown):

```tsx
import { Slot } from 'expo-router';
import { SessionProvider } from '../ctx';

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
```

Group layout that redirects unauthenticated users:

```tsx
import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';

import { useSession } from '../../ctx';

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}
```

Sign-in screen (`app/sign-in.tsx`) calls `signIn()` then `router.replace('/')`; the sign-out screen `app/(app)/index.tsx` calls `signOut()` and the group layout redirects to sign-in.

Fixing "Attempted to navigate before mounting the Root Layout component": keep the root layout returning `<Slot />` and move conditional logic into a nested group layout.

```tsx
// app/_layout.tsx
export default function RootLayout() {
  return <Slot />;
}
```

```tsx
// app/(app)/_layout.tsx
export default function RootLayout() {
  React.useEffect(() => {
    router.push('/about');
  }, []);

  // It is OK to defer rendering this nested layout's content.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return <Slot />;
}
```

## Notes

- SDK 53 introduced Protected routes, a more powerful method; follow this guide only for SDK 52 and earlier.
- Something must be rendered while loading the initial auth state; alternatively make the `index` route a loading state and move the initial route to something such as `/home`.
- The sign-in modal pattern uses `unstable_settings = { anchor: '(root)' }` with `presentation: 'modal'` (same code as in the Authentication guide).
- Error text: `Error: Attempted to navigate before mounting the Root Layout component. Ensure the Root Layout component is rendering a Slot, or other navigator on the first render.`
- Web: no custom middleware or serving in this guide's context; use client-side redirects and a loading state.
- Source fetched 2026-10-17.

## Related

- [Authentication](./authentication.md)
- [Protected routes](./protected-routes.md)
