---
source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md#json-web-tokens
---

# JWT client and service account keys

The `JWT` client authenticates with a service account using the `.json` key file from the Google Developers Console. It is meant for a single identity for all users, server to server or server to API. Warning: service account keys are long-lived credentials; use them only where the alternatives (ADC with an attached service account, impersonation, Workload Identity Federation) are not possible.

## Signature / Usage

### Create a JWT client from a key file

```js
const {JWT} = require('google-auth-library');
const keys = require('./jwt.keys.json');

const client = new JWT({
  email: keys.client_email,
  key: keys.private_key,
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});
const url = `https://dns.googleapis.com/dns/v1/projects/${keys.project_id}`;
const res = await client.fetch(url);
console.log(res.data);
```

### Load credentials from an environment variable

Instead of loading credentials from a key file, provide them in an environment variable. This is convenient for systems that deploy directly from source control (Heroku, App Engine, etc). The `CREDS` variable holds the service account key JSON (`type`, `project_id`, `private_key_id`, `private_key`, `client_email`, `client_id`, `auth_uri`, `token_uri`, `auth_provider_x509_cert_url`, `client_x509_cert_url`). Set it from your deployment platform's secret store, not by typing the key on the command line.

Now create a new client from the credentials:

```js
const {JWT} = require('google-auth-library');

// load the environment variable with our keys
const keysEnvVar = process.env['CREDS'];
if (!keysEnvVar) {
  throw new Error('The $CREDS environment variable was not found!');
}
const keys = JSON.parse(keysEnvVar);

// create a JWT client
const client = new JWT({
  email: keys.client_email,
  key: keys.private_key,
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});
const url = `https://dns.googleapis.com/dns/v1/projects/${keys.project_id}`;
const res = await client.fetch(url);
console.log(res.data);
```

## Options / Props

`JWT` constructor options used by the README:

| Name | Type | Description |
|------|------|-------------|
| `email` | string | `client_email` from the key file. |
| `key` | string | `private_key` from the key file. |
| `scopes` | string[] | OAuth scopes requested. |

The README states that all parameters, including how to use a `.pem` file, are explained in the upstream sample `samples/jwt.js` (not reproduced here; that link is unpinned).

## Notes

- Applies to google-auth-library 11.3.4 (npm), `node>=22`. `JWT` and `JWTOptions` are exported from the package index.
- Service account keys are a security risk; prefer ADC with attached service accounts, impersonation or Workload Identity Federation (see `gcp-foundation`).
- **Important** (verbatim from the README): If you accept a credential configuration (credential JSON/File/Stream) from an external source for authentication to Google Cloud, you must validate it before providing it to any Google API or library. Providing an unvalidated credential configuration to Google APIs can compromise the security of your systems and data. See "Validate credential configurations from external sources" in the Google Cloud authentication docs.
- In 11.3.4 the `GoogleAuth` options `keyFilename`, `keyFile`, `credentials` and the methods `fromJSON` / `fromStream` are `@deprecated` for the same security reason. The `googleauth.d.ts` JSDoc recommends a credential-type-specific constructor such as `JWT` when you know you are loading a service account.
- Do not commit key files or put the `CREDS` value in source control or logs. Never print `keys.private_key`, access tokens or request headers.
- The README example prints `res.data` (API response body, not a credential).
- Dropped: the README's `$ export CREDS='{ ... "private_key": "your-private-key", ... }'` block. It types the private key inline on the command line, which stores it in shell history, and it starts with a `$ ` prompt that the shell would run as a command. The field list above is taken from that block.
- Fragments: both `js` blocks use top-level `await`.
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md (retrieved 2026-11-16; pinned at tag google-auth-library-v11.3.4, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/googleauth.ts (pinned at tag google-auth-library-v11.3.4)

## Related

- [adc-googleauth.md](./adc-googleauth.md)
- [impersonated-credentials.md](./impersonated-credentials.md)
- [workload-identity-federation.md](./workload-identity-federation.md)
- [proxy.md](./proxy.md)
