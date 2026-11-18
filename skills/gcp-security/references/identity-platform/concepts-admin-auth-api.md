---
source: https://docs.cloud.google.com/identity-platform/docs/concepts-admin-auth-api
---

# Introduction to the Admin Auth API

The Firebase Admin SDK integrates your own servers with Identity Platform to manage users and authentication tokens: user management, custom authentication, identity verification and custom user claims.

## Signature / Usage

### Initialize the Admin SDK with default credentials

```javascript
// Initialize the default app
var admin = require('firebase-admin');
var app = admin.initializeApp({
  credential: admin.credential.applicationDefault()
});
```

## Options / Props

| Capability | What it does |
|---|---|
| User management | Programmatically retrieve, create, update and delete users without a user's existing credentials and without client-side rate limiting. Can do what the Google Cloud console cannot: retrieve a user's full data and change a user's password, email address or phone number. |
| Custom token creation | Server creates a custom token with a unique identifier (`uid`) and optional arbitrary claims and passes it to a client app to sign in. Typical use is an external or legacy authentication mechanism (an LDAP server, or a third-party OAuth provider Identity Platform does not support natively, such as Instagram or LinkedIn). Built-in Admin SDK method, or any JWT library. |
| ID token verification | Client sends its ID token to your server, which verifies it and extracts the claims that identify the user (including `uid` and the identity provider). ID tokens conform to the OpenID Connect spec. Built-in Admin SDK method, or any JWT library. |
| Custom user claims | Custom attributes on user accounts (roles), enforced in an application's security rules. Claims reach the client through ID tokens. |

## Notes

- All authenticated access must validate the ID token before processing the associated request; the ID token is the trusted mechanism for delivering custom claims, which propagate to clients after they are modified via the Admin SDK.
- Code samples for custom tokens, ID token verification and custom claims are on firebase.google.com (linked from the source).
- Source: https://docs.cloud.google.com/identity-platform/docs/concepts-admin-auth-api (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/identity-platform/docs/install-admin-sdk (retrieved 2026-11-18).

## Related

- [install-admin-sdk.md](./install-admin-sdk.md)
- [concepts-manage-users.md](./concepts-manage-users.md)
