---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/web-sdk-v3-authenticate
---

# CCAI Platform web SDK v3: token endpoint and JWT signing

To authenticate with CCAI Platform, implement a token endpoint on your server that returns a JSON web token (JWT) for the current user. The JWT is signed with `COMPANY_SECRET`, which must never reach client code.

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

## Notes

- The source also shows a Flask (Python) example using `joserfc`; it is left out because it mixes JavaScript syntax into Python (`if (request.user) {`, `payload.identifier = request.user.id,` on a `dict`, a closing `}`), so it does not parse, and it reads `request.user`, which the example does not define. Use the Express example as the pattern. In the Express example, `your_session_middleware` and `req.user` stand for your own session handling.
- Adapted from the official docs: the source writes `const COMPANY_SECRET = '__read_from_config__'` and passes that literal to `jwt.sign`, so a copied server signs tokens with a public placeholder string that does not match the company secret registered in CCAI Platform. The page reads the secret from server configuration (the `COMPANY_SECRET` environment variable, which you can populate from a secret store) and throws at start-up if it is not set.
- Adapted from the official docs: the source states that "Even if the user is an anonymous user and has not yet authenticated, the identifier is required in order for the SDK to work as expected", yet its handler adds `identifier`, `name` and `email` only inside `if (req.user) { ... }` and signs the token either way, so an unauthenticated request gets a token without `identifier`. The page rejects requests without `req.user`, and requests whose session user has no identifier (`typeof req.user.id !== 'string' || req.user.id === ''`, which would otherwise sign a token with a missing or empty `identifier`), with `401`; the `if (req.user)` block is kept as written. To serve anonymous users instead, the server must put an identifier it issues itself (for example one per guest session; the source does not say how to generate it) into `identifier` before signing.
- Corrected from the official docs: the source handler answers with `res.json({ token })` and sets no cache directive, although the `GET /auth/token` response carries a JWT with the session user's `identifier`, `name` and `email`; a cached response could hand one user's token to the next user of the browser or of a shared cache. The page adds `res.set('Cache-Control', 'no-store')` as the first line of the handler, so it applies to the token response and to the `401` response.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/web-sdk-v3-authenticate (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [web-sdk-v3-getting-started.md](./web-sdk-v3-getting-started.md)
- [sdk-end-user-auth.md](./sdk-end-user-auth.md)
