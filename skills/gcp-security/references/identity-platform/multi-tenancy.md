---
source: https://docs.cloud.google.com/identity-platform/docs/multi-tenancy
---

# Identity Platform multi-tenancy

Tenants create separate silos of users and configurations within a single Identity Platform project, for example per customer, business unit or subsidiary. Multi-tenancy is most commonly used in business-to-business (B2B) apps. Tenants establish a data isolation boundary between resource hierarchies and can operate autonomously from one another.

## Signature / Usage

### Read the tenant ID inside a blocking function

Adapted (not in the official docs): added a `!user.email` check so users without an email are rejected instead of throwing a TypeError.

```javascript
// Import the Cloud Auth Admin module.
import * as gcipCloudFunctions from 'gcip-cloud-functions';
// Initialize the Auth client.
const authClient = new gcipCloudFunctions.Auth();
// Http trigger with Cloud Run functions.
exports.beforeCreate = authClient.functions().beforeCreateHandler((user, context) => {
  // If the user is authenticating within a tenant context, the tenant ID can be determined from
  // user.tenantId or from context.resource, eg. 'projects/project-id/tenant/tenant-id-1'
  // Only users of a specific domain can sign up.
  if (!user.email || !user.email.endsWith('@acme.com')) {
    throw new gcipCloudFunctions.https.HttpsError('invalid-argument', `Unauthorized email "${user.email}"`);
  }
});
```

## Options / Props

### Each tenant has its own

| Item |
|---|
| Unique identifier |
| Users |
| Identity providers and authentication methods |
| Auditing and IAM configuration |
| Quota allocation |
| Identity Platform usage breakdown |

### Supported sign-in methods

| Method |
|---|
| Email/password |
| Social providers (such as Google, Microsoft and LinkedIn) |
| SAML federation |
| OpenID Connect federation |

### Limitations

| Not supported in tenants |
|---|
| Disabling account linking |
| Adding a blocking function specific to a given tenant |

## Notes

- You can't disable user signup or user deletion from the Google Cloud console for tenants; configure these settings through the API.
- Blocking functions apply to all users in the project, including users in a tenant; the function receives the tenant information so it can respond accordingly.
- Adapted from the official docs: the original condition was `if (!user.email.endsWith('@acme.com'))`, which throws when the user has no email (for example phone sign-in).
- Source: https://docs.cloud.google.com/identity-platform/docs/multi-tenancy (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/identity-platform/docs/blocking-functions (retrieved 2026-11-18).
- The source links further guides (quickstart, tenant sign-in, multi-tenant sign-in page, user migration to a tenant, managing tenants programmatically). Tenant REST resources are in the `gcp-foundation` skill (`identitytoolkit`).

## Related

- [blocking-functions.md](./blocking-functions.md)
- [concepts-manage-users.md](./concepts-manage-users.md)
