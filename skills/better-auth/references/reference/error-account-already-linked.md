# account_already_linked_to_different_user

## 説明

This error occurs when attempting to link an OAuth provider account to the currently authenticated user, but that provider account is already linked to another user in the project. Better Auth blocks this linkage to prevent account takeover attacks.

## 原因

- Previously signed in with this provider under a different user account
- Two separate local accounts exist (email/password or magic link), with the provider already linked to one
- Shared OAuth configuration across test/preview/production environments pointing to the same database
- Stale database records from migrations or manual edits
- Unique provider identifiers (providerId + accountId) already mapped to another user

## 対処法

**User-Level Resolutions:**
- Log in as the user who currently has the provider linked and unlink it, then link to the intended account
- Merge accounts if both belong to the same person: transfer sessions and linked accounts from secondary to primary user, then deactivate the secondary

**Developer Patterns:**
- Avoid automatically linking providers to the current user without explicit confirmation
- Clearly communicate which user will receive a link in your UI
- Consider disabling linking for sign-in-only providers to prevent accidental cross-linking

**Debugging Steps:**
1. Inspect your `account` database table for rows with `providerId` (e.g., 'google') and `accountId`
2. Identify which user currently owns the provider link
3. Verify your app connects to the correct database and environment
4. Request stable provider identifiers (e.g., OIDC `openid` scope) so `accountId` remains consistent
5. Confirm you're using correct provider credentials for your environment

This safeguard prevents OAuth identities from being reassigned without explicit user action.
