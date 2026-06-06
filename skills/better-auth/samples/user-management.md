# User Management

Update user profile, change email or password, and delete accounts.

```typescript
// Update profile fields
await authClient.updateUser({
  name: "Jane Doe",
  image: "https://example.com/avatar.jpg",
});
```

```typescript
// Change email (sends verification to new address)
await authClient.changeEmail({
  newEmail: "new-email@example.com",
  callbackURL: "/dashboard",
});
```

```typescript
// Change password (client)
const { data, error } = await authClient.changePassword({
  newPassword: "newpassword1234",
  currentPassword: "oldpassword1234",
  revokeOtherSessions: true, // invalidate sessions on other devices
});

// Change password (server action)
const data = await auth.api.changePassword({
  body: {
    newPassword: "newpassword1234",
    currentPassword: "oldpassword1234",
    revokeOtherSessions: true,
  },
  headers: await headers(),
});
```

```typescript
// Delete account
await authClient.deleteUser({
  callbackURL: "/goodbye",
});

// List linked OAuth accounts
const accounts = await authClient.listAccounts();
```

## Notes

- `changeEmail` triggers an email verification to the new address before the change is applied
- `revokeOtherSessions: true` is recommended when changing passwords to force re-login on other devices
- `deleteUser` is irreversible; consider adding a confirmation step in the UI
- `listAccounts` returns all OAuth providers linked to the current user
