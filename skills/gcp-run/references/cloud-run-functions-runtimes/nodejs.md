---
source: https://docs.cloud.google.com/run/docs/runtimes/nodejs
---

# Node.js runtime

Your Cloud Run function runs on an OS with add-on packages, language support, and the Node.js Functions Framework. The environment is identified by the language version, known as the runtime ID. Select it with `--base-image` at deploy time.

## Signature / Usage

### Select the runtime

```bash
gcloud run deploy FUNCTION \
    --source . \
    --function FUNCTION_ENTRYPOINT \
    --base-image nodejs24
```

### Custom build step

By default `npm run build` runs if a `build` script exists in `package.json`. Add a `gcp-build` script for a custom build step. Prevent the build script by adding `"gcp-build":""`, or by setting the build environment variable `GOOGLE_NODE_RUN_SCRIPTS` to the empty string (prevents all scripts).

### Asynchronous completion (event-driven)

```javascript
  exports.implicitlyReturning = async (event, context) => {
    return await asyncFunctionThatReturnsAPromise();
  };
```

```javascript
  exports.explicitlyReturning = function (event, context) {
    return asyncFunctionThatReturnsAPromise();
  };
```

### Asynchronous completion (HTTP)

```javascript
// OK: await-ing a Promise before sending an HTTP response
await Promise.resolve();

// WRONG: HTTP functions should send an
// HTTP response instead of returning.
return Promise.resolve();

// HTTP functions should signal termination by returning an HTTP response.
// This should not be done until all background tasks are complete.
res.status(200).send();

// WRONG: this may not execute since an
// HTTP response has already been sent.
return Promise.resolve();
```

### ES modules

Declare `"type": "module"` in `package.json`, then use `import` / `export`. Fragment (`...` stands for the other `package.json` fields):

```text
{
  ...
  "type": "module",
  ...
}
```

## Options / Props

| Runtime | Runtime ID | Stacks | Deprecation | Decommission |
| --- | --- | --- | --- | --- |
| Node.js 26 (Preview) | `nodejs26` | google-24 (default), google-24-full | | |
| Node.js 24 | `nodejs24` | google-24 (default), google-24-full | 2028-04-30 | 2028-10-31 |
| Node.js 22 | `nodejs22` | google-22 (default), google-22-full | 2027-04-30 | 2027-10-31 |
| Node.js 20 | `nodejs20` | google-22 (default), google-22-full | 2026-04-30 | 2026-10-30 |
| Node.js 18 | `nodejs18` | google-22 (default), google-22-full | 2025-04-30 | 2025-10-30 |
| Node.js 16 | `nodejs16` | google-18-full | 2024-01-30 | 2025-01-30 |
| Node.js 14 | `nodejs14` | google-18-full | 2024-01-30 | 2025-01-30 |
| Node.js 12 | `nodejs12` | google-18-full | 2024-01-30 | 2025-01-30 |
| Node.js 10 | `nodejs10` | google-18-full | 2024-01-30 | 2025-01-30 |
| Node.js 8 | `nodejs8` | Decommissioned | 2020-06-05 | Feb 2021 |
| Node.js 6 | `nodejs6` | Decommissioned | 2019-04-17 | Aug 2020 |

## Notes

- Source layout: `index.js` at the root (or the `main` field of `package.json`) plus `package.json`; see write-functions in the `cloud-run-functions` category. Dependencies are listed in `package.json` (https://docs.cloud.google.com/run/docs/runtimes/nodejs-dependencies).
- The two event-driven snippets above only illustrate the "return or await the Promise" rule and use the 1st gen background-function shape `exports.name = (event, context) => ...`. On Cloud Run functions, register an event-driven handler with the Functions Framework, `functions.cloudEvent('name', cloudEvent => ...)` (one `cloudEvent` argument; see write-functions in the `cloud-run-functions` category). The Functions Framework's `--signature-type` / `FUNCTION_SIGNATURE_TYPE` option defaults to `http` (see local-dev-functions.md).
- Failure to signal termination properly may make the function terminate early or run until its timeout.
- Node.js HTTP functions get Express-compatible `request` / `response` objects. Cloud Run functions always reads the request body, so HTTP requests are fully read before your code runs; nested Express middleware that expects an unread body might not behave as expected.
- ES modules need Node 14+; more in https://github.com/GoogleCloudPlatform/functions-framework-nodejs/tree/main/docs/esm.
- Runtimes past their decommission date (before 2026-11-15, e.g. `nodejs20` and older) cannot be used to create or update workloads; use `nodejs24`.
- Source inconsistency: the source's `nodejs12` base image link points to the `nodejs14` image.
- The source also shows Console steps for selecting the runtime (Write a function > Runtime list).
- Source: https://docs.cloud.google.com/run/docs/runtimes/nodejs (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/local-dev-functions (retrieved 2026-11-15; Functions Framework `--signature-type` default)

## Related

- [runtime-support.md](./runtime-support.md)
- [python.md](./python.md)
- [local-dev-functions.md](./local-dev-functions.md)
