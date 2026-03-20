# email_doesn't_match

## 説明

This error occurs during OAuth account linking when "the email returned by the provider does not match the email on the currently authenticated user."

## 原因

The error is specific to the OAuth account linking flow. It prevents accidental cross-account linking or account takeover by blocking links when emails don't align. This does not occur during normal OAuth sign-in.

- User is logged into the provider with a different email (work vs. personal)
- Provider returns an unverified or secondary email differing from the app account email
- Email normalization differences (case sensitivity, Gmail dots/aliases)
- User's email changed in your app or at the provider since account creation

## 対処法

**Align User Identities:**
- Have the user switch to the correct provider account using the same email as their app account
- Alternatively, update the app account email to the intended email (if your product allows it) and retry linking

**Debug Locally:**
- Log the current user's email in your app and the email returned by the provider profile
- Inspect whether the provider email is verified/primary and check for normalization issues
- Confirm which provider credentials (dev/staging/prod) are in use and verify the returned identity matches expectations
