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

```javascript
const express = require('express')
const jwt = require('jsonwebtoken')

const COMPANY_NAME = 'AMCE'
const COMPANY_SECRET = '__read_from_config__'

const app = express()
app.use(express.json())
app.use(your_session_middleware)

app.get('/auth/token', function (req, res) {
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
- The source states that the identifier is required even for an anonymous user, yet the examples add `identifier`, `name` and `email` only when a user is signed in; the examples are copied as written.
- The example reads `COMPANY_SECRET` from a placeholder (`'__read_from_config__'`); load it from a server-side secret store, not from source code.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/web-sdk-v3-authenticate (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [web-sdk-v3-getting-started.md](./web-sdk-v3-getting-started.md)
- [sdk-end-user-auth.md](./sdk-end-user-auth.md)
