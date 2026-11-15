---
source: https://docs.cloud.google.com/nodejs/docs/setup
---

# Set up a Node.js development environment

How to prepare a local machine for Node.js development against Google Cloud: install NVM, Node.js and npm, an editor, the Google Cloud CLI, a Cloud Client Library package, and Application Default Credentials (ADC). The landing page `nodejs/docs` only links to this guide, the getting-started tutorials, the observability page and the samples.

## Signature / Usage

### Install Node.js with NVM

NVM is a bash script for managing Node.js and `npm` installations. It does not support Windows (use nvm-windows there).

```bash
nvm install stable
```

```bash
nvm alias default stable
```

```bash
node -v
```

### Install a Cloud Client Library

Install the package for an individual API, for example Cloud Storage:

```bash
npm install @google-cloud/storage
```

### Set up authentication

For local development, set up ADC with your user account (not needed in Cloud Shell):

```bash
gcloud auth application-default login
```

If an authentication error is returned and you use an external identity provider (IdP), confirm that you signed in to the gcloud CLI with your federated identity.

## Notes

- Applies to the Cloud Client Libraries for Node.js (`@google-cloud/*`); the gax-based libraries require `node>=22` at the pinned versions (see `supported-nodejs-versions.md`).
- Source inconsistency: the page tells you to run `nvm install stable` (the latest Node.js release), while the supported-versions page says to start new projects on the current Active LTS and to avoid odd-numbered releases. Prefer the LTS guidance for production.
- The twin tags the shell commands as `javascript`; they are shell commands and are tagged `bash` here.
- The page also shows `gcloud app deploy` (App Engine, dropped here as product-specific; see `gcp-cli` / product skills).
- ADC setup with gcloud (impersonation, attached service accounts, Workload Identity Federation) belongs to `gcp-foundation`. Client-side credential objects for Node.js are in the `nodejs-auth` category.
- This is the Google Cloud client library (`@google-cloud/*`) and is distinct from the `google-genai` Gemini SDK (`google-gemini-api` skill) and from `googleapis` (the Node.js Google API Client Library for REST discovery APIs).
- Source: https://docs.cloud.google.com/nodejs/docs/setup (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/nodejs/docs (retrieved 2026-11-16; CC BY 4.0)

## Related

- [supported-nodejs-versions.md](./supported-nodejs-versions.md)
- [client-instance.md](./client-instance.md)
