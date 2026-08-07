# Users & Accounts

Better Auth provides comprehensive user and account management beyond basic authentication, including user info updates, email/password changes, account deletion with verification, token encryption, and multi-provider account linking.

## Signature / Usage

### Updating user info

```typescript
import { authClient } from "@/lib/auth-client";

await authClient.updateUser({
  image: "https://example.com/image.jpg",
  name: "John Doe",
});
```

### Changing email

Server setup:

```typescript
export const auth = betterAuth({
  user: {
    changeEmail: {
      enabled: true,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      void sendEmail({
        to: user.email,
      });
    },
  },
});
```

Confirmation via current email (optional). Require confirmation via the current email before sending verification to the new address:

```typescript
user: {
  changeEmail: {
    enabled: true,
    sendChangeEmailConfirmation: async ({ user, newEmail, url, token }, request) => {
      void sendEmail({
        to: user.email, // Current email
        subject: "Approve email change",
        text: `Click the link to approve the change to ${newEmail}: ${url}`,
      });
    },
  },
}
```

Updating without verification. Allow immediate updates when the current email is unverified:

```typescript
changeEmail: {
  enabled: true,
  updateEmailWithoutVerification: true,
}
```

Client usage:

```typescript
await authClient.changeEmail({
  newEmail: "new-email@email.com",
  callbackURL: "/dashboard",
});
```

### Changing password

```typescript
// Client
const { data, error } = await authClient.changePassword({
  newPassword: "newpassword1234",
  currentPassword: "oldpassword1234",
  revokeOtherSessions: true,
});

// Server
const data = await auth.api.changePassword({
  body: {
    newPassword: "newpassword1234",
    currentPassword: "oldpassword1234",
    revokeOtherSessions: true,
  },
  headers: await headers(),
});
```

### Setting a password

For OAuth users without a password (server only):

```typescript
import { auth } from "@/lib/auth";

await auth.api.setPassword({
  body: {
    newPassword: "new-password",
  },
  headers: await headers(),
});
```

### Verifying a password

Confirm user identity before sensitive operations:

```typescript
import { auth } from "@/lib/auth";

await auth.api.verifyPassword({
  body: {
    password: "user-password",
  },
  headers: await headers(),
});
```

OAuth users without a password should use email verification or a fresh session check instead.

### Deleting a user

Enabling deletion:

```typescript
export const auth = betterAuth({
  user: {
    deleteUser: {
      enabled: true,
    },
  },
});
```

Adding verification. Implement email verification before deletion:

```typescript
user: {
  deleteUser: {
    enabled: true,
    sendDeleteAccountVerification: async ({ user, url, token }, request) => {
      // Send the verification email
    },
  },
}
```

Client usage:

```typescript
await authClient.deleteUser({
  callbackURL: "/goodbye",
});

// Or with a token
await authClient.deleteUser({
  token,
});

// Or with a password
await authClient.deleteUser({
  password: "password",
});
```

Callbacks:

```typescript
deleteUser: {
  enabled: true,
  beforeDelete: async (user) => {
    if (user.email.includes("admin")) {
      throw new APIError("BAD_REQUEST", {
        message: "Admin accounts can't be deleted",
      });
    }
  },
  afterDelete: async (user, request) => {
    // Cleanup logic
  },
}
```

### Account management

Each auth provider creates an "account" that stores provider-specific data (tokens, credentials).

```typescript
import { authClient } from "@/lib/auth-client";

const accounts = await authClient.listAccounts();
```

### Token encryption

Better Auth does not encrypt tokens by default. Implement encryption using a database hook:

```typescript
export const auth = betterAuth({
  databaseHooks: {
    account: {
      create: {
        before(account, context) {
          const withEncryptedTokens = { ...account };
          if (account.accessToken) {
            withEncryptedTokens.accessToken = encrypt(account.accessToken);
          }
          if (account.refreshToken) {
            withEncryptedTokens.refreshToken = encrypt(account.refreshToken);
          }
          return { data: withEncryptedTokens };
        },
      },
    },
  },
});
```

Decrypt tokens before using them when retrieving an account.

### Account linking

Account linking is enabled by default, letting a user associate multiple auth methods with a single account. Email verification from the provider is typically required.

```typescript
// Disabling linking
account: {
  accountLinking: {
    enabled: false,
  },
}

// Forced linking: automatically link accounts from trusted providers regardless of verification
account: {
  accountLinking: {
    enabled: true,
    trustedProviders: ["google", "github"],
  },
}
```

Manual social account linking:

```typescript
await authClient.linkSocial({
  provider: "google",
  callbackURL: "/callback",
});

// With a custom scope
await authClient.linkSocial({
  provider: "google",
  callbackURL: "/callback",
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

// With an ID token (no redirect)
await authClient.linkSocial({
  provider: "google",
  idToken: {
    token: "id_token_from_provider",
    nonce: "nonce_used_for_token",
    accessToken: "access_token",
    refreshToken: "refresh_token",
  },
});
```

Allow different emails on linked accounts / update user info on link:

```typescript
accountLinking: {
  allowDifferentEmails: true,
  updateUserInfoOnLink: true,
}
```

Use `setPassword` (server) or the "password reset" flow for credential account linking.

### Unlinking an account

```typescript
await authClient.unlinkAccount({
  providerId: "google",
});

// Unlinking a specific account
await authClient.unlinkAccount({
  providerId: "google",
  accountId: "123",
});
```

**Safeguard:** unlinking is prevented if a user has only one account remaining (unless `allowUnlinkingAll: true` is set).

```typescript
account: {
  accountLinking: {
    allowUnlinkingAll: true,
  },
}
```

## Options / Props

### User deletion auth requirements

A user must satisfy one of the following:

1. **Valid password** — provided at deletion time
2. **Fresh session** — recently signed in (default: 1-day freshness window)
3. **Email verification enabled** — for OAuth users
4. **Valid verification token** — from the email callback

## Notes

- Don't await email sending, to prevent timing attacks
- For OAuth users without a password, use email verification or a fresh session check
- Account linking is enabled by default
- Token encryption is not performed by default — must be implemented via a database hook

## Related

- [Email](./email.md)
- [OAuth](./oauth.md)
- [Session Management](./session-management.md)
