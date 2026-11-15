---
source: https://github.com/googleapis/google-cloud-node/blob/google-logging-utils-v2.2.0/core/packages/logging-utils/README.md
---

# Logging with GOOGLE_SDK_NODE_LOGGING

Google Cloud Node.js client libraries (built on `google-gax`, `google-auth-library` and `gcp-metadata`) emit RPC diagnostic logs through `google-logging-utils` when the `GOOGLE_SDK_NODE_LOGGING` environment variable selects a system.

## Signature / Usage

### Enable by environment variable

A "system" is the library-specific part of the package name (for example `@google-cloud/translate` is `translate`); subsystems are separated by a colon (`pubsub:leasing`); wildcards (`pubsub:*`) and comma-separated lists are allowed.

```bash
GOOGLE_SDK_NODE_LOGGING=translate node yourApp.js
```

```bash
GOOGLE_SDK_NODE_LOGGING=* node yourApp.js
```

### Enable in code

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

### Create your own logger

```js
const logger = log('test');
logger({other:{metadata: 'foo'}}, 'format string %j', {formatted: 'parameter'});
```

```js
logger.debug('format string %s', 'string');
logger.info('format string %s', 'string');
logger.warn('format string %s', 'string');
logger.error('format string %s', 'string');
```

```js
const sublogger = logger.sublog('specific');
logger.info('big one');
sublogger.info('specific!');
```

The last block logs under `test` and `test:specific` respectively.

## Notes

- Client libraries log request and response payloads at `DEBUG` severity, and payloads can contain sensitive data. `GOOGLE_SDK_NODE_LOGGING` selects systems, not severities, and the built-in backends do not filter by severity: with the default Node backend, `translate` or `*` prints `DEBUG` payloads to stderr. Filter by severity as shown in `logging-backends.md`.
- Per-client switch: `enableTelemetryLogging: true` enables logging; when unset, the env var must match the client's service namespace (`'*'`, exact `'all'` / `'true'`, or comma-separated wildcard patterns). `enableTelemetryLogging: false` disables it for that client even when the env var matches (`clientInterface.d.ts`, `observability/util.d.ts`). It also exists on `CallOptions`.
- Failed RPC logs are emitted by gax at `WARNING` for a failed logical request and `DEBUG` for a failed transport attempt (`LoggerHelper.d.ts`).
- Output text is not a stable contract (the package says log messages and `LogFields.other` attributes may change in minor versions); the exported API (`log()`, `setBackend()`, `getNodeBackend()`, `getStructuredBackend()`, `env.nodeEnables`) is SemVer-stable.
- These utilities are meant for use inside Google libraries; use outside that context is "currently not supported".
- You can reach the package through gax: `const {loggingUtils} = require('google-gax')`.
- The README shows `log(...)` without an import: the snippet is a fragment. The README's blocks are untagged and tagged `bash` / `js` here.
- Applies to `google-logging-utils` 2.2.0 and `google-gax` 6.17.0 (npm).
- Source: https://github.com/googleapis/google-cloud-node/blob/google-logging-utils-v2.2.0/core/packages/logging-utils/README.md (retrieved 2026-11-16; pinned at tag google-logging-utils-v2.2.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/observability/util.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/clientInterface.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/observability/LoggerHelper.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)

## Related

- [logging-backends.md](./logging-backends.md)
- [nodejs-observability.md](./nodejs-observability.md)
