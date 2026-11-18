---
source: https://docs.cloud.google.com/application-integration/docs/access-control
---

# Access control overview

Application Integration uses IAM for access control. After the service is provisioned in a project, you can add principals and set access at the project level (assign roles) or at the resource level (set an IAM policy on a resource that supports resource-level policies). Integrations run as one of two kinds of service account.

## Signature / Usage

### User-managed service account

A user-managed service account can be attached to an integration to provide the credentials to execute tasks. Email form:

```text
service-account-name@PROJECT_ID.iam.gserviceaccount.com
```

### Default service account

New projects that have provisioned Application Integration get a default service account, created during provisioning with the basic IAM roles and permissions. Email form:

```text
service-PROJECT_NUMBER@gcp-sa-integrations.iam.gserviceaccount.com
```

### Add a service account to an integration

- If governance is enabled for the region, you must add a service account while creating a new integration.
- If governance is not enabled, adding one is optional; to add one to an existing integration see "Edit and view integrations" (https://docs.cloud.google.com/application-integration/docs/view-integration-details).

### Access scopes

For user-managed service accounts the scope is predefined to:

```text
https://www.googleapis.com/auth/cloud-platform
```

## Options / Props

| Topic | Rule |
|---|---|
| Authentication rule | If an integration has both an OAuth 2.0 profile and a user-managed service account, the OAuth 2.0 profile is used by default. If neither is configured, the default service account is used. If the task does not use the default service account, the execution fails. Read the run-as authorization change in Notes before relying on this fallback. |
| Authorization rule | Access of an attached service account is determined by the IAM roles granted to it; with no IAM roles, no resources can be accessed. |
| Roles | Granting a role to a service account gives every integration with that service account attached the authorization conferred by that role. Create custom roles when no predefined role fits. |
| Access scopes | The legacy method of specifying authorization: default OAuth scopes for requests from gcloud or client libraries (multiple scopes separated by one space). They may further limit API methods under OAuth but do not extend to other protocols such as gRPC. |
| Both must allow | For a user-managed service account, both the granted roles and the access scopes must allow access before the integration can execute the task. |

## Notes

- Predefined roles for Application Integration are listed at https://docs.cloud.google.com/application-integration/docs/integrations-access-permissions.
- The default service account is created during provisioning with the basic IAM roles and permissions; the source does not recommend it as the identity for integrations. For granting additional roles or permissions to it, see https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access.
- Run-as authorization change: the Authentication rule row and the optional service account are as the source states them. Per https://docs.cloud.google.com/application-integration/docs/prepare-for-authorization-changes, every run must now have an explicit identity (the triggering user or a run-as service account); this already applies to integrations created on or after October 15, 2026 and applies to all existing integrations starting January 15, 2027 (UTC). Do not rely on the default-service-account fallback for new integrations.
- Source: https://docs.cloud.google.com/application-integration/docs/prepare-for-authorization-changes (retrieved 2026-11-18; CC BY 4.0)
- Source: https://docs.cloud.google.com/application-integration/docs/access-control (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [authentication.md](./authentication.md)
- [configure-authentication-profiles.md](./configure-authentication-profiles.md)
- [prepare-for-authorization-changes.md](./prepare-for-authorization-changes.md)
- [cmek.md](./cmek.md)
