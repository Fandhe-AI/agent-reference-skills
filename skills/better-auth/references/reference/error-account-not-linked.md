# account_not_linked

## Signature / Usage

```typescript
export const auth = betterAuth({
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google", "github"]  // as needed
        }
    }
})
```

This error occurs during an OAuth flow when a provider account cannot be linked to the current user, either because linking conditions are not met or automatic linking is not permitted.

## Notes

- Main causes:
  - The user registered with a different auth provider or method
  - Account linking is not enabled or not configured correctly
  - The provider's email does not match the existing user account
  - Configuration rules (e.g., trusted provider restrictions) block automatic linking
- Resolution:
  - Enable and configure account linking as shown above
  - Verify the OAuth provider returns a verified email that matches the existing user record
  - Guide the user to authenticate using the provider or sign-up method they connected first
  - Confirm auth configuration is consistent across all deployment environments

## Related

- [account_already_linked_to_different_user](./error-account-already-linked.md)
- [errors](./errors.md)
