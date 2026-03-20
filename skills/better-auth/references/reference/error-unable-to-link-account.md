# unable_to_link_account

## 説明

This error occurs specifically during OAuth flows when Better Auth cannot link a provider account to the currently authenticated user.

## 原因

1. **Provider not trusted** - The OAuth provider isn't listed in your `account.accountLinking.trustedProviders` configuration
2. **Environment mismatch** - Different auth configurations across dev/staging/prod environments causing a provider to appear untrusted in one environment
3. **Database failures** - Write operations fail due to:
   - Unique constraint violations
   - Foreign key violations
   - Transaction or connection issues
4. **Race conditions** - Concurrent attempts to link the same provider create conflicts
5. **Schema mismatches** - Pending migrations or schema differences between services prevent successful writes

## 対処法

**Allow the provider for linking:**
- Add the provider ID (e.g., `github`, `google`) to `account.accountLinking.trustedProviders` in your auth configuration
- Verify you're using the correct provider ID/slug your integration expects

**Fix database reliability:**
- Run pending migrations and ensure schema matches your Better Auth version
- Investigate database errors (deadlocks, timeouts, connection pool limits)
- Implement retry logic for transient failures

**Verify configuration:**
- Ensure identical auth configs are deployed across all environments
- Confirm environment variables load as expected
- Validate the runtime sees the intended `trustedProviders` list
