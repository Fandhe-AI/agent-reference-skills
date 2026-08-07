# unable_to_get_user_info

## Notes

- Occurs during the OAuth callback phase at `/api/auth/callback`. After exchanging an authorization code for tokens, Better Auth attempts to retrieve the user's profile from the provider; this error is triggered when the response is missing or inadequate for account creation.
- Common causes: insufficient OAuth scopes, so the provider doesn't return profile data; the provider returned an empty profile object or an error response instead of user details; the token exchange succeeded but the subsequent user-info request failed (network errors, 401/403, invalid tokens); wrong client credentials or misaligned dev/staging/prod environments; provider endpoint misconfiguration; temporary provider outages or rate limiting.
- Fix: initiate OAuth flows using Better Auth's built-in methods to ensure correct scopes and parameters are sent; configure the provider application to return the profile details your app requires; confirm client credentials and callback URLs match the current environment; ensure provider response modes and endpoints align with your integration; check that required fields such as `id` and `email` are requested via the appropriate scopes.
