---
source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md#working-with-id-tokens
---

# ID tokens (fetch and verify)

To call applications on Cloud Run, Cloud Functions or behind Identity-Aware Proxy (IAP) you need an ID token. Use `GoogleAuth#getIdTokenClient(targetAudience)`, which returns an `IdTokenClient` that attaches an ID token to each request. The library can also verify IAP signed headers.

## Signature / Usage

### Call a protected Cloud Run service

The service account needs the `Cloud Run Invoker` IAM permission; for Cloud Functions it needs `Function Invoker`.

```js
// Make a request to a protected Cloud Run service.
const {GoogleAuth} = require('google-auth-library');

const url = 'https://cloud-run-1234-uc.a.run.app';
const auth = new GoogleAuth();
const client = await auth.getIdTokenClient(url);
const res = await client.fetch(url);
console.log(res.data);
```

### Call an IAP-protected resource

Pass the Client ID used when you set up the protected resource as the target audience.

```js
// Make a request to a protected Cloud Identity-Aware Proxy (IAP) resource
const {GoogleAuth} = require('google-auth-library');

const targetAudience = 'iap-client-id';
const url = 'https://iap-url.com';
const auth = new GoogleAuth();
const client = await auth.getIdTokenClient(targetAudience);
const res = await client.fetch(url);
console.log(res.data);
```

### Verify an IAP ID token

For apps secured with IAP signed headers. `OAuth2Client` throws an `Error` if verification fails. `idToken` is the value of the IAP signed header.

Adapted (not in the official docs): replaced the non-existent `getIapCerts()` with `getIapPublicKeys()` (`oauth2client.d.ts` in 11.3.4), made the expected audience a required value checked before verification, and printed only the verified user ID instead of the whole ticket.

```js
const {OAuth2Client} = require('google-auth-library');
// Expected audience for App Engine.
const expectedAudience = `/projects/your-project-number/apps/your-project-id`;
if (!expectedAudience) {
  throw new Error('expectedAudience is required');
}
// IAP issuer
const issuers = ['https://cloud.google.com/iap'];
// Verify the token. OAuth2Client throws an Error if verification fails
const oAuth2Client = new OAuth2Client();
const response = await oAuth2Client.getIapPublicKeys();
const ticket = await oAuth2Client.verifySignedJwtWithCertsAsync(
  idToken,
  response.pubkeys,
  expectedAudience,
  issuers
);

// Print only the user ID from the verified IAP ID token
console.log(ticket.getUserId());
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `getIdTokenClient(targetAudience)` | `(string) => Promise<IdTokenClient>` | Audience for the ID token: the service URL for Cloud Run / Cloud Functions, the OAuth Client ID for IAP. |
| `Impersonated#fetchIdToken(targetAudience, options?)` | `(string, FetchIdTokenOptions?) => Promise<string>` | ID token for the impersonated service account. `FetchIdTokenOptions.includeEmail` (`boolean`, required in that interface) adds the `email` and `email_verified` claims. |
| `OAuth2Client#getIapPublicKeys()` | `() => Promise<IapPublicKeysResponse>` | Resolves to `IapPublicKeysResponse` (`pubkeys: PublicKeys`); the IAP example passes `pubkeys` as `certs` to `verifySignedJwtWithCertsAsync`. `getIapPublicKeysAsync()` and a callback overload are also declared. |
| `OAuth2Client#verifySignedJwtWithCertsAsync(jwt, certs, requiredAudience?, issuers?, maxExpiry?)` | method, `Promise<LoginTicket>` | Verifies a signed JWT against `certs` (`Certificates \| PublicKeys`), for IAP the public keys from `getIapPublicKeys()`. `requiredAudience` (`string \| string[]`, "the audience to test the jwt against"), `issuers` ("the allowed issuers") and `maxExpiry` are optional in the signature; always pass the expected audience and the IAP issuer. |
| `LoginTicket#getUserId()` | `() => string \| null` | User ID from the verified token. `getPayload()` returns the decoded `TokenPayload` claims. |

## Notes

- Applies to google-auth-library 11.3.4 (npm), `node>=22`. `IdTokenClient` and `IdTokenProvider` are exported from the package index.
- ID tokens are credentials: do not print or log the token returned by `fetchIdToken` or put it in logs. The README examples print the response body (`res.data`) or the verification result; a `LoginTicket` holds only the JWT envelope and the decoded claims (`loginticket.d.ts`), but the claims include PII such as `email`, so print only what you need.
- Corrected from the official docs: original lines `const response = await oAuth2Client.getIapCerts();` (no such method in 11.3.4; `oauth2client.d.ts` declares `getIapPublicKeys()`) and `console.log(ticket)`. The `if (!expectedAudience)` check is also not in the README.
- Fragments: all three blocks use top-level `await`; the verification block uses an undefined `idToken`.
- The upstream sample links in the README (`idtokens-serverless.js`, `idtokens-iap.js`, `verifyIdToken-iap.js`) point to unpinned `main` and are not reproduced.
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md (retrieved 2026-11-16; pinned at tag google-auth-library-v11.3.4, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/impersonated.ts (pinned at tag google-auth-library-v11.3.4)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/oauth2client.ts (pinned at tag google-auth-library-v11.3.4)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/loginticket.ts (pinned at tag google-auth-library-v11.3.4)

## Related

- [adc-googleauth.md](./adc-googleauth.md)
- [impersonated-credentials.md](./impersonated-credentials.md)
- [compute.md](./compute.md)
