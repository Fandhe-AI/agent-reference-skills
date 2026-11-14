---
source: https://docs.cloud.google.com/iam/docs/overview
---

# IAM Concepts and Granting a Role in the Console

How IAM authorizes access (principal, role, resource, allow policy, inheritance), plus the console walkthrough for granting and revoking a role on a project.

## Signature / Usage

Core model: you grant a role (a collection of permissions) to a principal on a resource through an allow policy; permissions cannot be granted directly. Permissions look like `service.resource.verb` (for example `resourcemanager.projects.list`).

Console quickstart (project level), condensed:

```text
1. Console > IAM page > select the project > Grant access
2. New principals: user identifier (typically a Google Account email)
3. Select a role (for example Logs Viewer) > Add another role (optional) > Save
4. Verify: https://console.cloud.google.com/logs?project=PROJECT_ID
5. Revoke: IAM page > Edit principal > delete icon next to the roles > Save
```

Required role for the quickstart: Project IAM Admin on the project (and Project Creator, `roles/resourcemanager.projectCreator`, to create a new test project). APIs to enable: `iam.googleapis.com`, `cloudresourcemanager.googleapis.com`.

## Options / Props

| Concept | Description |
|---|---|
| Principal | Human users (Google Accounts, Google groups, workforce pool identities) and workloads (service accounts, workload identity pool identities). Formerly "members" |
| Predefined roles | Managed by Google Cloud services (for example `roles/pubsub.publisher`) |
| Custom roles | You choose the permissions; higher maintenance; per-project and per-organization limits |
| Basic roles | Highly permissive; fine for testing, not production |
| Allow policy | YAML/JSON object attached to a resource; a list of role bindings (formerly "IAM policy") |
| Policy inheritance | Policies on organization/folder/project apply to descendants. Effective allow policy = resource policy plus all ancestors' policies |
| Advanced controls | Deny policies, Principal Access Boundary policies, IAM Conditions, Privileged Access Manager |

## Notes

- Hierarchy: organization (root) > folders > projects > service resources. Grant on a container to cover its resources, including resources that cannot hold their own allow policy (for example grant `roles/logging.bucketWriter` on the project for log buckets).
- The IAM API is eventually consistent: a read right after a write can be stale, and a just-created service account might be reported as not found.
- Follow least privilege; do not grant Owner or other basic roles to follow a tutorial in a shared project. The quickstart warns that using an existing project exposes its resources to the new principal.
- Deleting the quickstart project deletes everything in it; delete only a project you created for testing.
- Source: https://docs.cloud.google.com/iam/docs/overview
- Source: https://docs.cloud.google.com/iam/docs/grant-role-console
- Source: https://docs.cloud.google.com/iam/docs/iam-security-architecture
- Retrieved 2026-11-14. Content CC BY 4.0.
- Permission additions are logged weekly in the IAM permissions change log (https://docs.cloud.google.com/iam/docs/permissions-change-log, archive before 2022 at https://docs.cloud.google.com/iam/docs/permissions-change-log-archive). IAM does not automatically add new permissions to custom roles; check the change log when maintaining them.

## Related

- [grant-revoke-allow-policy.md](./grant-revoke-allow-policy.md)
- [conditional-role-bindings.md](./conditional-role-bindings.md)
- [../policy-guardrails/deny-policies.md](../policy-guardrails/deny-policies.md)
