# Sign Out

Terminate the current user session and optionally redirect after logout.

```typescript
// Basic sign out
await authClient.signOut();

// Sign out with post-logout redirect
await authClient.signOut({
  fetchOptions: {
    onSuccess: () => router.push("/login"),
  },
});
```

## Notes

- `signOut` invalidates the session cookie and removes the server-side session record
- Use `fetchOptions.onSuccess` for client-side redirect after the request completes
- To sign out from all devices, call `authClient.revokeSessions()` before `signOut`
- Server-side sign out can be performed via `auth.api.signOut({ headers })`
