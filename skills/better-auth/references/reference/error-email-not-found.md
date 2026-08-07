# email_not_found

## Signature / Usage

```
Error code: email_not_found
"The provider did not return an email address."
```

This error occurs during OAuth authentication when Better Auth cannot obtain an email from the OAuth provider.

## Notes

- Causes:
  - Missing or insufficient OAuth scopes (e.g., not requesting `email`)
  - User's email marked as private or unexposed by default (common with GitHub)
  - Provider returns email via separate endpoint requiring additional API calls
  - Provider configuration issues (consent screen, admin consent, restricted claims)
  - Mismatched credentials across environments with different scope settings
- Request correct scopes: ensure your OAuth provider configuration explicitly requests email-related scopes. Verify documentation for each provider's email scope requirements
- Verify provider settings: confirm email permission is enabled, consent screen allows email requests, and the application has proper authorization levels
- Debug locally:
  - Inspect the authorization request URL to verify `email` scope is included
  - Check the callback payload and `id_token` claims for email fields
  - Log the provider profile object in your callback handler
  - Confirm which environment credentials are active
  - Cross-reference scope requirements between environments
- This error only occurs in OAuth flows and will not appear in non-OAuth authentication methods

## Related

- [email_doesn't_match](./error-email-doesnt-match.md)
- [errors](./errors.md)
