---
source: https://docs.cloud.google.com/iam/docs/audit-logging
---

# IAM Audit Logs and Log Entry Examples

Cloud Audit Logs for IAM, Security Token Service (STS), and Service Account Credentials: service names, which methods produce Admin Activity versus Data Access logs, and example entries for service accounts and Workload Identity Federation.

## Signature / Usage

### Logs Explorer queries

```text
protoPayload.serviceName="iam.googleapis.com"
protoPayload.serviceName="sts.googleapis.com"
protoPayload.serviceName="iamcredentials.googleapis.com"
protoPayload.methodName="google.iam.admin.v1.CreateRole"
protoPayload.methodName="google.iam.admin.v1.CreateServiceAccount"
protoPayload.methodName="google.iam.admin.v1.CreateServiceAccountKey"
protoPayload.methodName="google.identity.sts.v1.SecurityTokenService.ExchangeToken"
```

Every method has a filter of the form `protoPayload.methodName="<method>"`.

### Create a service account (log entry)

```json
{
  "protoPayload": {
    "@type": "type.googleapis.com/google.cloud.audit.AuditLog",
    "authenticationInfo": {
      "principalEmail": "example-user@example.com"
    },
    "methodName": "google.iam.admin.v1.CreateServiceAccount",
    "response": {
      "email": "my-service-account@my-project.iam.gserviceaccount.com",
      "@type": "type.googleapis.com/google.iam.admin.v1.ServiceAccount",
      "display_name": "My service account."
    }
  },
  "resource": {
    "type": "service_account"
  }
}
```

### Grant the Service Account User role (log entry)

```json
{
  "logName": "projects/my-project/logs/cloudaudit.googleapis.com%2Factivity",
  "protoPayload": {
    "@type": "type.googleapis.com/google.cloud.audit.AuditLog",
    "methodName": "google.iam.admin.v1.SetIAMPolicy",
    "request": {
      "@type": "type.googleapis.com/google.iam.v1.SetIamPolicyRequest",
      "resource": "projects/-/serviceAccounts/my-service-account@my-project.iam.gserviceaccount.com"
    },
    "resourceName": "projects/-/serviceAccounts/123456789012345678901",
    "response": {
      "@type": "type.googleapis.com/google.iam.v1.Policy",
      "bindings": [
        {
          "members": [
            "user:my-user@example.com"
          ],
          "role": "roles/iam.serviceAccountUser"
        }
      ]
    }
  },
  "resource": {
    "type": "service_account"
  }
}
```

### Attaching a service account (actAs) (log entry)

```json
{
  "protoPayload": {
    "@type": "type.googleapis.com/google.cloud.audit.AuditLog",
    "authenticationInfo": {
      "principalEmail": "example-user@example.com"
    },
    "serviceName": "iam.googleapis.com",
    "methodName": "iam.serviceAccounts.actAs",
    "authorizationInfo": [
      {
        "resource": "projects/-/serviceAccounts/sample-service-account@sample-project.iam.gserviceaccount.com",
        "permission": "iam.serviceAccounts.actAs",
        "granted": true,
        "permissionType": "ADMIN_WRITE"
      }
    ],
    "resourceName": "projects/-/serviceAccounts/sample-service-account@sample-project.iam.gserviceaccount.com",
    "request": {
      "name": "sample-service-account@sample-project.iam.gserviceaccount.com",
      "project_number": "787155667719",
      "@type": "type.googleapis.com/CanActAsServiceAccountRequest"
    },
    "response": {
      "success": true,
      "@type": "type.googleapis.com/CanActAsServiceAccountResponse"
    }
  },
  "insertId": "vojt0vd4fdy",
  "resource": {
    "type": "audited_resource",
    "labels": {
      "project_id": "sample-project",
      "method": "iam.serviceAccounts.actAs",
      "service": "iam.googleapis.com"
    }
  },
  "timestamp": "2024-08-05T21:56:56.097601933Z",
  "severity": "NOTICE",
  "logName": "projects/sample-project/logs/cloudaudit.googleapis.com%2Factivity",
  "receiveTimestamp": "2024-08-05T21:56:56.097601933Z"
}
```

### Workload Identity Federation token exchange (log entry)

Requires Data Access logs (log type Admin Read) enabled for both the IAM API and the Security Token Service API.

```json
{
  "logName": "projects/my-project/logs/cloudaudit.googleapis.com%2Fdata_access",
  "protoPayload": {
    "@type": "type.googleapis.com/google.cloud.audit.AuditLog",
    "status": {},
    "authenticationInfo": {
      "principalSubject": "b6112abb-5791-4507-adb5-7e8cc306eb2e"
    },
    "metadata": {
      "mapped_principal": "principal://iam.googleapis.com/projects/1234567890123/locations/global/workloadIdentityPools/azure-pool/subject/a1234bcd-5678-9012-efa3-4b5cd678ef9a"
    },
    "methodName": "google.identity.sts.v1.SecurityTokenService.ExchangeToken",
    "resourceName": "projects/1234567890123/locations/global/workloadIdentityPools/azure-pool/providers/azure",
    "request": {
      "@type": "type.googleapis.com/google.identity.sts.v1.ExchangeTokenRequest",
      "grantType": "urn:ietf:params:oauth:grant-type:token-exchange"
    },
    "authorizationInfo": [
      {
        "permission": "sts.identityProviders.checkLogging",
        "granted": false,
        "permissionType": "ADMIN_READ"
      }
    ]
  },
  "resource": {
    "type": "audited_resource"
  }
}
```

SAML signature verification and decryption details appear under `keyInfo`:

```text
"keyInfo": [
  {
    "use": "verify"
    "fingerprint": "3C:B2:47:F8:A5:9A:8A:52:BD:1C:BC:96:B5:45:C1:8D:A7:F1:73:2D"
  },
  {
    "use": "decrypt"
    "resourceName": "//iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/WORKLOAD_POOL_NAME/providers/PROVIDER_NAME/keys/KEY_NAME"
  }
]
```

## Options / Props

### Permission type determines log category

| Permission type | Log category |
|-----------------|--------------|
| `ADMIN_WRITE` | Admin Activity |
| `ADMIN_READ`, `DATA_READ`, `DATA_WRITE` | Data Access (must be enabled) |
| `OTHER` | `google.iam.admin.v1.QueryGrantableRoles`: enable `ADMIN_READ` under `cloudresourcemanager.googleapis.com` |

### IAM API (`iam.googleapis.com`) methods

| Type | Methods |
|------|---------|
| `ADMIN_WRITE` | `CreateRole`, `CreateServiceAccount`, `CreateServiceAccountKey`, `DeleteRole`, `DeleteServiceAccount`, `DeleteServiceAccountKey`, `DisableServiceAccount`, `DisableServiceAccountKey`, `EnableServiceAccount`, `EnableServiceAccountKey`, `PatchServiceAccount`, `SetIAMPolicy`, `UndeleteRole`, `UndeleteServiceAccount`, `UpdateRole`, `UpdateServiceAccount`, `UploadServiceAccountKey` (all `google.iam.admin.v1.*`); `OauthClients.*` create/delete/undelete/update; `WorkforcePools.*` create/delete/undelete/update/SetIamPolicy (many LRO); `google.iam.v1.WorkloadIdentityPools.*` create/delete/undelete/update/attestation rules/SetIamPolicy (many LRO); `google.iam.v2.Policies.CreatePolicy/DeletePolicy/UpdatePolicy` (LRO, deny policies); `google.iam.v3.PolicyBindings` and `PrincipalAccessBoundaryPolicies` create/delete/update (LRO); matching alpha/beta variants. |
| `ADMIN_READ` | `GetIAMPolicy`, `GetRole`, `GetServiceAccount`, `GetServiceAccountKey`, `ListRoles`, `ListServiceAccountKeys`, `ListServiceAccounts`, `TestIAMPermissions`; `OauthClients` get/list; `WorkforcePools` get/list; `WorkloadIdentityPools` get/list; `google.iam.v2.Policies.GetPolicy/ListPolicies`; `google.iam.v3` policy binding and Principal Access Boundary get/list/search; `google.longrunning.Operations.GetOperation`. |

### STS (`sts.googleapis.com`) methods

| Type | Methods |
|------|---------|
| `ADMIN_READ` | `google.identity.sts.SecurityTokenService.WebSignIn`, `WebSignOut`, `google.identity.sts.v1.SecurityTokenService.ExchangeToken`, `google.identity.sts.v1beta.SecurityTokenService.ExchangeToken` (Data Access logs; permission `sts.identityProviders.checkLogging`) |

### Service Account Credentials (`iamcredentials.googleapis.com`)

| Type | Methods |
|------|---------|
| `DATA_READ` | `GenerateAccessToken`, `GenerateIdToken`, `SignBlob`, `SignJwt` |

### Token exchange log fields

| Field | Meaning |
|-------|---------|
| `protoPayload.authenticationInfo.principalSubject` | Subject of the IdP token (AWS ARN, Azure managed identity object ID, or OIDC `sub`). |
| `protoPayload.metadata.mapped_principal` | `principal://iam.googleapis.com/projects/project-number/locations/global/workloadIdentityPools/pool-id/subject/identifier` |
| `protoPayload.resourceName` | Workload identity pool provider. |
| `protoPayload.status` | Empty or omitted on success; server-side errors only (client errors are not logged). |
| `protoPayload.authorizationInfo` | Always contains `sts.identityProviders.checkLogging` with `granted: false`; this does not fail the exchange. |

## Notes

- Data Access audit logs for Service Account Credentials cannot be enabled independently; enable them for the IAM API (`iam.googleapis.com`) or for all services.
- LRO methods usually write two log entries (start and end).
- Entries where `service-agent-manager@system.gserviceaccount.com` grants roles to other service agents are normal.
- Granting a role to a service account on another resource produces a log under that resource's service (for example `cloudresourcemanager.googleapis.com`), with `authenticationInfo.principalEmail` identifying who granted it.
- The upstream twin of the official page contains markdown escape artifacts (`\[` and `\]`) inside the `members` arrays of the sample entries; they are removed above so the JSON is valid.
- Not covered here (see source pages): per-method pages for the full IAM method list, Privileged Access Manager logs, SCIM logs, OAuth client examples, and workforce identity examples.
- Source: https://docs.cloud.google.com/iam/docs/audit-logging (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/iam/docs/audit-logging/audit-logging-sts (retrieved 2026-11-14; CC BY 4.0)
- Source: https://docs.cloud.google.com/iam/docs/audit-logging/audit-logging-iamcreds (retrieved 2026-11-14; CC BY 4.0)
- Source: https://docs.cloud.google.com/iam/docs/audit-logging/examples-service-accounts (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/iam/docs/audit-logging/examples-workload-identity (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [workload-identity-federation-best-practices.md](../federation-credentials/workload-identity-federation-best-practices.md)
- [attach-service-accounts-and-pipelines.md](../service-accounts/attach-service-accounts-and-pipelines.md)
