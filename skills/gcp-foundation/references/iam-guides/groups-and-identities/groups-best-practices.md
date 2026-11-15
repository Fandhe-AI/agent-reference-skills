---
source: https://docs.cloud.google.com/iam/docs/groups-best-practices
---

# Google Groups for IAM: Console Management and Best Practices

Manage Google groups in the Cloud console and use four group types to control access safely.

## Signature / Usage

Naming conventions that make the group type visible:

```text
org.GROUP_NAME@example.com                 organizational  (org.finance-all@example.com)
collab.TEAM_NAME@example.com               collaboration   (collab.msmiths-team@example.com)
access.JOB_FUNCTION@example.com            access          (access.billing-dashboard-users@example.com)
enforcement.GROUP_DESCRIPTION@example.com  enforcement     (enforcement.sso-users@example.com)
external.access.GROUP_NAME@example.com     access groups that allow external members
```

Alternatively use a secondary domain such as `access.example.com` (a subdomain of a verified domain needs no verification and no DNS MX record, which blocks inbound mail to non-communication groups).

Pipeline-created groups: create a service account with a custom admin role that has only the group-create permission, and pass `WITH_INITIAL_OWNER` at creation.

Prevent leaving groups with the Groups Settings API property:

```text
whoCanLeaveGroup = NONE_CAN_LEAVE
```

Console: Groups page at `https://console.cloud.google.com/iam-admin/groups` (view, create, edit membership, "View in Google Groups", delete).

## Options / Props

| Group type | Purpose | Nesting | Key practices |
|---|---|---|---|
| Organizational | Org structure, email | Nest to mirror org chart; may be members of any type; do not add other types to them | Provision from one source of truth (HR/IdP); no manual changes; do not use for access; no service accounts or external users |
| Collaboration | Ad hoc workgroups | Only nest groups with the same membership policy; may contain organizational groups | Use Groups for Business; force a name suffix; never use for access control |
| Access | Grant roles per job function | Do not nest (may contain organizational groups) | Self-service tooling (for example JIT Groups); one group per workload; auto-expire memberships (not for service accounts); designated owners; hide from directory; limit external members |
| Enforcement | Apply restrictions (deny, PAB, access bindings, SAML profile, 2SV) | Do not nest (may contain organizational groups) | Dynamic groups or IaC; users must not be able to leave |

## Notes

- Group permissions are managed by Google Workspace, not IAM. IAM roles needed for the console: Organization Viewer (`roles/resourcemanager.organizationViewer`) and Logs Viewer (`roles/logging.viewer`) for membership change logs.
- Members inherit all IAM roles granted to the group regardless of their Google Groups role. Service agents cannot be added to groups unless the external members option is on.
- Deleting a group is irreversible: revoke all its IAM roles and wait at least 7 days first.
- Domain-restricted sharing constraints apply to groups, not to group members; access groups with external members can bypass it. Use Cloud Identity security groups and group restrictions.
- Avoid external-IdP provisioning for access groups (delays of hours, divergence); provision only organizational and enforcement groups externally. Use a dedicated secondary domain such as `groups.example.com` when mapping groups by name to avoid collisions.
- Do not give deployment pipelines the Groups Admin role (it manages all groups).
- Audit: log membership changes with justifications and approver details; enable Cloud Identity / Workspace audit log sharing to Cloud Logging and route to a SIEM if needed.
- Source: https://docs.cloud.google.com/iam/docs/groups-best-practices
- Source: https://docs.cloud.google.com/iam/docs/groups-in-cloud-console
- Retrieved 2026-11-14. Content CC BY 4.0.

## Related

- [identity-types.md](./identity-types.md)
- [../policy-guardrails/deny-policies.md](../policy-guardrails/deny-policies.md)
- [../policy-guardrails/custom-org-policy-iam.md](../policy-guardrails/custom-org-policy-iam.md)
