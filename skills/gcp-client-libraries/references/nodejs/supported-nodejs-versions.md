---
source: https://docs.cloud.google.com/nodejs/getting-started/supported-nodejs-versions
---

# Supported Node.js versions

How the Cloud Client Libraries for Node.js track the Node.js release schedule. Libraries target Active LTS and are tested against all Maintenance LTS versions; end-of-life runtimes get best-effort legacy builds through npm dist-tags.

## Signature / Usage

Check which Node.js version you are running; the pinned packages require `node>=22`:

```bash
node -v
```

Legacy builds for end-of-life Node.js versions are published through npm dist-tags named `legacy-(version)` (naming pattern only; see Notes).

## Notes

- New development uses the Active LTS from the Node.js release schedule; Maintenance LTS is the second choice if Active LTS is not available on your runtime.
- Use even-numbered Node.js releases. Odd-numbered releases are not LTS candidates and reach end-of-life after 6 months.
- A library increments its major version when it ends support for a Node.js runtime. Upgrade your runtime to a supported LTS and then the dependency.
- Legacy runtimes are supported on a best-effort basis (not tested in CI, some security patches and features cannot be backported, dependencies cannot be kept up to date). When possible, critical patches go to prior major versions.
- Latest versions and supported Node.js versions are listed in each client library's GitHub repository and in the table on the `googleapis/google-cloud-node` page.
- Pinned runtime floor: `google-gax` 6.17.0, `google-auth-library` 11.3.4 and `gaxios` 8.3.3 declare `engines` `node>=22` in their `package.json`.
- Snippet taken from https://docs.cloud.google.com/nodejs/docs/setup (the twin tags it `javascript`; it is a shell command and is tagged `bash` here).
- The `@google-cloud/common` README illustrates the `legacy-(version)` pattern with `npm install @google-cloud/common@legacy-8`. `legacy-8` targets end-of-life Node.js 8 and is a dated example, so it is not reproduced as a code block; the pinned packages require `node>=22`.
- Source inconsistency: the `google-gax` 6.17.0 README says grpc-js needs "Node.js v8.13.0 or newer" and shows passing the legacy `grpc` package as `{ grpc }` to the client constructor. That text predates `node>=22` and is not reproduced as current guidance. The Secret Manager README carries the same dated `legacy-8` example.
- Source: https://docs.cloud.google.com/nodejs/getting-started/supported-nodejs-versions (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/common-v8.2.2/core/common/README.md (retrieved 2026-11-16; pinned at tag common-v8.2.2, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/README.md (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://docs.cloud.google.com/nodejs/docs/setup (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/package.json (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/package.json (retrieved 2026-11-16; pinned at tag google-auth-library-v11.3.4, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/gaxios-v8.3.3/core/packages/gaxios/package.json (retrieved 2026-11-16; pinned at tag gaxios-v8.3.3, Apache 2.0)

## Related

- [setup.md](./setup.md)
- [google-cloud-common.md](./google-cloud-common.md)
