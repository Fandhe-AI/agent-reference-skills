---
source: https://github.com/googleapis/google-cloud-node/blob/common-v8.2.2/core/common/README.md
---

# @google-cloud/common

"Common components for Cloud APIs Node.js Client Libraries." Shared base code that other `@google-cloud/*` packages depend on (per its README, you rarely install it directly).

## Signature / Usage

```bash
npm install @google-cloud/common
```

## Notes

- "It's unlikely you will need to install this package directly, as it will be installed as a dependency when you install other `@google-cloud` packages."
- The README does not describe its API or call it the base of handwritten libraries; this page records only what the README says. The `client-libraries-explained` page (`apis/docs/client-libraries-explained`) describes the split between generated and handwritten libraries.
- Release level: stable; follows Semantic Versioning. Libraries follow the Node.js release schedule (active and maintenance versions); `legacy-<version>` dist-tags exist for end-of-life runtimes (see `supported-nodejs-versions.md`).
- Source inconsistency: the README links to the old repository `googleapis/nodejs-common`; the npm package source is `core/common` in `googleapis/google-cloud-node`.
- API reference linked by the README: `https://googleapis.dev/nodejs/common/latest`.
- Applies to `@google-cloud/common` 8.2.2 (npm). Distinct from `google-gax` GAPIC libraries (see `client-instance.md`) and from the `google-genai` SDK (`google-gemini-api` skill).
- Source: https://github.com/googleapis/google-cloud-node/blob/common-v8.2.2/core/common/README.md (retrieved 2026-11-16; pinned at tag common-v8.2.2, Apache 2.0)

## Related

- [supported-nodejs-versions.md](./supported-nodejs-versions.md)
- [secret-manager-gapic.md](./secret-manager-gapic.md)
