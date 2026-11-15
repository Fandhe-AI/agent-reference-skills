---
source: https://github.com/googleapis/google-cloud-node/blob/secret-manager-v8.0.0/packages/google-cloud-secretmanager/README.md
---

# Secret Manager README (a representative GAPIC package)

`@google-cloud/secret-manager` is a generated (GAPIC) Node.js client. Its README shows the standard package shape: prerequisites, `npm install`, a generated samples table per API version, supported Node.js versions and versioning.

## Signature / Usage

### Before you begin

1. Select or create a Cloud Platform project.
2. Enable billing for your project.
3. Enable the Secret Manager API.
4. Set up authentication so you can access the API from your local workstation.

### Install

```bash
npm install @google-cloud/secret-manager
```

### Use with logging enabled

With logging enabled:

Verbatim from the logging README at tag `google-logging-utils-v2.2.0` (Example 1, lines 99–112), including its in-code comment.

```js
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');

// Enable logging for the Secret Manager client library (prefer a service-scoped
// filter over `*`, `true`, or `all` in production so `auth` debug logs stay off).
process.env.GOOGLE_SDK_NODE_LOGGING = 'secretmanager';

async function main() {
  const client = new SecretManagerServiceClient();
  await client.listSecrets({parent: 'projects/my-project'});
}

main().catch(console.error);
```

## Notes

- The `// Enable logging for the Secret Manager client library (prefer a service-scoped …)` comment is part of the upstream README block (google-logging-utils 2.2.0 `README.md` lines 102–103), not an editorial addition; the block is unmodified.
- Samples (generated, `v1` and `v1beta2`): access secret version, add secret version, create secret, delete secret, destroy secret version, disable secret version, enable secret version, get iam policy, get secret, get secret version, list secret versions, list secrets, set iam policy, test iam permissions, update secret. Each links to `samples/generated/<version>/secret_manager_service.<method>.js` in the package.
- The README itself contains no code beyond `npm install`; the second block is borrowed from the logging README (Secret Manager is that README's example).
- Snippet taken from https://github.com/googleapis/google-cloud-node/blob/google-logging-utils-v2.2.0/core/packages/logging-utils/README.md (lists secrets by parent; reads no secret payload).
- Stable release level; follows Semantic Versioning. Supports active and maintenance Node.js versions; `legacy-<version>` dist-tags exist (the README's `legacy-8` example is dated, see `supported-nodejs-versions.md`).
- Do not log or print secret payloads when you use `accessSecretVersion`. Secret Manager product usage is out of scope here (product skills).
- With `GOOGLE_SDK_NODE_LOGGING` matching `secretmanager`, request and response payloads are logged at `DEBUG`; for `accessSecretVersion` that includes the secret payload. Do not enable it in production without a severity filter (see `logging-backends.md`).
- Client usage conventions: `client-instance.md`, `client-options.md`, `call-options.md`.
- This is the Google Cloud client library; distinct from `googleapis` and the `google-genai` SDK (`google-gemini-api` skill).
- Applies to `@google-cloud/secret-manager` 8.0.0 (npm).
- Source: https://github.com/googleapis/google-cloud-node/blob/secret-manager-v8.0.0/packages/google-cloud-secretmanager/README.md (retrieved 2026-11-16; pinned at tag secret-manager-v8.0.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-logging-utils-v2.2.0/core/packages/logging-utils/README.md (retrieved 2026-11-16; pinned at tag google-logging-utils-v2.2.0, Apache 2.0)

## Related

- [client-instance.md](./client-instance.md)
- [logging.md](./logging.md)
- [google-cloud-common.md](./google-cloud-common.md)
