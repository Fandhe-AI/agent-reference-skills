---
source: https://docs.expo.dev/router/advanced/authentication/
---

# Authentication in Expo Router

Authenticate users with a React Context session provider and `Stack.Protected` routes. All routes are always defined and accessible; runtime logic redirects users away from screens depending on authentication.

## Signature / Usage

Project structure: `src/app/_layout.tsx` (controls what is protected), `src/app/sign-in.tsx` (always accessible), `src/app/(app)/_layout.tsx` (requires authorization), `src/app/(app)/index.tsx` (protected).

Session context (`src/ctx.tsx`, mock implementation; replace with your own authentication provider):

```tsx
import { use, createContext, type PropsWithChildren } from 'react';

import { useStorageState } from './useStorageState';

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
} | null>(null);

// Use this hook to access the user info.
export function useSession() {
  const value = use(AuthContext);
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

Persisting the token (`src/useStorageState.ts`; `expo-secure-store` on native, local storage on web):

```tsx
import  { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();

  // Get
  useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          setState(localStorage.getItem(key));
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      SecureStore.getItemAsync(key).then((value: string | null) => {
        setState(value);
      });
    }
  }, [key]);

  // Set
  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
```

Keep the splash screen visible until authentication loads (`src/splash.tsx`):

```tsx
import { SplashScreen } from 'expo-router';
import { useSession } from './ctx';

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isLoading } = useSession();

  if (!isLoading) {
    SplashScreen.hide();
  }

  return null;
}
```

Root layout with protected routes (`SplashScreenController` must be inside `SessionProvider`):

```tsx
import { Stack } from 'expo-router';

import { SessionProvider, useSession } from '@/ctx';
import { SplashScreenController } from '@/splash';

export default function Root() {
  // Set up the auth context and render your layout inside of it.
  return (
    <SessionProvider>
      <SplashScreenController />
      <RootNavigator />
    </SessionProvider>
  );
}

function RootNavigator() {
  const { session } = useSession();

  return (
    <Stack>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="sign-in" />
      </Stack.Protected>
    </Stack>
  );
}
```

Sign-in screen (outside the `(app)` group, so the group's layout and authentication check do not run):

```tsx
import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { useSession } from '@/ctx';

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is successful before navigating.
          router.replace('/');
        }}>
        Sign In
      </Text>
    </View>
  );
}
```

Authenticated screen (`src/app/(app)/index.tsx`) calls `signOut()`; `src/app/(app)/_layout.tsx` returns `<Stack />`.

Sign-in modal over the app (`src/app/(app)/_layout.tsx`; routes render in the background, so they must handle data loading without authentication):

```tsx
import { Stack } from 'expo-router';

export const unstable_settings = {
  anchor: '(root)',
};

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(root)" />
      <Stack.Screen
        name="sign-in"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
```

## Notes

- Protected routes redirect to the anchor route (usually the index screen) or the first available screen in the stack, including when a screen becomes protected while active. Deep links to protected routes redirect to sign-in.
- This is the current guide; the SDK 52 and earlier guide is [Authentication (redirects)](./authentication-rewrites.md).
- Web: Expo Router on the web currently only supports build-time static generation and has no support for custom middleware or serving; use client-side redirects and a loading state.
- Expo Router's `Stack.Protected` is client-side navigation logic, not an auth library; see better-auth and supabase for authentication providers.
- Page modification date is not recorded in the saved source head used here; source fetched 2026-10-17.

## Related

- [Protected routes](./protected-routes.md)
- [Authentication using redirects](./authentication-rewrites.md)
- [Modals](./modals.md)
