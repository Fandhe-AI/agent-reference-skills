---
source: https://docs.cloud.google.com/identity-platform/docs/concepts-manage-users
---

# Identity Platform users in projects

The Identity Platform user object represents a user account that signed up for an app in your Google Cloud project. Every app in a project shares one user database. This page covers user properties, sign-in providers, the current user and its lifecycle, self-service sign-up, token types, and when an email is treated as verified.

## Signature / Usage

### Track the current user with an Auth listener

Adapted (not in the official docs): messages are written with `textContent` instead of `innerHTML`, so the email address and error text are not parsed as HTML.

```javascript
import { initializeApp } from 'firebase/app';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  getAuth
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {/* extra options */ });

document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
      if (user) {
          document.getElementById("message").textContent = "Welcome, " + user.email;
      }
      else {
          document.getElementById("message").textContent = "No user signed in.";
      }
  });
  signIn();
});

function signIn() {
  const email = "EMAIL_ID";
  const password = "PASSWORD";
  signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
          document.getElementById("message").textContent = error.message;
      });
}
```

## Options / Props

### User properties and population

| Item | Behavior |
|---|---|
| Fixed properties | Unique ID, primary email address, name and photo URL, stored in the project's user database and updatable by the user. Other properties cannot be added to the user object; store them elsewhere, for example Firestore. |
| Email and password sign-up | Only the primary email address is populated. |
| Federated provider sign-up | The account information the provider makes available populates the profile. |
| Custom auth system | You must explicitly add the information you want to the profile. |

### Auth listener notifications

| Event | Notes |
|---|---|
| Auth object finishes initializing | A user was already signed in from a previous session, or returned from an identity provider's sign-in flow. |
| User signs in | The current user is set. |
| User signs out | The current user becomes null. |
| Access token refreshed | `onAuthStateChanged` is not called for a token refresh alone; to observe refreshes (for example to pick up new custom claims), use `onIdTokenChanged`, which covers sign-in, sign-out and token refresh. A refresh happens when the access token expires (the refresh token gets a new set), when the user changes their password (new access and refresh tokens; old tokens expire, which signs the user out on every device), or when the user re-authenticates (needed for deleting an account, setting a primary email address and changing a password). |

### Auth token types

| Token | Description |
|---|---|
| Identity Platform ID tokens | Signed JWTs created when a user signs in; identify a user in a Google Cloud project and include the user's project-unique ID string. Their integrity can be verified, so they can be sent to a backend server. |
| Identity provider tokens | Created by federated providers such as Google and Facebook, often OAuth 2.0 access tokens; apps convert them into credentials usable by Identity Platform. |
| Identity Platform custom tokens | Created by your custom auth system; JWTs signed using a service account's private key. |

### Email verification trust

| Trusted | Untrusted |
|---|---|
| Google (for @gmail.com addresses) | Facebook |
| Yahoo (for @yahoo.com addresses) | Twitter |
| Microsoft (for @outlook.com and @hotmail.com addresses) | GitHub |
| Apple (always verified) | Google, Yahoo, Microsoft for domains not issued by that provider |
| | Email / Password without email verification |

### Automatic account linking

| First sign-in | Second sign-in, same email | Result |
|---|---|---|
| Untrusted provider | Another untrusted provider (Facebook, then GitHub) | Error requiring account linking. |
| Trusted provider | Untrusted provider (Google, then Facebook) | Error requiring account linking. |
| Untrusted provider | Trusted provider (Facebook, then Google) | The trusted provider overwrites the untrusted one; signing in again with Facebook then errors and requires account linking. |
| Trusted provider | Different trusted provider (Apple, then Google) | Both providers are linked without errors. |

## Notes

- Email verification trust: An email is verified when the user completes the Identity Platform verification flow and the email is verified by a trusted identity provider. Providers that verify once but allow changing the address without re-verification are not trusted.
- User self-service: by default users can sign up and delete their accounts without administrative intervention. To restrict this to administrators (Admin SDK or Google Cloud console), disable user actions on the Identity Platform settings page. With multi-tenancy, an HTTP request to the tenants `patch` method disables these per tenant. A blocked attempt returns `auth/admin-restricted-operation` (Web API) or `ERROR_ADMIN_RESTRICTED_OPERATION` (Android and iOS); handle it in the front end.
- Automatic linking is restricted because, for example, a malicious actor could create a Facebook account with a victim's @gmail.com address and take over the victim's Google account if the two were linked.
- You can set an email as verified with the Admin SDK; the source recommends doing so only if you know the user owns the email.
- Source also covers: providers linked to a user, an Auth instance's persisted state across restarts, and per-platform Manage Users guides on firebase.google.com.
- Adapted from the official docs: the source writes `user.email` and `error.message` into the page with `innerHTML`, which parses them as HTML (a DOM XSS path if a value contains markup); the sample uses `textContent`.
- The source lists token refresh among the auth listener events, but the sample's `onAuthStateChanged` "Adds an observer for changes to the user's sign-in state", while `onIdTokenChanged` "Adds an observer for changes to the signed-in user's ID token. This includes sign-in, sign-out, and token refresh events." (https://firebase.google.com/docs/reference/js/auth.auth, retrieved 2026-11-18).
- Source: https://docs.cloud.google.com/identity-platform/docs/concepts-manage-users (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/identity-platform/docs/sign-in-user-email (retrieved 2026-11-18). The `EMAIL_ID` and `PASSWORD` values are placeholders; do not hard-code real credentials.

## Related

- [concepts-authentication.md](./concepts-authentication.md)
- [concepts-admin-auth-api.md](./concepts-admin-auth-api.md)
- [multi-tenancy.md](./multi-tenancy.md)
