---
source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md#compute
---

# Compute client

On Google Cloud, `Compute` authenticates with the default service account of the environment or a specific service account.

## Signature / Usage

```js
const {auth, Compute} = require('google-auth-library');

const client = new Compute({
  // Specifying the service account email is optional.
  serviceAccountEmail: 'my-service-account@example.com'
});
const projectId = await auth.getProjectId();
const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
const res = await client.fetch(url);
console.log(res.data);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `serviceAccountEmail` | string | Optional service account to use instead of the default one. |

## Notes

- In most cases use Application Default Credentials (`adc-googleauth.md`); direct use of the `Compute` class is for very specific scenarios (README).
- Applies to google-auth-library 11.3.4 (npm), `node>=22`. `Compute` and `ComputeOptions` are exported from the package index; `auth` is the default `GoogleAuth` instance exported by the same package.
- `GoogleAuth.getUniverseDomain()` resolves the universe domain from `clientOptions`, then the existing or ADC `AuthClient`, and only then from the metadata server (`gcpMetadata.universe`) when the client is `Compute` (`googleauth.d.ts`).
- Fragment: the block uses top-level `await`.
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md (retrieved 2026-11-16; pinned at tag google-auth-library-v11.3.4, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/googleauth.ts (pinned at tag google-auth-library-v11.3.4)

## Related

- [adc-googleauth.md](./adc-googleauth.md)
- [id-tokens.md](./id-tokens.md)
- [impersonated-credentials.md](./impersonated-credentials.md)
