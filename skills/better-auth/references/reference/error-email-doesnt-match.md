# email_does_not_match

## Signature / Usage

```
Error code: email_does_not_match
```

Renamed in 1.7: this callback error was `email_doesn't_match` in 1.6 and earlier (the file name is kept for compatibility).

This error occurs during OAuth account linking when the email returned by the provider does not match the email on the currently authenticated user.

## Notes

- The error is specific to the OAuth account linking flow. It prevents accidental cross-account linking or account takeover by blocking links when emails don't align. It does not occur during normal OAuth sign-in
- Causes:
  - User is logged into the provider with a different email (work vs. personal)
  - Provider returns an unverified or secondary email differing from the app account email
  - Email normalization differences (case sensitivity, Gmail dots/aliases)
  - User's email changed in your app or at the provider since account creation
- Align user identities:
  - Have the user switch to the correct provider account using the same email as their app account
  - Alternatively, update the app account email to the intended email (if your product allows it) and retry linking
- Debug locally:
  - Do not log emails or full provider profiles (PII). Compare the two addresses in a debugger or a local-only check, or log only non-sensitive facts (e.g. whether they differ after lowercasing, or whether the provider marks the email as verified)
  - Check for normalization issues (case, Gmail dots/aliases)
  - Confirm which provider credentials (dev/staging/prod) are in use and verify the returned identity matches expectations
- The error code is `email_does_not_match` in 1.7 (`email_doesn't_match` in 1.6 and earlier); the file name is kept for compatibility (Adapted from the official docs)
- Debug tips no longer suggest logging emails or provider profiles, to avoid logging PII (Adapted from the official docs)

## Related

- [errors](./errors.md)
- [email_not_found](./error-email-not-found.md)
