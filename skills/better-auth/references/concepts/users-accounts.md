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
        subject: "Verify your new email address",
        text: `Click the link to verify your new email: ${url}`,
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

### validateUserInfo

A gate that decides which identities Better Auth admits. It fires just before a user is created (`create-user`) or a new provider account is linked (`link-account`), for every authentication method (OAuth, OIDC SSO, SAML SSO, email/password, magic link, email OTP, anonymous, SIWE, phone number, admin-created users, SCIM), including stateless setups. It also fires when an existing OAuth or SSO user signs in again (`sign-in`), receiving the fresh provider email and profile; non-provider returning sign-ins are not re-validated (use the admin plugin's ban controls or a `databaseHooks.session.create.before` hook to block those).

`source.action` is `"create-user"`, `"link-account"`, or `"sign-in"`; `source.method` is the authentication method; `source.oauth` carries the provider id and raw provider profile; `source.sso` carries the SSO provider id and raw claims or assertion attributes. Return nothing to allow provisioning, or an object with `error` (and optional `errorDescription`, which is returned to the client) to reject: redirect flows send the rejection to the configured error URL, programmatic flows return a `403` API error.

```typescript
export const auth = betterAuth({
    user: {
        validateUserInfo: ({ user, source }) => {
            if (!user.email?.endsWith("@example.com")) {
                return { error: "email_not_allowed", errorDescription: "Use your example.com email to sign in" };
            }
            if (source.oauth?.providerId === "company-oauth" && source.oauth?.profile?.hd !== "example.com") {
                return { error: "invalid_organization", errorDescription: "Use your company OAuth account" };
            }
        },
    },
});
```

`validateUserInfo` is the high-level policy gate; the lower-level `databaseHooks.user.create.before` still runs afterward for data shaping and can also abort a write.

### Account management

Each auth provider creates an "account" that stores provider-specific data (tokens, credentials).

```typescript
import { authClient } from "@/lib/auth-client";

const accounts = await authClient.listAccounts();
```

### Token encryption

Better Auth does not encrypt OAuth tokens by default. Enable the built-in `account.encryptOAuthTokens` option (see `reference/options.md`). Tokens are then encrypted whenever they are stored, including on refresh. Better Auth decrypts them itself when it retrieves or refreshes tokens:

```typescript
export const auth = betterAuth({
  account: {
    encryptOAuthTokens: true,
  },
});
```

Do not encrypt tokens yourself in a `databaseHooks.account.create.before` hook. Such a hook only runs when an account is created, so tokens saved on refresh stay unencrypted. Better Auth's internal token retrieval and refresh also cannot decrypt them, and would send the ciphertext to the OAuth provider.

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
// 1.7: pass the local account row `id` from `listAccounts` as `accountId`;
// `providerId` alone is no longer accepted
const { data: accounts } = await authClient.listAccounts();
const google = accounts?.find((a) => a.providerId === "google");
if (google) {
  await authClient.unlinkAccount({ accountId: google.id });
}
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
- OAuth tokens are not encrypted by default. Enable `account.encryptOAuthTokens`; do not encrypt them yourself in a database hook
- `unlinkAccount` in 1.7 takes the local account row `id` from `listAccounts` as `accountId` and no `providerId`; the official sample passes `providerId` plus a made-up `accountId` (Adapted from the official docs)
- The change-email verification sample includes the verification `url` in the email body; without it the user cannot complete verification (Adapted from the official docs)

## Related

- [Email](./email.md)
- [OAuth](./oauth.md)
- [Session Management](./session-management.md)
