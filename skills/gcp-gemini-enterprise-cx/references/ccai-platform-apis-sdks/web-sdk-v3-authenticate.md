---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/web-sdk-v3-authenticate
---

# CCAI Platform web SDK v3: token endpoint and JWT signing

To authenticate with CCAI Platform, implement a token endpoint on your server that returns a JSON web token (JWT) for the current user. The JWT is signed with `COMPANY_SECRET`, which must never reach client code. This page also covers SDK end user authentication as the CCAI Platform SDK end user authentication page describes it: the JWT handshake, the reserved payload keys, the `UJET.initialize` signing contract, and mid-session reinitialization.

## Signature / Usage

### Get the company secret

Sign in to the CCAI Platform portal with an administrator account, go to **Settings > Developer Settings**, and copy the Company Secret as `COMPANY_SECRET`. Store it securely on your server; without that precaution, malicious entities can act on your behalf.

### Token endpoint response

The endpoint returns a JWT containing the current user's information:

```json
{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.n...."}
```

The token is created with `alg` of `HS256`, a payload that contains user identifier, name and email (the identifier is required even for an anonymous user who has not authenticated), and a signature made with `COMPANY_SECRET`:

```text
header = {"alg": "HS256"}
payload = {
  "iss": "{YOUR_COMPANY_NAME}",
  "iat": $unix_timestamp_now,
  "exp": $unix_timestamp_now + 3600,
  "identifier": "{CURRENT_USER_ID}",
  "name": "{CURRENT_USER_NAME}",
  "email": "{CURRENT_USER_EMAIL}",
}

token = jwt_encode(header, payload, COMPANY_SECRET)
```

### Example (endpoint `/auth/token`)

Express (Node.js):

Adapted (not in the official docs): `COMPANY_SECRET` is read from the `COMPANY_SECRET` environment variable and the server fails at start-up if it is missing (the source assigns the literal `'__read_from_config__'`), and the handler rejects requests without `req.user`, or whose `req.user.id` is not a non-empty string, with `401` (the source issues a token without the required `identifier` for them), and the handler sets `Cache-Control: no-store` (with Express `res.set`) on every response, including the `401`, so a per-user token is not stored by a browser or shared cache and reused after the user changes.

```javascript
const express = require('express')
const jwt = require('jsonwebtoken')

const COMPANY_NAME = 'AMCE'
const COMPANY_SECRET = process.env.COMPANY_SECRET
if (!COMPANY_SECRET) {
  throw new Error('COMPANY_SECRET is not set')
}

const app = express()
app.use(express.json())
app.use(your_session_middleware)

app.get('/auth/token', function (req, res) {
  res.set('Cache-Control', 'no-store')
  if (!req.user || typeof req.user.id !== 'string' || req.user.id === '') {
    return res.status(401).json({ error: 'unauthenticated' })
  }
  const now = parseInt(Date.now() / 1000, 10)
  const payload = {
    'iss': COMPANY_NAME,
    'iat': now,
    'exp': now + 3600,
  }
  if (req.user) {
    payload.identifier = req.user.id,
    payload.name = req.user.name
    payload.email = req.user.email
  }
  const token = jwt.sign(payload, COMPANY_SECRET, { algorithm: 'HS256' })
  res.json({ token })
})
```

### SDK end user authentication: how it works

CCAI Platform uses end user authentication to identify the people using your host app, so that only authorized users access the CCAI Platform API and their chat sessions and data stay tied to their identity. The host app provides a universally unique identifier (UUID) for the person and a JWT signed with the company secret.

1. The request: the CCAI Platform SDK requests a signed JWT from your host app when an end user starts using customer service.
2. The signature: your host app signs the JWT with the shared company secret (`company_secret`).
3. The exchange: the host app passes the signed JWT to the SDK, which sends it to the CCAI Platform server.
4. The verification: the server verifies the signature; if valid it issues an auth token, associating the user with their account (or creating one).

If the JWT payload has no identifier, CCAI Platform creates an anonymous guest account for the user (see Notes for how this differs from the web SDK v3 statement above).

Prerequisites: sign in with an administrator account, go to **Settings > Developer Settings > API Credentials** and locate the SDK key name (`sdk_key_name`), SDK key (`sdk_key`) and company secret (`company_secret`). Keep them secure and share them only with authorized systems and developers.

### SDK end user authentication: JWT payload reserved keys

- `identifier`: optional, but highly recommended UUID
- `name`: optional
- `email`: optional
- `phone`: optional, must use E.164 format
- `iss`: optional, your company name
- `iat`: required, issued at timestamp
- `exp`: required, expiration timestamp

The callback method supplies a default payload (which may include a push token and default name); add user details with these keys.

### SDK end user authentication: server-side signing and the `UJET.initialize` contract

Sign the payload on your server so `company_secret` stays hidden from the client; if it is compromised you can revoke it. In production, make sure the JWT signing algorithm suits your security needs.

The web SDK initialized with `UJET.initialize` calls the `handlers.authentication(callback)` handler you pass to it. As the source describes the contract, the handler sends `POST .../api/ujet/sign` to your signing server with the JSON body `{"payload": {...}}`, your server signs the payload and answers with JSON `{"token": ...}`, and the handler passes the signed token back with `callback({ token: result.token, user: { identifier, name } })`. This is a different contract from the web SDK v3 client (`new UJET({ authenticate: getAuthToken })`), which calls `GET /auth/token` with no body while the server builds the whole payload from its own session; the Express `GET /auth/token` example above does not serve the `UJET.initialize` client, but it shows the pattern for signing with `jsonwebtoken` and an environment-held secret.

Your server sets the time claims itself: the source's server example (left out, see Notes) sets `payload["iat"] = Time.now.to_i` and `payload["exp"] = Time.now.to_i + 10.minutes # Valid for 10 minutes` on the server, and the web SDK v3 Express example above sets `'iat': now` and `'exp': now + 3600`.

Points not stated in the official docs:

- Build the payload to sign on the server: copy from the client's `payload` only the fields you need (for example the push token the SDK supplies) after validating them, and set `identifier`, `name`, `email`, `phone`, `iss`, `iat` and a bounded `exp` from your own session and configuration, overwriting any client-supplied value; never sign an `iat`, `exp` or `identifier` taken from the client, so the expiry and identity the server intends are the ones in the token. The official docs do not say which client-supplied fields are safe to keep.
- Your server should decide the identifier from the authenticated session, sign it into the JWT, and return it together with the token, so that the client passes the same value to the SDK in `user.identifier` instead of a value it chose itself. The official docs define no response field for this.
- If the sign request fails (an HTTP error, a network failure, or a response without a token), your app must handle the failure itself, for example by showing an error and not starting the chat. The official docs define no failure contract for `authentication(callback)`, and the outer `.catch()` of `UJET.initialize` does not receive the request's failure.

### SDK end user authentication: mid-session reinitialization

When a user starts as a guest and verifies identity mid-session (for example through a virtual assistant or a login screen):

1. Initialize the SDK with a temporary (random or guest) identifier.
2. Direct the user to authenticate (a CCAI Platform virtual assistant or your login screen).
3. After authentication, while the user is still in the virtual agent or authentication flow, your backend calls the CCAI Platform Apps API to update the end user's chat session with their true identifier.
4. Generate a new JWT for the authenticated user and reinitialize the SDK by calling the initialization method again.
5. If a virtual assistant was used, it should now escalate the consumer to the final destination queue.

To reinitialize the web SDK, call `UJET.initialize` again after successful authentication and the Apps API update; this triggers the `authentication(callback)` handler to fetch the new token for the newly authenticated user. The handler follows the same contract as above (`POST .../api/ujet/sign` with `{"payload": {...}}`, `{"token": ...}` in the response, `callback({ token, user })`), with the payload built on the server as described above (validated client fields only, and `identifier`, `iat` and a bounded `exp` set by your server, never taken from the client) and the failure handled by your app.

## Options / Props

### SDK end user authentication scenarios

| Scenario | Action required |
|---|---|
| User starts authenticated | Initialize SDK with the user's true UUID and JWT. |
| User starts unauthenticated | Initialize SDK with a guest/random identifier. |
| User authenticates mid-session | Update CCAI Platform with the API, generate a new JWT, and reinitialize the SDK. |

## Notes

- The source also shows a Flask (Python) example using `joserfc`; it is left out because it mixes JavaScript syntax into Python (`if (request.user) {`, `payload.identifier = request.user.id,` on a `dict`, a closing `}`), so it does not parse, and it reads `request.user`, which the example does not define. Use the Express example as the pattern. In the Express example, `your_session_middleware` and `req.user` stand for your own session handling.
- Adapted from the official docs: the source writes `const COMPANY_SECRET = '__read_from_config__'` and passes that literal to `jwt.sign`, so a copied server signs tokens with a public placeholder string that does not match the company secret registered in CCAI Platform. The page reads the secret from server configuration (the `COMPANY_SECRET` environment variable, which you can populate from a secret store) and throws at start-up if it is not set.
- Adapted from the official docs: the source states that "Even if the user is an anonymous user and has not yet authenticated, the identifier is required in order for the SDK to work as expected", yet its handler adds `identifier`, `name` and `email` only inside `if (req.user) { ... }` and signs the token either way, so an unauthenticated request gets a token without `identifier`. The page rejects requests without `req.user`, and requests whose session user has no identifier (`typeof req.user.id !== 'string' || req.user.id === ''`, which would otherwise sign a token with a missing or empty `identifier`), with `401`; the `if (req.user)` block is kept as written. To serve anonymous users instead, the server must put an identifier it issues itself (for example one per guest session; the source does not say how to generate it) into `identifier` before signing.
- Corrected from the official docs: the source handler answers with `res.json({ token })` and sets no cache directive, although the `GET /auth/token` response carries a JWT with the session user's `identifier`, `name` and `email`; a cached response could hand one user's token to the next user of the browser or of a shared cache. The page adds `res.set('Cache-Control', 'no-store')` as the first line of the handler, so it applies to the token response and to the `401` response.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/web-sdk-v3-authenticate (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

### SDK end user authentication

- "Don't use an email address as the identifier." Email addresses can change and might not be unique; use a UUID.
- Reinitializing keeps routing, history and CRM records tied to the authenticated user instead of an anonymous guest session, and prevents data leakage.
- Source inconsistency: the web SDK v3 authentication page says "Even if the user is an anonymous user and has not yet authenticated, the identifier is required in order for the SDK to work as expected", while the SDK end user authentication page lists `identifier` as "optional, but highly recommended UUID" and says that without an identifier in the JWT payload CCAI Platform creates an anonymous guest account. Both are kept as written; the official docs do not reconcile them.
- The SDK end user authentication page's jQuery `$.ajax` examples for initialize / re-initialize (`UJET.initialize` with `handlers.authentication(callback)`) were left out. Both have only `success: function(result) { callback({ token: result.token, user: { ... } }); }` and no error path, so a `401` or a network failure never completes the SDK authentication callback and a response without `token` passes `token: undefined` to the SDK, and the official docs define no failure contract that a fixed example could call. Both choose the identifier in the browser (`identifier: 'UNIQUE-Identifier'` in the payload with `identifier: 'UNIQUE-IDENTIFIER'` in the SDK `user` object, two different strings for one end user; `'AUTHENTICATED-USER-UUID'` in both places in the reinitialization example) instead of taking it from the server's authenticated session. They also post to fixed hosts (`https://company.com/api/ujet/sign`, `https://your.company.com/api/ujet/sign`) and send `data: JSON.stringify({ payload: ... })` without `contentType`, so jQuery sends the body as `application/x-www-form-urlencoded; charset=UTF-8`.
- The SDK end user authentication page's Ruby on Rails signing example (`routes.rb` with `post 'ujet/sign' => "ujet#sign"` and a `UjetController#sign` that calls `JWT.encode(payload, ujet_secret)`) is left out: it reads `payload = body["payload"]`, and `body` is not defined anywhere in the example, so it does not run as written and the correct accessor is not given by the source. It also sets the identifier, name and email to constants and keeps the secret in a string literal (`ujet_secret = "COMPANY_SECRET"`, with the comment "In production, securely store and call your secret (e.g., via environment variables)").
- The SDK end user authentication page also shows iOS (Objective-C) and Android (Java, Retrofit) signing callbacks; they are not reproduced here. Identifiers such as `UJET` appear as written in the source.
- Derive the identifier from your authenticated session on the server (the Express example above uses `req.user`) rather than signing whatever the client sends, and load the company secret from environment variables or a secret store.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/sdk-end-user-auth (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [web-sdk-v3-getting-started.md](./web-sdk-v3-getting-started.md)
- [mobilesdk-overview.md](./mobilesdk-overview.md)
- [chat-platform-api-guide.md](./chat-platform-api-guide.md)
