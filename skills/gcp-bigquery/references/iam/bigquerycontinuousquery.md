---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquerycontinuousquery
---

# BigQuery Continuous Query IAM roles and permissions

## Signature / Usage

Predefined roles of `bigquerycontinuousquery` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### BigQuery Continuous Query Service Agent (`roles/bigquerycontinuousquery.serviceAgent`)

- Gives BigQuery Continuous Query access to the service accounts in the user project. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (1): `iam.serviceAccounts.getAccessToken`

### Example: inspect a role

Generated example (not in the official docs) describing the first role on this page; every role on this page is a service agent role, which is granted to the service agent by Google Cloud and must not be granted to users:

```bash
gcloud iam roles describe roles/bigquerycontinuousquery.serviceAgent
```

## Notes

- Roles and permissions of the `bigquerycontinuousquery` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquerycontinuousquery (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
