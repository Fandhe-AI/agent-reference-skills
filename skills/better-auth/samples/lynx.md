# Lynx Integration

Create a Lynx client with `better-auth/lynx` for cross-platform (Android/iOS/Web) apps built on the Lynx rendering framework.

```ts
// lib/auth-client.ts
import { createAuthClient } from "better-auth/lynx";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});
```

```tsx
// components/user.tsx — reactive session hook
import { authClient } from "../lib/auth-client";

export function User() {
  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return session ? (
    <div>
      <p>Welcome, {session.user.name}!</p>
      <button onClick={() => authClient.signOut()}>Sign Out</button>
    </div>
  ) : (
    <button onClick={() => authClient.signIn.social({ provider: "github" })}>
      Sign In with GitHub
    </button>
  );
}
```

## Notes

- Lynx client state is backed by nanostores; use `useStore(authClient.$store.session, { keys: [...] })` from `better-auth/lynx` for selective re-renders
- All Better Auth plugins work unchanged — register with `plugins: [...]` on `createAuthClient`, same as any other client
- API surface (`signIn.email`, `signUp.email`, `signOut`, error handling via `{ data, error }`) is identical to the web clients
