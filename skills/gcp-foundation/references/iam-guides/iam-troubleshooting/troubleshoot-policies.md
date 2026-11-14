---
source: https://docs.cloud.google.com/iam/docs/troubleshoot-policies
---

# Troubleshooting IAM Policies

Troubleshoot allow, deny, and Principal Access Boundary policies with Policy Troubleshooter, and list all allow and deny policies that apply to a project with `gcloud beta projects get-ancestors-iam-policy`.

## Signature / Usage

List the applicable (effective) allow and deny policies for a project:

```bash
gcloud beta projects get-ancestors-iam-policy PROJECT_ID --include-deny --format=json
```

Abbreviated response structure from the page (allow policy on the organization, plus a deny policy on the project):

```
[
  {
    "id": "1234567890123",
    "policy": {
      "bindings": [
        {
          "members": [
            "user:raha@example.com"
          ],
          "role": "roles/iam.serviceAccountAdmin"
        }
      ],
      "etag": "BwXW6Eab7TI=",
      "version": 1
    },
    "type": "organization"
  },
  {
    "id": "my-project",
    "policy": {
      "displayName": "My deny policy",
      "kind": "DenyPolicy",
      "rules": [
        {
          "denyRule": {
            "deniedPermissions": [
              "iam.googleapis.com/serviceAccounts.create"
            ],
            "deniedPrincipals": [
              "user:raha@example.com"
            ]
          },
          "description": "Prevent service account creation"
        }
      ]
    },
    "type": "project"
  }
]
```

In this example Raha holds `roles/iam.serviceAccountAdmin` on the organization, but the project deny policy blocks `iam.googleapis.com/serviceAccounts.create`, so creation is denied.

## Notes

- Policy Troubleshooter takes a principal, resource, and permission, examines allow, deny, and PAB policies, and explains the result. See Policy Troubleshooter docs (https://docs.cloud.google.com/policy-intelligence/docs/troubleshoot-access).
- Required role to view all allow and deny policies: Security Reviewer `roles/iam.securityReviewer` on the organization containing the resource.
- Policies that affect a resource: its allow policy and deny policies, plus those of its parent project, folder, and organization (inheritance). An organization-level deny cannot be overridden by more permissive child deny policies or allow policies.
- To view only the effective allow policy: the console IAM page, or the Cloud Asset API (effective IAM policies). To find a role binding, search allow policies with Cloud Asset Inventory (filter by resource type, principal type, role, project, folder, organization).
- Source: https://docs.cloud.google.com/iam/docs/troubleshoot-policies
- Retrieved 2026-11-14. Text CC BY 4.0, code samples Apache 2.0.

## Related

- [troubleshoot-org-policies.md](./troubleshoot-org-policies.md)
- [troubleshoot-conditional-bindings.md](./troubleshoot-conditional-bindings.md)
