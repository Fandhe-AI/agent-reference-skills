---
source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md#application-default-credentials
---

# Application Default Credentials and GoogleAuth

`GoogleAuth` implements Application Default Credentials (ADC) for Node.js. It picks the right credential type (JWT, OAuth2, Compute, external account, impersonated, ...) for the environment, so code does not construct a specific client. ADC is the recommended way to authorize calls to Cloud APIs when the call has the same identity regardless of the user.

## Signature / Usage

### Get the default credential and call an API

```js
const {GoogleAuth} = require('google-auth-library');

/**
* Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
* this library will automatically choose the right client based on the environment.
*/
const auth = new GoogleAuth({
  scopes: 'https://www.googleapis.com/auth/cloud-platform'
});
const projectId = await auth.getProjectId();
const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
// The modern `fetch` and classic `request` APIs are available
const res = await auth.fetch(url);
console.log(res.data);
```

### Pass an explicit auth object to a client library

Snippet taken from the JSDoc of `GoogleAuthOptions.keyFilename` in `googleauth.d.ts` (the recommended alternative to the deprecated key-file options). `MyClient` is a placeholder for a Cloud client class.

```js
const {GoogleAuth} = require('google-auth-library');
const auth = new GoogleAuth({
  // Scopes can be specified either as an array or as a single, space-delimited string.
  scopes: 'https://www.googleapis.com/auth/cloud-platform'
});
const client = new MyClient({ auth: auth });
```

## Options / Props

`GoogleAuthOptions` (constructor argument of `new GoogleAuth(opts?)`):

| Name | Type | Description |
|------|------|-------------|
| `apiKey` | `string` | An API key to use. Cannot be used with `credentials`. |
| `authClient` | `AuthClient` | An `AuthClient` to use. |
| `clientOptions` | `AuthClientOptions` | Options passed to the constructor of the generated client (for example `apiKey`, `universeDomain`, `quotaProjectId`, `transporterOptions`). |
| `scopes` | `string \| string[]` | Required scopes for the desired API request. |
| `projectId` | `string` | Your project ID. |
| `universeDomain` | `string` | Default service domain for a given Cloud universe; equivalent to `clientOptions.universeDomain`, set on all generated clients. Default universe is `googleapis.com`. |
| `keyFilename` | `string` | `@deprecated` (security risk, no validation of the credential configuration). |
| `keyFile` | `string` | `@deprecated`, same reason as `keyFilename`. |
| `credentials` | `JWTInput \| ExternalAccountClientOptions \| GdchCredentialsInput` | `@deprecated`, same reason. |

Configuration precedence: `credentials`, then `keyFilename`, then `keyFile`.

Main methods (from `googleauth.d.ts`):

| Method | Returns |
|--------|---------|
| `getClient()` | `Promise<AnyAuthClient>`, the client chosen from the configuration or ADC |
| `getApplicationDefault()` | `Promise<ADCResponse>` (`{credential, projectId}`) |
| `getProjectId()` | `Promise<string>` |
| `getIdTokenClient(targetAudience)` | `Promise<IdTokenClient>` (see `id-tokens.md`) |
| `getAccessToken()` | `Promise<string \| null \| undefined>` |
| `getRequestHeaders(url?)` | `Promise<Headers>` |
| `fetch(...args)` / `request(opts)` | `Promise<GaxiosResponse<T>>` |
| `getUniverseDomain()` | `Promise<string>` |
| `getCredentials()` | `Promise<CredentialBody>` |
| `sign(data, endpoint?)` | `Promise<string>` |

`getProjectId()` resolves in this order: the `projectId` option; `GCLOUD_PROJECT` or `GOOGLE_CLOUD_PROJECT` env var; the `GOOGLE_APPLICATION_CREDENTIALS` JSON file; `gcloud config config-helper --format json`; the GCE metadata server.

## Notes

- This is the Google auth library used by Google Cloud client libraries (`@google-cloud/*`). It is distinct from the `google-genai` Gemini SDK (see the `google-gemini-api` skill) and from `googleapis`, the Node.js Google API Client Library for REST discovery APIs.
- Applies to google-auth-library 11.3.4 (npm), `node>=22`. Install with `npm install google-auth-library`.
- Before calling an API, the API must be enabled for the project (the README's DNS example needs the DNS API).
- Set up ADC itself (gcloud login, attached service accounts) is covered by the `gcp-foundation` skill; this page covers the library side only.
- Service account keys are a security risk; prefer ADC with attached service accounts, impersonation or Workload Identity Federation (see `gcp-foundation`). `keyFilename`, `keyFile`, `credentials`, `fromJSON` and `fromStream` are marked `@deprecated` in 11.3.4 because they do not validate the credential configuration; validate any configuration that comes from an external source before use.
- Never print or log access tokens returned by `getAccessToken()` or `getRequestHeaders()`.
- The README example prints `res.data` (API response body, not a credential).
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md (retrieved 2026-11-16; pinned at tag google-auth-library-v11.3.4, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/googleauth.ts (pinned at tag google-auth-library-v11.3.4)

## Related

- [oauth2-client.md](./oauth2-client.md)
- [jwt-service-account.md](./jwt-service-account.md)
- [compute.md](./compute.md)
- [workload-identity-federation.md](./workload-identity-federation.md)
- [id-tokens.md](./id-tokens.md)
- [impersonated-credentials.md](./impersonated-credentials.md)
- [proxy.md](./proxy.md)
