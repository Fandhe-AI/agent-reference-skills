---
source: https://docs.cloud.google.com/identity-platform/docs/product-comparison
---

# Differences between Identity Platform and Firebase Authentication

Identity Platform is the backend for Firebase Authentication with Identity Platform and offers identical features. As an upgrade from Firebase Authentication it adds multi-factor authentication (MFA), blocking functions, OIDC and SAML authentication, multi-tenancy, Identity-Aware Proxy integration, BAA coverage and a 99.95% uptime SLA. Apps do not need to change when upgrading and keep working with existing Firebase services.

## Signature / Usage

### Blocking function skeleton (an Identity Platform-only feature)

Adapted (not in the official docs): the module is loaded with `require()` because the file uses CommonJS `exports` (the source mixes an ES module `import` with `exports`).

```javascript
const gcipCloudFunctions = require('gcip-cloud-functions');

const authClient = new gcipCloudFunctions.Auth();

exports.beforeSignIn = authClient.functions().beforeSignInHandler((user, context) => {

});
```

## Options / Props

### Authentication

| Feature | Identity Platform | Firebase Authentication |
|---|---|---|
| Sign in with email | Yes | Yes |
| Sign in with OAuth | Yes | Yes |
| Sign in with phone | Yes | Yes |
| Custom authentication | Yes | Yes |
| Multi-factor authentication | Yes | No |
| Blocking Functions | Yes | No |
| Sign in with OIDC | Yes | No |
| Sign in with SAML | Yes | No |
| Multi-tenancy | Yes | No |
| IAP integration | Yes | No |

### SDKs

| Feature | Identity Platform | Firebase Authentication |
|---|---|---|
| Web SDK | Yes | Yes |
| iOS SDK | Yes | Yes |
| Android SDK | Yes | Yes |
| Admin SDK | Yes | Yes |

### Compliance and uptime

| Feature | Identity Platform | Firebase Authentication |
|---|---|---|
| ISO 27001 | Yes | Yes |
| SSAE 18 SOC1 | Yes | Yes |
| SSAE 18 SOC2 | Yes | Yes |
| SSAE 18 SOC3 | Yes | Yes |
| TISAX | Yes | No |
| BAA coverage | Yes | No |
| PCI-DSS in scope | Yes | No |
| Enterprise SLA | 99.95% uptime | No |

## Notes

- Firebase Authentication with Identity Platform and Identity Platform are paid services; prices are not copied here, see https://cloud.google.com/identity-platform/pricing. Firebase Authentication with Identity Platform is available without a billing instrument up to daily limits (https://cloud.google.com/identity-platform/quotas).
- To preserve backwards-compatibility, the SDKs occasionally use Firebase branding and naming conventions.
- Adapted from the official docs: the source's `index.js` combines `import * as gcipCloudFunctions from 'gcip-cloud-functions'` with `exports.beforeCreate = ...`, which fails both as CommonJS (the `import`) and as an ES module (`exports` is undefined); the samples use `const gcipCloudFunctions = require('gcip-cloud-functions');` and keep `exports`, so no `"type": "module"` is needed in `package.json`.
- Source: https://docs.cloud.google.com/identity-platform/docs/product-comparison (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/identity-platform/docs/blocking-functions (retrieved 2026-11-18).

## Related

- [blocking-functions.md](./blocking-functions.md)
- [multi-tenancy.md](./multi-tenancy.md)
- [concepts-authentication.md](./concepts-authentication.md)
