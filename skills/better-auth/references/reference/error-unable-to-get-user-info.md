# unable_to_get_user_info

## 説明

This error occurs during the OAuth callback phase at the `/api/auth/callback` endpoint. After successfully exchanging an authorization code for tokens, Better Auth attempts to retrieve the user's profile from the provider. The error is triggered when the provider's response is inadequate or missing critical user information needed to establish an account.

## 原因

1. **Insufficient Scopes**: "Missing or insufficient scopes, so the provider does not return profile data."

2. **Provider Response Issues**: The OAuth provider returned an empty profile object or an error response instead of expected user details.

3. **Token Exchange Problems**: While the authorization code was successfully exchanged for tokens, the subsequent user info request failed due to network errors, authentication failures (401/403), or invalid tokens.

4. **Configuration Mismatches**: Wrong client credentials, misaligned environments (dev/staging/prod), or provider endpoint misconfigurations.

5. **Provider Outages**: Temporary service disruptions or rate limiting from the OAuth provider.

## 対処法

### Request the Right Data

- Initiate OAuth flows using Better Auth's built-in methods to ensure correct scopes and parameters are sent
- Configure your provider application to return essential profile details your app requires

### Verify Configuration and Environment

- Confirm client credentials and callback URLs match your current environment
- Ensure provider response modes and endpoints align with your integration setup
- Check that required fields like `id` and `email` (when needed) are being requested via appropriate scopes
