---
source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md#impersonated-credentials-client
---

# Impersonated credentials (Impersonated)

`Impersonated` lets local credentials act as another service account through the IAM Credentials API, producing short-lived credentials. It is instantiated with a `sourceClient` whose credentials have the "Service Account Token Creator" role (`roles/iam.serviceAccountTokenCreator`) on the target and are authenticated with the `https://www.googleapis.com/auth/cloud-platform` or `https://www.googleapis.com/auth/iam` scope.

## Signature / Usage

Adapted (not in the official docs): the README decoded the secret payload into a `responsePayload` string; the example now records only the payload length so the secret value is never decoded into a printable variable. The service account and project IDs are placeholders; declared `anotherProjectID` as a placeholder constant (the README never defines it) and handled the rejection of `main()`.

```js
const { GoogleAuth, Impersonated } = require('google-auth-library');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

async function main() {
  const anotherProjectID = 'another-project-id';

  // Acquire source credentials:
  const auth = new GoogleAuth();
  const client = await auth.getClient();

  // Impersonate new credentials:
  let targetClient = new Impersonated({
    sourceClient: client,
    targetPrincipal: 'impersonated-account@projectID.iam.gserviceaccount.com',
    lifetime: 30,
    delegates: [],
    targetScopes: ['https://www.googleapis.com/auth/cloud-platform']
  });

  // Get impersonated credentials:
  const authHeaders = await targetClient.getRequestHeaders();
  // Do something with `authHeaders.get('authorization')`.

  // Use impersonated credentials:
  const url = 'https://www.googleapis.com/storage/v1/b?project=anotherProjectID'
  const resp = await targetClient.fetch(url);
  for (const bucket of resp.data.items) {
    console.log(bucket.name);
  }

  // Use impersonated credentials with google-cloud client library
  // Note: this works only with certain cloud client libraries utilizing gRPC
  //    e.g., SecretManager, KMS, AIPlatform
  // will not currently work with libraries using REST, e.g., Storage, Compute
  const smClient = new SecretManagerServiceClient({
    projectId: anotherProjectID,
    auth: {
      getClient: () => targetClient,
    },
  });
  const secretName = 'projects/anotherProjectNumber/secrets/someProjectName/versions/1';
  const [accessResponse] = await smClient.accessSecretVersion({
    name: secretName,
  });

  const payloadLength = accessResponse.payload.data.length;
  // Use the secret payload without printing or logging it.
};

main().catch(console.error);
```

## Options / Props

`ImpersonatedOptions` (extends `OAuth2ClientOptions`):

| Name | Type | Description |
|------|------|-------------|
| `sourceClient` | `AuthClient` | Client used to perform the exchange for the impersonated client. |
| `targetPrincipal` | `string` | The service account to impersonate. |
| `targetScopes` | `string[]` | Scopes to request during the authorization grant. |
| `delegates` | `string[]` | Chained list of delegates required to grant the final access token. Each identity must have Token Creator on the next; if unset, the source credential needs it on `targetPrincipal`. |
| `lifetime` | `number` | Seconds the delegated credential is valid: up to 3600 by default, or 43,200 by extending the token lifetime. |
| `endpoint` | `string` | API endpoint override. |

Methods: `getRequestHeaders()`, `fetch()`, `sign(blobToSign)` (returns `SignBlobResponse` with `keyId` and `signedBlob`), `getTargetPrincipal()`, `fetchIdToken(targetAudience, options?)`.

## Notes

- Applies to google-auth-library 11.3.4 (npm), `node>=22`. `Impersonated` and `ImpersonatedOptions` are exported from the package index.
- The source project must enable the IAM Credentials API ("IAMCredentials"), and the target service account must grant the originating principal the "Service Account Token Creator" role (`impersonated.d.ts` JSDoc).
- Passing an `Impersonated` client via `auth: { getClient: () => targetClient }` works only with Cloud client libraries that use gRPC (for example Secret Manager, KMS, AI Platform), not with REST-based libraries such as Storage or Compute (README).
- Security: the constructor does not validate the credential configuration. If the configuration comes from an untrusted source, validate it before use (see `jwt-service-account.md`).
- Adapted from the official docs: original lines `const responsePayload = accessResponse.payload.data.toString('utf8');` and `` // Do something with the secret contained in `responsePayload`. ``, plus `projectId: anotherProjectID,` (undeclared in the README) and `main();` (no rejection handler). Never print or log secret payloads, and never log `authHeaders` (they contain the bearer token).
- `lifetime: 30` is verbatim from the README (the property is described as seconds).
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md (retrieved 2026-11-16; pinned at tag google-auth-library-v11.3.4, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/impersonated.ts (pinned at tag google-auth-library-v11.3.4)

## Related

- [adc-googleauth.md](./adc-googleauth.md)
- [downscoped-credentials.md](./downscoped-credentials.md)
- [id-tokens.md](./id-tokens.md)
