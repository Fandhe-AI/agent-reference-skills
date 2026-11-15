---
source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md#downscoped-client
---

# Downscoped credentials (DownscopedClient)

`DownscopedClient` produces a short-lived access token from a `CredentialAccessBoundary` and a source credential. The boundary lists the resources the new credential can access and an upper bound on the permissions per resource, so tokens in flight carry least privilege. Only Cloud Storage supports Credential Access Boundaries for now.

Two roles are involved. The token broker holds elevated permissions and generates downscoped tokens; the token consumer cannot generate tokens and relies on the broker, passing tokens over a secure authenticated channel. A broker can run on a server in a private network and serve many workloads.

## Signature / Usage

### Token broker

Adapted (not in the official docs): fixed the unterminated string in the `availabilityCondition` expression (closing `'` added after `customer-a`), passed `cabRules` (the README passed an undefined `cab`) and declared `accessToken` / `expiryDate` with `const` instead of assigning undeclared globals.

```js
const {GoogleAuth, DownscopedClient} = require('google-auth-library');
// Define CAB rules which will restrict the downscoped token to have readonly
// access to objects starting with "customer-a" in bucket "bucket_name".
const cabRules = {
  accessBoundary: {
    accessBoundaryRules: [
      {
        availableResource: `//storage.googleapis.com/projects/_/buckets/bucket_name`,
        availablePermissions: ['inRole:roles/storage.objectViewer'],
        availabilityCondition: {
          expression:
            `resource.name.startsWith('projects/_/buckets/` +
            `bucket_name/objects/customer-a')`
        }
      },
    ],
  },
};

// This will use ADC to get the credentials used for the downscoped client.
const googleAuth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

// Obtain an authenticated client via ADC.
const client = await googleAuth.getClient();

// Use the client to create a DownscopedClient.
const cabClient = new DownscopedClient({authClient: client, credentialAccessBoundary: cabRules});

// Refresh the tokens.
const refreshedAccessToken = await cabClient.getAccessToken();

// This will need to be passed to the token consumer.
const accessToken = refreshedAccessToken.token;
const expiryDate = refreshedAccessToken.expirationTime;
```

### Token consumer

The consumer defines a `refreshHandler` so it can obtain new downscoped tokens on demand whenever one expires, instead of holding a one-time token and expiry pair.

Adapted (not in the official docs): removed the trailing `main().catch(console.error);` (no `main` is defined in the snippet) and destructured the result of `download()`, which resolves to a one-element array holding the file contents.

```js
const {OAuth2Client} = require('google-auth-library');
const {Storage} = require('@google-cloud/storage');

// Create the OAuth credentials (the consumer).
const oauth2Client = new OAuth2Client();
// We are defining a refresh handler instead of a one-time access
// token/expiry pair.
// This will allow the consumer to obtain new downscoped tokens on
// demand every time a token is expired, without any additional code
// changes.
oauth2Client.refreshHandler = async () => {
  // The common pattern of usage is to have a token broker pass the
  // downscoped short-lived access tokens to a token consumer via some
  // secure authenticated channel.
  const refreshedAccessToken = await cabClient.getAccessToken();
  return {
    access_token: refreshedAccessToken.token,
    expiry_date: refreshedAccessToken.expirationTime,
  }
};

// Use the consumer client to define storageOptions and create a GCS object.
const storageOptions = {
  projectId: 'my_project_id',
  authClient: oauth2Client,
};

const storage = new Storage(storageOptions);

const [downloadFile] = await storage
    .bucket('bucket_name')
    .file('customer-a-data.txt')
    .download();
console.log(downloadFile.toString('utf8'));
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `authClient` | `AuthClient` | Source credential, for example from `GoogleAuth#getClient()`. |
| `credentialAccessBoundary` | `CredentialAccessBoundary` | `{accessBoundary: {accessBoundaryRules: [...]}}`. |
| rule `availableResource` | string | Resource the rule applies to, for example `//storage.googleapis.com/projects/_/buckets/bucket_name`. |
| rule `availablePermissions` | string[] | Upper bound of permissions, for example `['inRole:roles/storage.objectViewer']`. |
| rule `availabilityCondition.expression` | string | Condition restricting the rule, for example by object name prefix. |
| rule `availabilityCondition.title` | string | Optional. |
| rule `availabilityCondition.description` | string | Optional. |

`getAccessToken()` returns an object with `token` and `expirationTime` (`number | null`, optional; the access token expiration time in epoch time, seconds, per the `DownscopedAccessTokenResponse` JSDoc).

## Notes

- Applies to google-auth-library 11.3.4 (npm), `node>=22`. `DownscopedClient` and `CredentialAccessBoundary` are exported from the package index. `availabilityCondition` also accepts optional `title` and `description`, and a Credential Access Boundary holds at most 10 access boundary rules (`MAX_ACCESS_BOUNDARY_RULES_COUNT`) (`downscopedclient.d.ts`).
- Do not print or log `refreshedAccessToken.token`; send it to the consumer only through a secure authenticated channel. The consumer example prints downloaded object contents.
- Adapted from the official docs: original fragments `customer-a)\``, `credentialAccessBoundary: cab`, `access_token = refreshedAccessToken.token;`, `expiry_date = refreshedAccessToken.expirationTime;` and `main().catch(console.error);`, and `const downloadFile = await storage` (`File#download()` resolves to `DownloadResponse = [Buffer]` in `@google-cloud/storage` 9.0.0 `build/cjs/src/file.d.ts`, so `downloadFile.toString('utf8')` called `Array#toString`).
- Fragments: both blocks use top-level `await`; the consumer block uses `cabClient` from the broker block.
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md (retrieved 2026-11-16; pinned at tag google-auth-library-v11.3.4, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/downscopedclient.ts (pinned at tag google-auth-library-v11.3.4)
- Source: https://www.npmjs.com/package/@google-cloud/storage/v/9.0.0 (`build/cjs/src/file.d.ts`, `DownloadResponse`; used only to check the `download()` return type)

## Related

- [impersonated-credentials.md](./impersonated-credentials.md)
- [adc-googleauth.md](./adc-googleauth.md)
