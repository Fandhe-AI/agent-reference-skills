# email_not_found

## 説明

"The provider did not return an email address." This error occurs during OAuth authentication when Better Auth cannot obtain an email from the OAuth provider.

## 原因

- Missing or insufficient OAuth scopes (e.g., not requesting `email`)
- User's email marked as private or unexposed by default (common with GitHub)
- Provider returns email via separate endpoint requiring additional API calls
- Provider configuration issues (consent screen, admin consent, restricted claims)
- Mismatched credentials across environments with different scope settings

## 対処法

### 1. Request Correct Scopes

Ensure your OAuth provider configuration explicitly requests email-related scopes. Verify documentation for each provider's email scope requirements.

### 2. Verify Provider Settings

Check your OAuth application dashboard to confirm:
- Email permission is enabled
- Consent screen allows email requests
- Application has proper authorization levels

### 3. Debug Locally

- Inspect the authorization request URL to verify `email` scope is included
- Check the callback payload and `id_token` claims for email fields
- Log the provider profile object in your callback handler
- Confirm which environment credentials are active
- Cross-reference scope requirements between environments

## 注意

This error only occurs in OAuth flows and will not appear in non-OAuth authentication methods.
