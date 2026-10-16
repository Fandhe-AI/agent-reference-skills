# Client

Better Auth provides a framework-agnostic client library for frontend authentication. The core client supports React, Vue, Svelte, Solid, and vanilla JavaScript through framework-specific imports.

## Signature / Usage

### Basic setup

```typescript
import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});
```

### Auth methods

```typescript
// Sign in (Email)
const { data, error } = await authClient.signIn.email({
  email: "user@example.com",
  password: "password1234",
});

// Sign in (Social)
await authClient.signIn.social({
  provider: "github",
});

// Magic link
await authClient.signIn.magicLink({
  email: "test@email.com",
});
```

### useSession Hook

**React:**

```typescript
import { createAuthClient } from "better-auth/react";
const { useSession } = createAuthClient();

export function User() {
  const { data: session, isPending, error, refetch } = useSession();

  return (
    <div>
      {session && <p>Logged in as {session.user.name}</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
```

**Vue / Svelte:**

```typescript
const session = authClient.useSession();
// Returns: { data, isPending, error, refetch } (Svelte returns a store with reactive updates)
```

### Fetch options

```typescript
// Setting default fetch options
const authClient = createAuthClient({
  fetchOptions: {
    // better-fetch options
  },
});

// Per-request fetch options
await authClient.signIn.email(
  { email: "test@email.com", password: "pass" },
  { onSuccess(ctx) { /* success handling */ } }
);

// Or within the fetchOptions property
await authClient.signIn.email({
  email: "test@email.com",
  password: "pass",
  fetchOptions: { onSuccess(ctx) { /* */ } },
});
```

### Controlling hook re-renders

Disable automatic hook updates when an endpoint's success shouldn't trigger a UI update:

```typescript
await authClient.updateUser(
  { name: "New Name" },
  { disableSignal: true }
);

// Refetch manually when needed
const { refetch } = authClient.useSession();
await authClient.updateUser(
  { name: "New Name" },
  { disableSignal: true, onSuccess() { refetch(); } }
);
```

### Error handling

```typescript
const { data, error } = await authClient.signIn.email({
  email: "user@email.com",
  password: "pass",
});

// error object properties:
// - message: string (user-facing error message)
// - status: number (HTTP status code)
// - statusText: string (HTTP status text)
// - code?: string (error code for translation)
```

```typescript
const authClient = createAuthClient();

const errorMessages = {
  USER_ALREADY_EXISTS: {
    en: "user already registered",
    es: "usuario ya registrado",
  },
};

const { error } = await authClient.signUp.email({
  email: "user@email.com",
  password: "password",
  name: "User",
});

if (error?.code && error.code in errorMessages) {
  alert(errorMessages[error.code].en);
}
```

### SSR Hydration

With SSR frameworks like Next.js, Nuxt, or SvelteKit, `useSession` fetches the session on the client, causing a loading flash. Pass the server-fetched session to `hydrateSession` and use it as a fallback so the first render has data on both the server and the client:

```tsx
// page.tsx (server component)
const session = await auth.api.getSession({ headers: await headers() })
return <SessionCard initialSession={session} />
```

```tsx
// session-card.tsx (client component)
"use client"
import { authClient } from "@/lib/auth-client"

type Props = { initialSession: typeof authClient.$Infer.Session | null }

export function SessionCard({ initialSession }: Props) {
    authClient.hydrateSession(initialSession)
    const { data, isPending, isRefetching } = authClient.useSession()
    const session = isPending && !isRefetching ? initialSession : data

    if (!session) return <p>Not signed in</p>
    return <pre>{JSON.stringify(session, null, 2)}</pre>
}
```

Only the first non-null call to `hydrateSession` takes effect; passing `null` is ignored and `useSession` fetches as usual. In React, auth query hooks such as `useSession` and `useListOrganizations` return their initial pending state during server rendering and hydration, then update to the current client state, keeping streamed components consistent with their server HTML. Keep using the server-fetched session as a fallback to display it during hydration. Custom plugin stores that do not use `useAuthQuery` retain their existing snapshot behavior.

### Plugins

```typescript
import { createAuthClient } from "better-auth/client";
import { magicLinkClient } from "better-auth/client/plugins";

const authClient = createAuthClient({
  plugins: [magicLinkClient()],
});

// Using the new plugin method
await authClient.signIn.magicLink({ email: "test@email.com" });
```

## Options / Props

### createAuthClient config options

| Option | Type | Description |
|--------|------|-------------|
| `baseURL` | string | Base URL of the auth server (optional if same domain) |
| `fetchOptions` | object | Default fetch configuration |
| `disableDefaultFetchPlugins` | boolean | Disable browser-specific behavior (for React Native/Expo) |
| `plugins` | array | Extend functionality with client plugins |

### Per-framework imports

| Framework | Import Path | Usage |
|-----------|-------------|-------|
| React | `better-auth/react` | Hooks and client methods |
| Vue | `better-auth/vue` | Composition API support |
| Svelte | `better-auth/svelte` | Stores and reactive data |
| Solid | `better-auth/solid` | Signals and primitives |
| Vanilla JS | `better-auth/client` | Core functionality |

## Notes

- **Non-browser environments:** On React Native/Expo, set `disableDefaultFetchPlugins: true` to disable the default fetch plugins
- **Base URL configuration:** Provide the full URL explicitly, including any custom path (e.g. `http://localhost:3000/custom-path/auth`)
- **Fetch library:** Better Auth uses "better-fetch" (a wrapper around the native Fetch API)
- **Signal management:** Certain endpoints trigger atom signals, causing hook re-renders to keep the UI in sync with auth state
- Framework-agnostic core with framework-specific wrappers, consistent method signatures across all frameworks, and built-in reactive data management per framework

## Related

- [API](./api.md)
- [Session Management](./session-management.md)
