# Errors

## Signature / Usage

```typescript
betterAuth({
  onAPIError: {
    errorURL: "/api/auth/error",      // error redirect URL
    throw: false,                     // whether to re-throw errors
    onError: (error) => { /* ... */ }, // custom error handler
    customizeDefaultErrorPage: { /* ... */ } // error page appearance
  }
})
```

## Options / Props

| Error Code | Description |
| --- | --- |
| `invalid_callback_request` | Failed to parse the OAuth callback request |
| `state_not_found` | The `state` parameter is missing from the OAuth callback |
| `state_mismatch` | The request's `state` parameter doesn't match the cookie's `state` |
| `state_invalid` | Failed to decrypt/parse the OAuth state cookie when using the cookie strategy |
| `no_code` | The authorization code is missing from the OAuth callback |
| `invalid_code` | The authorization code is invalid or expired |
| `no_callback_url` | The `state` parameter doesn't contain a callback URL |
| `oauth_provider_not_found` | No provider segment found in the callback URL |
| `email_not_found` | The provider didn't return an email address |
| `email_doesn't_match` | The provider's email doesn't match the authenticated user's email |
| `unable_to_get_user_info` | Unable to retrieve user information from the provider |
| `unable_to_link_account` | Unable to link the provider account to the user |
| `account_already_linked_to_different_user` | The provider account is already linked to a different user |
| `account_not_linked` | The OAuth provider account isn't linked to the current user |
| `signup_disabled` | Sign-up attempted on a provider with sign-up disabled |
| `unable_to_create_session` | Failed to create a session after successful authentication |
| `unable_to_create_user` | Failed to create a user during authentication |
| `internal_server_error` | An unexpected error occurred during authentication |

## Notes

- When an error occurs, users are redirected to `/api/auth/error`.
- See the individual error reference pages below for causes and fixes.

## Related

- [error-invalid-callback-request](./error-invalid-callback-request.md)
- [error-state-not-found](./error-state-not-found.md)
- [error-state-mismatch](./error-state-mismatch.md)
- [error-state-invalid](./error-state-invalid.md)
- [error-no-code](./error-no-code.md)
- [error-invalid-code](./error-invalid-code.md)
- [error-no-callback-url](./error-no-callback-url.md)
- [error-oauth-provider-not-found](./error-oauth-provider-not-found.md)
- [error-email-not-found](./error-email-not-found.md)
- [error-email-doesnt-match](./error-email-doesnt-match.md)
- [error-unable-to-get-user-info](./error-unable-to-get-user-info.md)
- [error-unable-to-link-account](./error-unable-to-link-account.md)
- [error-account-already-linked](./error-account-already-linked.md)
- [error-account-not-linked](./error-account-not-linked.md)
- [error-signup-disabled](./error-signup-disabled.md)
- [error-unable-to-create-session](./error-unable-to-create-session.md)
- [error-unable-to-create-user](./error-unable-to-create-user.md)
- [error-internal-server-error](./error-internal-server-error.md)
- [error-unknown](./error-unknown.md)
