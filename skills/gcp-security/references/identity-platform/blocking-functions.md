---
source: https://docs.cloud.google.com/identity-platform/docs/blocking-functions
---

# Customize the authentication flow using blocking functions

Blocking Cloud Run functions run custom code that modifies the result of a user registering or signing in: reject a user who does not meet criteria, or update user information before it is returned to the client. Blocking functions are available only with Identity Platform; Firebase Authentication projects need to upgrade to Firebase Authentication with Identity Platform.

## Signature / Usage

### Register handlers (Node.js)

Create the function in the console (Identity Platform **Settings** page, **Triggers** tab, **Create Function** under **Before create (beforeCreate)** or **Before sign in (beforeSignIn)**), pick a region, runtime and entry point, then use one of the following in `index.js`. Click **Deploy function**, select the OAuth token credentials to pass to the function and click **Save** on the Settings page.

Adapted (not in the official docs): the module is loaded with `require()` because the file uses CommonJS `exports` (the source mixes an ES module `import` with `exports`).

```javascript
const gcipCloudFunctions = require('gcip-cloud-functions');

const authClient = new gcipCloudFunctions.Auth();

exports.beforeCreate = authClient.functions().beforeCreateHandler((user, context) => {
});
```

Adapted (not in the official docs): the module is loaded with `require()` because the file uses CommonJS `exports` (the source mixes an ES module `import` with `exports`).

```javascript
const gcipCloudFunctions = require('gcip-cloud-functions');

const authClient = new gcipCloudFunctions.Auth();

exports.beforeSignIn = authClient.functions().beforeSignInHandler((user, context) => {

});
```

Add `"gcip-cloud-functions": "^0.2.0"` to the `dependencies` block of `package.json` (check npm for the latest version).

### Block registration or sign-in

```javascript
throw new gcipCloudFunctions.https.HttpsError('permission-denied');
```

```javascript
throw new gcipCloudFunctions.https.HttpsError('permission-denied', 'Unauthorized request origin!');
```

### Allow registration only from a specific domain

Adapted (not in the official docs): the original used `user.email.indexOf('@example.com') === -1`, which also accepts addresses such as `user@example.com.evil.net`; changed to an exact `endsWith` check.

```javascript
exports.beforeCreate = authClient.functions().beforeCreateHandler((user, context) => {
  if (!user.email || !user.email.endsWith('@example.com')) {
    throw new gcipCloudFunctions.https.HttpsError(
      'invalid-argument', `Unauthorized email "${user.email}"`);
  }
});
```

### Block users with unverified emails from registering

```javascript
exports.beforeCreate = authClient.functions().beforeCreateHandler((user, context) => {
  if (user.email && !user.emailVerified) {
    throw new gcipCloudFunctions.https.HttpsError(
      'invalid-argument', `Unverified email "${user.email}"`);
  }
});
```

### Modify a user

```javascript
exports.beforeCreate = authClient.functions().beforeCreateHandler((user, context) => {
  return {
    // If no display name is provided, set it to "guest".
    displayName: user.displayName || 'guest'
  };
});
```

### Block sign-in from certain IP addresses

```javascript
exports.beforeSignIn = authClient.functions().beforeSignInHandler((user, context) => {
  if (isSuspiciousIpAddress(context.ipAddress)) {
    throw new gcipCloudFunctions.https.HttpsError(
      'permission-denied', 'Unauthorized access!');
  }
});
```

### Set custom and session claims

Adapted (not in the official docs): `sessionClaims` are returned from `beforeSignInHandler`, separate from the persistent `customClaims` set in `beforeCreateHandler`.

```javascript
exports.beforeCreate = authClient.functions().beforeCreateHandler((user, context) => {
  if (context.credential &&
      context.credential.providerId === 'saml.my-provider-id') {
    return {
      // Employee ID does not change so save in persistent claims (stored in
      // Auth DB).
      customClaims: {
        eid: context.credential.claims.employeeid,
      },
    }
  }
});

exports.beforeSignIn = authClient.functions().beforeSignInHandler((user, context) => {
  if (context.credential &&
      context.credential.providerId === 'saml.my-provider-id') {
    return {
      // Copy role and groups to token claims. These will not be persisted.
      sessionClaims: {
        role: context.credential.claims.role,
        groups: context.credential.claims.groups,
      }
    }
  }
});
```

### Track the sign-in IP address in a session claim

```javascript
exports.beforeSignIn = authClient.functions().beforeSignInHandler((user, context) => {
  return {
    sessionClaims: {
      signInIpAddress: context.ipAddress,
    },
  };
});
```

## Options / Props

### Events

| Event | When it triggers |
|---|---|
| `beforeCreate` | Before a new user is saved to the Identity Platform database and before a token is returned to the client. |
| `beforeSignIn` | After the user's credentials are verified, before the ID token is returned. With multi-factor authentication, after the second factor is verified. Creating a new user triggers `beforeSignIn` as well as `beforeCreate`. |

### `EventContext` properties

| Name | Description | Example |
|---|---|---|
| `locale` | Application locale (set with the client SDK, or the locale header in the REST API). | `fr` or `sv-SE` |
| `ipAddress` | IP address of the device the user is registering or signing in from. | `114.14.200.1` |
| `userAgent` | The user agent triggering the function. | `Mozilla/5.0 (X11; Linux x86_64)` |
| `eventId` | The event's unique identifier. | `rWsyPtolplG2TBFoOkkgyg` |
| `eventType` | Event name and the sign-in method used. | `providers/cloud.auth/eventTypes/user.beforeSignIn:password` |
| `authType` | Always `USER`. | `USER` |
| `resource` | The Identity Platform project or tenant. | `projects/project-id/tenants/tenant-id` |
| `timestamp` | Trigger time as an RFC 3339 string. | `Tue, 23 Jul 2019 21:10:57 GMT` |
| `additionalUserInfo` | Information about the user (`AdditionalUserInfo`). | |
| `credential` | Information about the user's credential (`AuthCredential`). | |

### `HttpsError` codes

| Name | Code | Message |
|---|---|---|
| `invalid-argument` | `400` | Client specified an invalid argument. |
| `failed-precondition` | `400` | Request can not be executed in the current system state. |
| `out-of-range` | `400` | Client specified an invalid range. |
| `unauthenticated` | `401` | Missing, invalid, or expired OAuth token. |
| `permission-denied` | `403` | Client does not have sufficient permission. |
| `not-found` | `404` | Specified resource is not found. |
| `aborted` | `409` | Concurrency conflict, such as a read-modify-write conflict. |
| `already-exists` | `409` | The resource that a client tried to create already exists. |
| `resource-exhausted` | `429` | Either out of resource quota or reaching rate limiting. |
| `cancelled` | `499` | Request cancelled by the client. |
| `data-loss` | `500` | Unrecoverable data loss or data corruption. |
| `unknown` | `500` | Unknown server error. |
| `internal` | `500` | Internal server error. |
| `not-implemented` | `501` | API method not implemented by the server. |
| `unavailable` | `503` | Service unavailable. |
| `deadline-exceeded` | `504` | Request deadline exceeded. |

### Supported OAuth credentials and data

| Identity Provider | ID Token | Access Token | Expiration Time | Token Secret | Refresh Token | Sign-in Claims |
|---|---|---|---|---|---|---|
| Google | Yes | Yes | Yes | No | Yes | No |
| Facebook | No | Yes | Yes | No | No | No |
| Twitter | No | Yes | No | Yes | No | No |
| GitHub | No | Yes | No | No | No | No |
| Microsoft | Yes | Yes | Yes | No | Yes | No |
| LinkedIn | No | Yes | Yes | No | No | No |
| Yahoo | Yes | Yes | Yes | No | Yes | No |
| Apple | Yes | Yes | Yes | No | Yes | No |
| SAML | No | No | No | No | No | Yes |
| OIDC | Yes | Yes | Yes | No | Yes | Yes |

### Refresh token conditions

| Provider | Condition |
|---|---|
| All (console) | Select the checkbox in the **Triggers** section of the **Include token credentials** drop-down menu. Refresh tokens are not returned when signing in directly with an OAuth credential (ID or access token); for 3-legged flows one may be available if the provider supports it. |
| Generic OIDC | ID token with the `id_token` flow; access token with the code flow (code flow only supported with the REST API); refresh token if the `offline_access` scope is selected. |
| Google | ID token, access token; refresh token only with custom parameters `access_type=offline` and `prompt=consent` (if the user previously consented and no new scope was requested). |
| Microsoft | ID token, access token; refresh token if the `offline_access` scope is selected. |
| Facebook | Access token only (exchangeable for another access token). |
| GitHub | Access token only; does not expire unless revoked. |
| LinkedIn | Access token only. |
| Yahoo, Apple | ID token, access token and refresh token without custom parameters or scopes. |

## Notes

- `EventContext` properties: The `User` object properties are those of the Admin SDK `UserRecord`.
- Fields a handler can modify: `displayName`, `disabled`, `emailVerified`, `photoURL`, `customClaims`, `sessionClaims` (`beforeSignIn` only). All fields except `sessionClaims` are saved to the Identity Platform database, appear in the response token and persist between sessions.
- Your function must respond within seven seconds; after that Identity Platform returns an error and the client operation fails. HTTP response codes other than `200` are passed to client apps.
- Warning from the source: if you delete the Cloud Run functions, you must also unregister the trigger with Identity Platform, otherwise all users are prevented from authenticating with your app. Try trigger changes on a disposable project first.
- Functions apply to all users in the project, including users in a tenant; Identity Platform passes the tenant information to the function. Linking another identity provider to an account re-triggers registered `beforeSignIn` functions (not for email and password). Anonymous and custom authentication do not support blocking functions. An asynchronous function's user object does not contain updates from a blocking function.
- Whatever error you throw, Cloud Run functions wraps it and returns it to the client as an internal error (`BLOCKING_FUNCTION_ERROR_RESPONSE : HTTP Cloud Function returned an error. Code: 400, Status: "INVALID_ARGUMENT", ...`); the app must catch and handle it.
- `beforeSignIn` runs after `beforeCreate` and sees the fields it updated. If both set the same field other than `sessionClaims`, the `beforeSignIn` value wins. `sessionClaims` go to the current session's token claims only (not persisted); on a key clash with `customClaims` the session value overrides the token claim while the `customClaims` value stays in the database.
- If you change a function, deploy it again. The source says you can also manage functions with the Google Cloud CLI or the REST API (see the Cloud Run functions documentation).
- `isSuspiciousIpAddress` in the IP example is a helper you must write. Session-claim IP tracking can detect token theft by comparing the sign-in IP with the IP of later requests; the source's server-side comparison sample is omitted because it has a syntax error and an inverted condition.
- Corrected from the official docs: the source's domain samples used `user.email.indexOf('@example.com') === -1` and `user.email.endsWith('@acme.com')`; the first matched the domain anywhere in the address and the second threw on users without an email, so the fence above uses `!user.email || !user.email.endsWith('@example.com')`.
- Also omitted: the console click-path, the require-email-verification sample (uses undefined helpers), the photo-screening sample (missing closing brace), the Google Calendar refresh-token sample (stores a refresh token and references `oauth2client` instead of `oAuth2Client`), and the client-side `firebase.auth()` error-handling sample. If you store provider refresh tokens, keep them in a secret store and never log them.
- Adapted from the official docs: the source's `index.js` combines `import * as gcipCloudFunctions from 'gcip-cloud-functions'` with `exports.beforeCreate = ...`, which fails both as CommonJS (the `import`) and as an ES module (`exports` is undefined); the samples use `const gcipCloudFunctions = require('gcip-cloud-functions');` and keep `exports`, so no `"type": "module"` is needed in `package.json`.
- Corrected from the official docs: the source returns `sessionClaims` (`role`, `groups`) from `beforeCreateHandler`, but `sessionClaims` are supported only in `beforeSignIn` (see the modifiable fields above); the sample sets them in a `beforeSignInHandler`.
- Omitted: the source's "treat certain identity provider emails as verified" sample sets `emailVerified: true` for every unverified email from Facebook sign-in. Facebook is an untrusted provider for email ownership (see the `concepts-manage-users` page), so the sample would let a user claim someone else's address without proving ownership; it is not reproduced. Mark an email as verified only after an ownership check such as an email verification link.
- Source: https://docs.cloud.google.com/identity-platform/docs/blocking-functions (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [multi-tenancy.md](./multi-tenancy.md)
- [product-comparison.md](./product-comparison.md)
- [oidc.md](./oidc.md)
