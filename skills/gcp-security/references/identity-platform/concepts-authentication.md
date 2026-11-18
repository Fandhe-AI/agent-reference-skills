---
source: https://docs.cloud.google.com/identity-platform/docs/concepts-authentication
---

# Authentication

Identity Platform lets users authenticate to apps and services (multi-tenant SaaS apps, mobile/web apps, games, APIs). It provides backend services plus SDKs and ready-made UI libraries, and supports passwords, phone numbers, federated identity providers such as Google, Facebook and Twitter, and any provider that supports SAML or OpenID Connect. It uses OAuth 2.0 and OpenID Connect, so it integrates with a custom backend.

## Signature / Usage

### How a sign-in works

Credentials (email and password, a SAML assertion, or an OAuth token from a federated identity provider) are obtained from the user. Federated providers return their tokens to Identity Platform's authentication handler on the `/__/auth/handler` endpoint, which is hosted by Google. The backend verifies the tokens and returns a response to the client. After sign-in you can read the user's basic profile, control access to data in Google Cloud or other products, and use the authentication token to verify the user's identity in your own backend services.

### Initialize the client SDK

```javascript
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN"
};

const app = initializeApp(firebaseConfig);
```

## Options / Props

### Key capabilities (client SDK)

| Sign-in method | Description | SDK platforms linked in the source |
|---|---|---|
| Email and password | Authenticate with email addresses and passwords; the SDK creates and manages users. Identity Platform also sends password reset emails. | iOS, Android, Web, C++, Unity |
| Federated identity provider | Sign in with Google, Facebook, Twitter and GitHub accounts. | iOS, Android, Web, C++, Unity |
| Phone number | Authenticate by sending SMS messages to users' phones. | iOS, Android, Web, C++, Unity |
| Custom auth system | Exchange tokens generated on your server for Identity Platform tokens usable in Google Cloud, Firebase or other services. | iOS, Android, Web, C++, Unity |
| Anonymous | Temporary anonymous accounts that can later be upgraded to regular accounts. | iOS, Android, Web, C++, Unity |

### Implementation paths

| Path | Steps |
|---|---|
| Using the SDK | Set up sign-in methods (enable them in the Google Cloud console and complete the provider's configuration, such as the OAuth redirect URL); implement the UI flows for each method; pass the user's email and password or the provider's OAuth token to the SDK. |
| Using open source UI components (FirebaseUI) | Set up sign-in methods; customize the sign-in UI with FirebaseUI options (or fork the code on GitHub); import FirebaseUI, specify the methods and start its sign-in flow. |

## Notes

- Important (from the source): when an interaction with Firebase services such as Firestore is initiated by a trusted service or backend, use the Firebase Admin SDKs to avoid the stricter end-user-facing limits that apply to non-admin actions.
- Google Cloud Identity Platform — not Supabase Auth (`supabase`) or Better Auth (`better-auth`).
- Platform-specific sign-in guides are linked from firebase.google.com; the OIDC and SAML web guides are on docs.cloud.google.com.
- Snippet taken from https://docs.cloud.google.com/identity-platform/docs/sign-in-user-email (retrieved 2026-11-18). `API_KEY` and `AUTH_DOMAIN` are placeholders.
- Corrected from the official docs: the source writes the authentication handler endpoint as `/__auth/handler`; the handler path is `/__/auth/handler`, as in the callback URL `https://[PROJECT-ID].firebaseapp.com/__/auth/handler` on https://docs.cloud.google.com/identity-platform/docs/web/oidc (see the `oidc` page).
- Source: https://docs.cloud.google.com/identity-platform/docs/concepts-authentication (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-manage-users.md](./concepts-manage-users.md)
- [sign-in-user-email.md](./sign-in-user-email.md)
- [oidc.md](./oidc.md)
- [product-comparison.md](./product-comparison.md)
