---
source: https://docs.cloud.google.com/iam/docs/troubleshoot-org-policies
---

# Troubleshooting Organization Policy Constraints on Service Accounts

Organization Policy constraints can block service account key creation, service account creation, and granting Editor/Owner to default service accounts. This page lists the errors and recommended resolutions.

## Signature / Usage

Key creation blocked by `iam.disableServiceAccountKeyCreation` (gcloud):

```yaml
ERROR: (gcloud.iam.service-accounts.keys.create) FAILED_PRECONDITION: Key
creation is not allowed on this service account.
- '@type': type.googleapis.com/google.rpc.PreconditionFailure
  violations:
  - description: Key creation is not allowed on this service account.
    subject: projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT_ID@PROJECT_ID.iam.gserviceaccount.com?configvalue=SERVICE_ACCOUNT_ID%40PROJECT_ID.iam.gserviceaccount.com
    type: constraints/iam.disableServiceAccountKeyCreation
```

Service account creation blocked by `iam.disableServiceAccountCreation` (REST):

```json
{
  "error": {
    "code": 400,
    "message": "Service account creation is not allowed on this project.",
    "status": "FAILED_PRECONDITION",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.PreconditionFailure",
        "violations": [
          {
            "type": "constraints/iam.disableServiceAccountCreation",
            "subject": "projects/PROJECT_ID/serviceAccounts/?configvalue=",
            "description": "Service account creation is not allowed on this project."
          }
        ]
      }
    ]
  }
}
```

Tag-based exemption condition used in the organization policy rule (not enforced for resources tagged `not_enforced`):

```
"resource.matchTag('ORGANIZATION_ID/disableServiceAccountKeyCreation', 'not_enforced')"
```

For `iam.disableServiceAccountCreation`, the same pattern applies with `ORGANIZATION_ID/disableServiceAccountCreation`.

### Default service account role grants

Default service accounts: App Engine `PROJECT_ID@appspot.gserviceaccount.com`, Compute Engine `PROJECT_NUMBER-compute@developer.gserviceaccount.com`. Both get `roles/editor` automatically unless blocked.

| Constraint | Effect |
|---|---|
| `iam.automaticIamGrantsForDefaultServiceAccounts` | Predefined; stops automatic role grants, but you may grant Editor later |
| `constraints/iam.managed.preventPrivilegedBasicRolesForDefaultServiceAccounts` | Managed; Editor and Owner can never be granted to the default service accounts (error `CUSTOM_ORG_POLICY_VIOLATION`, status `FAILED_PRECONDITION`) |

Roles to grant instead:

| Service | Default service account | Role |
|---|---|---|
| App Engine | App Engine default | `roles/cloudbuild.builds.builder` |
| Cloud Build | Compute Engine default | `roles/cloudbuild.builds.builder` |
| Cloud Run functions / Cloud Functions (deploy) | Compute Engine default | `roles/cloudbuild.builds.builder` |
| Google Kubernetes Engine | Compute Engine default | `roles/container.defaultNodeServiceAccount` |
| Compute Engine, Cloud Run, Workflows, Cloud Deploy | Compute Engine default | Task-dependent; see each service's docs and "Find the right predefined roles" |

## Notes

- Required role: Organization policy administrator `roles/orgpolicy.policyAdmin` on the organization (and Tag Administrator `roles/resourcemanager.tagAdmin` for the tag-based exemption).
- Organizations created on or after May 3, 2024 enforce `iam.disableServiceAccountKeyCreation` by default.
- Resolution steps for key and service account creation: first assess whether a key or service account is needed (service account keys are discouraged; prefer a more secure authentication alternative). Then either turn off enforcement organization-wide (Organization policies page, override parent's policy, turn off enforcement) or exempt resources: create tag key `disableServiceAccountKeyCreation` (values `enforced`, `not_enforced`), attach `enforced` to the organization, attach `not_enforced` to each exempt service account (or project/folder for creation), and update the policy so the constraint is not enforced where the tag matches `not_enforced` and is enforced elsewhere.
- Disabling these constraints weakens security posture; exempt only specific resources where possible. Do not disable the default-service-account constraint: Editor and Owner are basic roles that should not be used in production.
- Source: https://docs.cloud.google.com/iam/docs/troubleshoot-org-policies
- Retrieved 2026-11-14. Text CC BY 4.0, code samples Apache 2.0.

## Related

- [troubleshoot-policies.md](./troubleshoot-policies.md)
